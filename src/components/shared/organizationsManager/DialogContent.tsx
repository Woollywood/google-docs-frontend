import React, { useEffect } from 'react';
import { DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useGetOrganizationById, useGetOrganizationMembers } from '@/api/hooks/queries/organizations';
import { Button } from '@/components/ui/button';
import { useIdentity } from '@/api/hooks/queries/auth';
import { InfiniteList } from '../InfiniteList';
import { ListSpinner } from '../spinners/ListSpinner';
import {
	useDeleteOrganization,
	useKickOrganizationMember,
	useLeaveOrganization,
	useSendInviteOrganizationMember,
} from '@/api/hooks/mutations/organizations';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParam } from '@/hooks/useSearchParam';
import { LeaveOrganizationDto } from '@/api/generatedApi';
import { AxiosError } from 'axios';

export const ManagerContent: React.FC = () => {
	const [organizationId, setOrganizationId] = useSearchParam('organizationId');
	const enabled = organizationId.length > 0;
	const { data: user } = useIdentity({ enabled: false });
	const { data, isPending, error } = useGetOrganizationById(organizationId, { enabled });
	const {
		data: members,
		isPending: isPendingMembers,
		hasNextPage,
		fetchNextPage,
	} = useGetOrganizationMembers(organizationId, { enabled });
	const hasMembers = members?.pages && members.pages.length > 0 && members.pages[0].data.length > 0;
	const pages = members?.pages;
	const isOwner = user?.id === data?.ownerId;

	const { mutateAsync: sendInvite, isPending: isPendingInvite } = useSendInviteOrganizationMember();
	const { mutateAsync: kickMember, isPending: isPendingKick } = useKickOrganizationMember();
	const { mutateAsync: deleteOrganizationAsync, isPending: isPendingDelete } = useDeleteOrganization();
	const { mutateAsync: leaveOrganizationAsync, isPending: isPendingLeave } = useLeaveOrganization();

	useEffect(() => {
		if (error instanceof AxiosError) {
			if (error.response?.status === 403) {
				setOrganizationId('');
			}
		}
	}, [error, setOrganizationId]);

	const deleteOrganization = async (id: string) => {
		await deleteOrganizationAsync(id);
		setOrganizationId('');
	};

	const leaveOrganization = async ({ id }: LeaveOrganizationDto) => {
		await leaveOrganizationAsync({ id });
		setOrganizationId('');
	};

	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>Organization {data?.title}</DialogTitle>
				<DialogDescription>Organization manager</DialogDescription>
			</DialogHeader>
			<>
				{isPending ? (
					Array.from({ length: 10 }, (_, i) => <Skeleton key={i} className='h-8 w-full' />)
				) : (
					<InfiniteList
						isLoading={isPendingMembers}
						fallback={<ListSpinner className='py-4' />}
						nextPageFallback={<ListSpinner className='py-8' />}
						hasNextPage={hasNextPage}
						fetchNextPage={fetchNextPage}
						options={{ threshold: 0 }}>
						{hasMembers ? (
							<div className='space-y-2'>
								{pages?.map(({ data }) =>
									data.map(({ id: userId, username, isMember, isInvitationSended }) => (
										<div key={userId} className='flex items-center justify-between gap-6'>
											<span className='text-lg font-medium'>{username}</span>
											<div className='flex items-center gap-2'>
												{!isMember && (
													<Button
														variant='secondary'
														disabled={isMember || isInvitationSended || isPendingInvite}
														onClick={() =>
															sendInvite({ organizationId, recipientId: userId })
														}>
														{isInvitationSended ? 'Invitation sended' : 'Invite'}
													</Button>
												)}
												{isMember && (
													<Button
														variant='secondary'
														disabled={!isMember || isPendingKick || !isOwner}
														onClick={() => kickMember({ organizationId, userId })}>
														Kick
													</Button>
												)}
											</div>
										</div>
									)),
								)}
							</div>
						) : (
							<p>No users found</p>
						)}
					</InfiniteList>
				)}

				<DialogFooter>
					{isOwner ? (
						<Button disabled={isPendingDelete} onClick={() => deleteOrganization(organizationId)}>
							Delete Organization
						</Button>
					) : (
						<Button disabled={isPendingLeave} onClick={() => leaveOrganization({ id: organizationId })}>
							Leave from Organization
						</Button>
					)}
				</DialogFooter>
			</>
		</DialogContent>
	);
};
