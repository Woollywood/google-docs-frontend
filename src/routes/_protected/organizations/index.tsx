import { RootNavbar } from '@/components/shared/navbars/root';
import { CreateNew } from '@/components/shared/organizations/CreateNew';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetMyOrganizations } from '@/api/hooks/queries/organizations';
import { Star } from 'lucide-react';
import moment from 'moment';
import { useIdentity } from '@/api/hooks/queries/auth';
import { useDeleteOrganization, useLeaveOrganization } from '@/api/hooks/mutations/organizations';
import { Button } from '@/components/ui/button';
import { Notifications } from '@/components/shared/notifications';

export const Route = createFileRoute('/_protected/organizations/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: user } = useIdentity({ enabled: false });
	const { data, isPending } = useGetMyOrganizations();
	const hasData = data?.length || 0 > 0;

	const { mutateAsync: deleteOrganization, isPending: isPendingDelete } = useDeleteOrganization();
	const { mutateAsync: leaveOrganization, isPending: isPendingLeave } = useLeaveOrganization();

	return (
		<div className='grid grid-rows-[auto_1fr] gap-y-8'>
			<RootNavbar logoTitle='Organizations' />
			<div className='ml-auto flex items-center gap-x-4'>
				<Notifications />
				<CreateNew />
			</div>
			{isPending ? (
				<div>Loading</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow className='border-none hover:bg-transparent'>
							<TableHead className='w-[10rem]'>Title</TableHead>
							<TableHead>Created at</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{hasData ? (
							data?.map(({ id, createdAt, title, ownerId }) => (
								<TableRow key={id}>
									<TableCell className='font-medium'>
										<div>
											<Link
												to='/organizations/$id'
												params={{ id }}
												className='inline-flex items-center gap-0.5 hover:underline'>
												<span>{title}</span>
												{user?.id === ownerId && (
													<Star className='fill-accent-foreground size-2' />
												)}
											</Link>
										</div>
									</TableCell>
									<TableCell className='text-muted-foreground hidden md:table-cell'>
										{moment(createdAt).format('LL')}
									</TableCell>
									<TableCell className='flex justify-end'>
										{user?.id === ownerId ? (
											<Button
												variant='secondary'
												disabled={isPendingDelete}
												onClick={() => deleteOrganization(id)}>
												Delete
											</Button>
										) : (
											<Button
												variant='secondary'
												disabled={isPendingLeave}
												onClick={() => leaveOrganization({ id })}>
												Leave
											</Button>
										)}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className='text-muted-foreground h-24 text-center'>
									You are not a member of any organization yet
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
