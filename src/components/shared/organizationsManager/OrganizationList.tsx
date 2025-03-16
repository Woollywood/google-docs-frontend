import React, { useState } from 'react';
import { OrganizationDto } from '@/api/generatedApi';
import { v4 as uuid } from 'uuid';
import { ImSpinner8 } from 'react-icons/im';
import { CreateNew } from './CreateNew';
import { isObject } from 'lodash-es';
import { DropdownMenuCheckboxItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Invite } from './Invite';
import { useToggleOrganization } from '@/api/hooks/mutations/organizations';
import { useGetCurrentOrganization } from '@/api/hooks/queries/organizations';
import { useIdentity } from '@/api/hooks/queries/auth';
import { Kick } from './Kick';
import { IoIosSettings } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { useSearchParam } from '@/hooks/useSearchParam';

interface Props {
	isPending: boolean;
	organizations: OrganizationDto[];
}

interface OrganizationItems extends OrganizationDto {
	current: boolean;
}

const OrganizationItem: React.FC<{
	id?: string;
	current: boolean;
	title: string;
	canManage?: boolean;
	onCheckedChange: () => void;
}> = ({ id, current, title, canManage = false, onCheckedChange }) => {
	const [, setOrganizationId] = useSearchParam('organizationId');

	const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setOrganizationId(id!);
	};

	return (
		<DropdownMenuCheckboxItem
			className='flex items-center justify-between gap-12'
			checked={current}
			onCheckedChange={onCheckedChange}>
			<span className='whitespace-nowrap'>{title}</span>
			{canManage && (
				<DialogTrigger asChild>
					<Button variant='secondary' onClick={onClick}>
						<IoIosSettings className='fill-muted-foreground size-4' />
						<span className='text-muted-foreground text-sm font-medium'>Manage</span>
					</Button>
				</DialogTrigger>
			)}
		</DropdownMenuCheckboxItem>
	);
};

export const OrganizationList: React.FC<Props> = ({ organizations, isPending }) => {
	const [personalAccountId] = useState(uuid());

	const { mutateAsync: toggleOrganization } = useToggleOrganization();

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
		await toggleOrganization({ id: id !== personalAccountId ? id : null });
	};

	return isPending ? (
		<ImSpinner8 className='size-8' />
	) : (
		<div>
			{items.map(({ id, title, current }) =>
				personalAccountId === id ? (
					<OrganizationItem
						key={id}
						current={current}
						onCheckedChange={() => onCheckedChange(id)}
						title={title}
					/>
				) : (
					<ContextMenu key={id}>
						<ContextMenuTrigger>
							<OrganizationItem
								key={id}
								canManage
								id={id}
								current={current}
								onCheckedChange={() => onCheckedChange(id)}
								title={title}
							/>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<Invite organizationId={id} />
							<Kick organizationId={id} />
						</ContextMenuContent>
					</ContextMenu>
				),
			)}
			<DropdownMenuSeparator />
			<CreateNew />
		</div>
	);
};
