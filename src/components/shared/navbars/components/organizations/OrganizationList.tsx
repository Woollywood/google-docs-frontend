import React, { useState } from 'react';
import { OrganizationDto } from '@/api/generatedApi';
import { v4 as uuid } from 'uuid';
import { useToggleOrganization } from '@/api/hooks/mutations/organizations';
import { useGetCurrentOrganization } from '@/api/hooks/queries/organizations';
import { useIdentity } from '@/api/hooks/queries/auth';
import { isObject } from 'lodash-es';
import { ImSpinner8 } from 'react-icons/im';
import { DropdownMenuCheckboxItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface OrganizationItem extends OrganizationDto {
	current: boolean;
}

interface Props {
	isPending: boolean;
	organizations: OrganizationDto[];
}

export const OrganizationList: React.FC<Props> = ({ organizations, isPending }) => {
	const [personalAccountId] = useState(uuid());
	const { mutateAsync: toggleOrganization } = useToggleOrganization();
	const { data: currentOrganizaion } = useGetCurrentOrganization({ enabled: false });
	const { data: user } = useIdentity({ enabled: false });

	const items: OrganizationItem[] = [
		{
			id: personalAccountId,
			createdAt: user?.createdAt || '',
			updatedAt: user?.updatedAt || '',
			ownerId: personalAccountId,
			title: 'Personal account',
			current: !isObject(currentOrganizaion),
		},
		...(organizations.map<OrganizationItem>((organization) => ({
			...organization,
			current: currentOrganizaion?.id === organization.id,
		})) || []),
	];

	const onCheckedChange = async (id: string) => {
		await toggleOrganization({ id: id !== personalAccountId ? id : null });
	};

	return isPending ? (
		<ImSpinner8 className='size-8' />
	) : (
		<div>
			{items.map(({ id, title, current }) => (
				<DropdownMenuCheckboxItem
					key={id}
					className='flex items-center justify-between gap-12'
					checked={current}
					onCheckedChange={() => onCheckedChange(id)}>
					<span className='whitespace-nowrap'>{title}</span>
				</DropdownMenuCheckboxItem>
			))}
			<DropdownMenuSeparator />
		</div>
	);
};
