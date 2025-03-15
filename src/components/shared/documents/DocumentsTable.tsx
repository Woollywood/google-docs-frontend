import React, { useEffect } from 'react';
import { InfiniteList } from '@/components/shared/InfiniteList';
import { useGetDocuments } from '@/queries/documents';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SiGoogledocs } from 'react-icons/si';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import { ListSpinner } from '@/components/shared/spinners/ListSpinner';
import { DocumentMenu } from './DocumentMenu';
import { useNavigate } from '@tanstack/react-router';
import { useSearchParam } from '@/hooks/useSearchParam';
import moment from 'moment';

export const DocumentsTable: React.FC = () => {
	const [search] = useSearchParam('search');
	const { data, isPending, fetchNextPage, hasNextPage, refetch } = useGetDocuments({ search });
	const hasDocuments = data?.pages && data.pages.length > 0 && data.pages[0].data.length > 0;
	const pages = data?.pages;

	useEffect(() => {
		refetch();
	}, [refetch, search]);

	const navigate = useNavigate();
	const onClick = (id: string) => {
		navigate({ to: '/documents/$id', params: { id } });
	};

	return (
		<div className='mx-auto flex w-full flex-col gap-5 py-6'>
			<InfiniteList
				isLoading={isPending}
				fallback={<ListSpinner className='py-4' />}
				nextPageFallback={<ListSpinner className='py-8' />}
				hasNextPage={hasNextPage}
				fetchNextPage={fetchNextPage}
				options={{ threshold: 0 }}>
				<Table>
					<TableHeader>
						<TableRow className='border-none hover:bg-transparent'>
							<TableHead>Name</TableHead>
							<TableHead>&nbsp;</TableHead>
							<TableHead className='hidden md:table-cell'>Shared</TableHead>
							<TableHead className='hidden md:table-cell'>Created at</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{hasDocuments ? (
							pages?.map(({ data }) =>
								data.map((document) => (
									<TableRow
										key={document.id}
										className='cursor-pointer'
										onClick={() => onClick(document.id)}>
										<TableCell className='w-12'>
											<SiGoogledocs className='size-6 fill-blue-500' />
										</TableCell>
										<TableCell className='font-medium md:w-[45%]'>{document.title}</TableCell>
										<TableCell className='text-muted-foreground hidden items-center gap-2 md:flex'>
											{document.organizationId ? (
												<>
													<Building2Icon className='size-4' /> Organization
												</>
											) : (
												<>
													<CircleUserIcon className='size-4' /> Personal
												</>
											)}
										</TableCell>
										<TableCell className='text-muted-foreground hidden md:table-cell'>
											{moment(document.createdAt).format('LL')}
										</TableCell>
										<TableCell className='flex justify-end'>
											<DocumentMenu {...document} />
										</TableCell>
									</TableRow>
								)),
							)
						) : (
							<TableRow className='hover:bg-transparent'>
								<TableCell colSpan={4} className='text-muted-foreground h-24 text-center'>
									No documents found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</InfiniteList>
		</div>
	);
};
