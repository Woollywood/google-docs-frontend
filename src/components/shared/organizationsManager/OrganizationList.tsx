import React, { useState } from 'react';
import { OrganizationDto } from '@/api/generatedApi';
import { v4 as uuid } from 'uuid';
import { ImSpinner8 } from 'react-icons/im';
import { CreateNew } from './CreateNew';
import { isObject } from 'lodash-es';
import { DropdownMenuCheckboxItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu';
import { AddMember } from './AddMember';
import { KickMember } from './KickMember';
import { useJoinOrganization, useLeaveOrganization } from '@/api/hooks/mutations/organizations';
import { useGetCurrentOrganization } from '@/api/hooks/queries/organizations';
import { useIdentity } from '@/api/hooks/queries/auth';

interface Props {
	isPending: boolean;
	organizations: OrganizationDto[];
}

interface OrganizationItems extends OrganizationDto {
	current: boolean;
}

export const OrganizationList: React.FC<Props> = ({ organizations, isPending }) => {
	const [personalAccountId] = useState(() => uuid());

	const { mutateAsync: joinOrganization } = useJoinOrganization();
	const { mutateAsync: leaveOrganization } = useLeaveOrganization();

	const { data: currentOrganizaion } = useGetCurrentOrganization({ enabled: false });
	const { data: user } = useIdentity({ enabled: false });

	const items: OrganizationItems[] = [
		{
			id: personalAccountId,
			createdAt: user?.createdAt || '',
			updatedAt: user?.updatedAt || '',
			ownerId: personalAccountId,
			title: 'Personal account',
			current: !isObject(currentOrganizaion),
		},
		...(organizations.map<OrganizationItems>((organization) => ({
			...organization,
			current: currentOrganizaion?.id === organization.id,
		})) || []),
	];

	const onCheckedChange = async (id: string) => {
		if (id === personalAccountId) {
			await leaveOrganization();
		} else {
			await joinOrganization(id);
		}
	};

	return isPending ? (
		<ImSpinner8 className='size-8' />
	) : (
		<div>
			{items.map(({ id, title, current }) => (
				<ContextMenu key={id}>
					<ContextMenuTrigger>
						<DropdownMenuCheckboxItem checked={current} onCheckedChange={() => onCheckedChange(id)}>
							{title}
						</DropdownMenuCheckboxItem>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<AddMember organizationId={id} />
						<KickMember organizationId={id} />
					</ContextMenuContent>
				</ContextMenu>
			))}
			<DropdownMenuSeparator />
			<CreateNew />
		</div>
	);
};
