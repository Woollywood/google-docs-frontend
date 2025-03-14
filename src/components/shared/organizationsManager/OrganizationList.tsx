import React, { useState } from 'react';
import { Organization } from '@/api/generatedApi';
import { v4 as uuid } from 'uuid';
import { ImSpinner8 } from 'react-icons/im';
import { useGetCurrentOrganization, useJoinOrganization, useLeaveOrganization } from '@/queries/organizations';
import { CreateNew } from './CreateNew';
import { isObject } from 'lodash-es';
import { DropdownMenuCheckboxItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu';
import { useGetMe } from '@/queries/auth';
import { AddMember } from './AddMember';
import { KickMember } from './KickMember';

interface Props {
	isPending: boolean;
	organizations: Organization[];
}

interface OrganizationItems extends Organization {
	current: boolean;
}

export const OrganizationList: React.FC<Props> = ({ organizations, isPending }) => {
	const [personalAccountId] = useState(() => uuid());

	const { mutateAsync: joinOrganization } = useJoinOrganization();
	const { mutateAsync: leaveOrganization } = useLeaveOrganization();

	const { data: currentOrganizaion } = useGetCurrentOrganization({ enabled: false });
	const { data: user } = useGetMe({ enabled: false });

	const items: OrganizationItems[] = [
		{
			id: personalAccountId,
			createdAt: user?.createdAt || '',
			updatedAt: user?.updatedAt || '',
			owner: user!,
			title: 'Personal account',
			members: [],
			activeUsers: [],
			documents: [],
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
