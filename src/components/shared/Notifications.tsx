import { useGetNotifications } from '@/api/hooks/queries/notifications';
import React from 'react';
import { InfiniteList } from './InfiniteList';
import { ListSpinner } from './spinners/ListSpinner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { ImNotification } from 'react-icons/im';
import { useAcceptInviteOrganization, useRejectInviteOrganization } from '@/api/hooks/mutations/organizations';

export const Notifications: React.FC = () => {
	const { mutateAsync: acceptInvite, isPending: isPendingAccept } = useAcceptInviteOrganization();
	const { mutateAsync: rejectInvite, isPending: isPendingReject } = useRejectInviteOrganization();

	const { data: notifications, isPending, hasNextPage, fetchNextPage } = useGetNotifications();
	const hasNotifications =
		notifications?.pages && notifications.pages.length > 0 && notifications.pages[0].data.length > 0;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' size='icon'>
					<ImNotification />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<InfiniteList
					isLoading={isPending}
					fallback={<ListSpinner className='py-4' />}
					nextPageFallback={<ListSpinner className='py-8' />}
					hasNextPage={hasNextPage}
					fetchNextPage={fetchNextPage}
					options={{ threshold: 0 }}>
					{hasNotifications ? (
						<div className='space-y-2'>
							{notifications.pages.map((page) =>
								page.data.map(({ id, token, organizationId }) => (
									<div key={id} className='space-y-2'>
										<p className='text-sm'>You have invited to the organization</p>
										<div className='flex items-center gap-2'>
											<Button
												variant='outline'
												size='sm'
												onClick={() => acceptInvite({ token, organizationId })}
												disabled={isPendingAccept}>
												Accept
											</Button>
											<Button
												variant='outline'
												size='sm'
												onClick={() => rejectInvite({ token })}
												disabled={isPendingReject}>
												Reject
											</Button>
										</div>
									</div>
								)),
							)}
						</div>
					) : (
						<p>No notifications yet</p>
					)}
				</InfiniteList>
			</PopoverContent>
		</Popover>
	);
};
