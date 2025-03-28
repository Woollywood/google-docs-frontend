import React from 'react';
import { InfiniteList } from '../InfiniteList';
import { useAcceptInviteOrganization, useRejectInviteOrganization } from '@/api/hooks/mutations/organizations';
import { useGetNotifications } from '@/api/hooks/queries/notifications';
import { ListSpinner } from '../spinners/ListSpinner';
import { Button } from '@/components/ui/button';

export const NotificationContent: React.FC = () => {
	const { data: notifications, isPending, hasNextPage, fetchNextPage } = useGetNotifications();
	const hasNotifications =
		notifications?.pages && notifications.pages.length > 0 && notifications.pages[0].data.length > 0;

	const { mutateAsync: acceptInvite, isPending: isPendingAccept } = useAcceptInviteOrganization();
	const { mutateAsync: rejectInvite, isPending: isPendingReject } = useRejectInviteOrganization();

	return (
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
						page.data.map(
							({ id, token, organizationId, organization: { title }, sender: { username } }) => (
								<div key={id} className='space-y-2'>
									<p className='text-sm'>
										You have invited to the {title} by {username}
									</p>
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
							),
						),
					)}
				</div>
			) : (
				<p>No notifications yet</p>
			)}
		</InfiniteList>
	);
};
