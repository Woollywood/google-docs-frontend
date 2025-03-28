import {
	useDeleteOrganization,
	useKickOrganizationMember,
	useLeaveOrganization,
	useSendInviteOrganizationMember,
} from '@/api/hooks/mutations/organizations';
import { useIdentity } from '@/api/hooks/queries/auth';
import { useGetOrganizationById, useGetOrganizationMembers } from '@/api/hooks/queries/organizations';
import { InfiniteList } from '@/components/shared/InfiniteList';
import { RootNavbar } from '@/components/shared/navbars/root';
import { ListSpinner } from '@/components/shared/spinners/ListSpinner';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/organizations/$id/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: user } = useIdentity({ enabled: false });
	const { data: organization, isPending: isPendingOrganization } = useGetOrganizationById(id);
	const { data: members, isPending: isPendingMembers, hasNextPage, fetchNextPage } = useGetOrganizationMembers(id);
	const hasMembers = members?.pages && members.pages.length > 0 && members.pages[0].data.length > 0;
	const isOwner = user?.id === organization?.ownerId;

	const { mutateAsync: sendInvite, isPending: isPendingInvite } = useSendInviteOrganizationMember();
	const { mutateAsync: kickMember, isPending: isPendingKick } = useKickOrganizationMember();
	const { mutateAsync: deleteOrganization, isPending: isPendingDelete } = useDeleteOrganization();
	const { mutateAsync: leaveOrganization, isPending: isPendingLeave } = useLeaveOrganization();

	return (
		<div className='grid grid-rows-[auto_1fr] gap-y-8'>
			<RootNavbar logoTitle='Organizations' />
			{isPendingOrganization ? (
				<div>Loading...</div>
			) : (
				<div>
					<div className='mb-8 flex items-center justify-between gap-4'>
						<h2 className='text-2xl font-medium'>{organization?.title}</h2>
						{isOwner ? (
							<Button disabled={isPendingDelete} onClick={() => deleteOrganization(id)}>
								Delete
							</Button>
						) : (
							<Button disabled={isPendingLeave} onClick={() => leaveOrganization({ id })}>
								Leave
							</Button>
						)}
					</div>
					<InfiniteList
						isLoading={isPendingMembers}
						fallback={<ListSpinner className='py-4' />}
						nextPageFallback={<ListSpinner className='py-8' />}
						hasNextPage={hasNextPage}
						fetchNextPage={fetchNextPage}
						options={{ threshold: 0 }}>
						<div className='space-y-2'>
							{hasMembers ? (
								<div className='space-y-2'>
									{members?.pages.map((page) =>
										page.data.map(({ id: userId, username, isMember, isInvitationSended }) => (
											<div key={userId} className='flex items-center justify-between gap-6'>
												<span className='text-lg font-medium'>{username}</span>
												<div className='flex items-center gap-2'>
													{!isMember && (
														<Button
															variant='secondary'
															disabled={isMember || isInvitationSended || isPendingInvite}
															onClick={() =>
																sendInvite({ organizationId: id, recipientId: userId })
															}>
															{isInvitationSended ? 'Invitation sended' : 'Invite'}
														</Button>
													)}
													{isMember && (
														<Button
															variant='secondary'
															disabled={!isMember || isPendingKick || !isOwner}
															onClick={() => kickMember({ organizationId: id, userId })}>
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
						</div>
					</InfiniteList>
				</div>
			)}
		</div>
	);
}
