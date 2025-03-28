import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ImSpinner8 } from 'react-icons/im';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrganizationList } from './OrganizationList';
import { useGetCurrentOrganization, useGetMyOrganizations } from '@/api/hooks/queries/organizations';
import { Link } from '@tanstack/react-router';
import { NotificationButton } from '@/components/shared/notifications/NotificationButton';

export const Organizations: React.FC = () => {
	const { data, isPending } = useGetCurrentOrganization();
	const { data: organizations, isPending: isPendingOrganizations } = useGetMyOrganizations();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='flex items-center gap-2'>
					{isPending ? (
						<ImSpinner8 className='animate-spin' />
					) : (
						<>
							<ChevronDown className='size-4' /> <span>{data?.title ?? 'Personal account'}</span>
						</>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='min-w-72'>
				<div className='flex items-center justify-between'>
					<DropdownMenuLabel>Organizations</DropdownMenuLabel>
					<div className='flex items-center gap-x-2'>
						<Link to='/organizations'>
							<NotificationButton />
						</Link>
						<Link to='/organizations'>
							<Button variant='link'>Details</Button>
						</Link>
					</div>
				</div>
				<DropdownMenuSeparator />
				<OrganizationList organizations={organizations || []} isPending={isPendingOrganizations} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
