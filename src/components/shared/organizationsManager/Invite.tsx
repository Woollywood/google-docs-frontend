import React, { useEffect, useState } from 'react';
import { ContextMenuItem } from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { InfiniteList } from '../InfiniteList';
import { ListSpinner } from '../spinners/ListSpinner';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useGetUsers } from '@/api/hooks/queries/users';
import { useSendInviteOrganizationMember } from '@/api/hooks/mutations/organizations';

interface Props {
	organizationId: string;
}

export const Invite: React.FC<Props> = ({ organizationId }) => {
	const [search, setSearch] = useState('');
	const { data: users, isPending, fetchNextPage, hasNextPage, refetch } = useGetUsers({ search, enabled: false });
	const hasUsers = users?.pages && users.pages.length > 0 && users.pages[0].data.length > 0;
	const pages = users?.pages;

	const { mutateAsync: sendInvite, isPending: isInviting } = useSendInviteOrganizationMember();

	useEffect(() => {
		refetch();
	}, [refetch, search]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<ContextMenuItem
					onSelect={(e) => e.preventDefault()}
					onClick={(e) => {
						e.stopPropagation();
					}}>
					Invite
				</ContextMenuItem>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Invite member</DialogTitle>
					<DialogDescription>Invite new member</DialogDescription>
				</DialogHeader>
				<div>
					<Input
						className='mb-8'
						placeholder='Search by username'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<div>
						{isPending ? (
							Array.from({ length: 10 }, (_, i) => <Skeleton key={i} className='h-12 w-full' />)
						) : (
							<InfiniteList
								isLoading={isPending}
								fallback={<ListSpinner className='py-4' />}
								nextPageFallback={<ListSpinner className='py-8' />}
								hasNextPage={hasNextPage}
								fetchNextPage={fetchNextPage}
								options={{ threshold: 0 }}>
								{hasUsers ? (
									pages?.map(({ data }) =>
										data.map(({ id, username }) => (
											<Button
												variant='ghost'
												key={id}
												className='w-full'
												onClick={() => sendInvite({ organizationId, recipientId: id })}
												disabled={isInviting}>
												{username}
											</Button>
										)),
									)
								) : (
									<p>No users found</p>
								)}
							</InfiniteList>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
