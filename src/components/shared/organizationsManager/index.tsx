import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrganizationList } from './OrganizationList';
import { ImSpinner8 } from 'react-icons/im';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetCurrentOrganization, useGetMyOrganizations } from '@/api/hooks/queries/organizations';

export const OrganizationsManager: React.FC = () => {
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
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Organizations</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<OrganizationList organizations={organizations || []} isPending={isPendingOrganizations} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
