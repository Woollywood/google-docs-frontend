import React from 'react';
import { InfiniteList } from '@/components/shared/InfiniteList';
import { useGetDocuments } from '@/queries/documents';
import { ListSpinner } from './spinners/ListSpinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SiGoogledocs } from 'react-icons/si';
import { CircleUserIcon } from 'lucide-react';
import { DocumentMenu } from './DocumentMenu';
import moment from 'moment';

export const DocumentsTable: React.FC = () => {
	const { data, isPending, fetchNextPage, hasNextPage } = useGetDocuments();
	const hasDocuments = data?.pages && data.pages.length > 0 && data.pages[0].data.length > 0;
	const pages = data?.pages;

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
								data.map(({ id, title, createdAt }) => (
									<TableRow key={id} className='cursor-pointer'>
										<TableCell className='w-12'>
											<SiGoogledocs className='size-6 fill-blue-500' />
										</TableCell>
										<TableCell className='font-medium md:w-[45%]'>{title}</TableCell>
										<TableCell className='text-muted-foreground hidden items-center gap-2 md:flex'>
											{/* TODO organization */}
											<CircleUserIcon className='size-4' /> Personal
										</TableCell>
										<TableCell className='text-muted-foreground hidden md:table-cell'>
											{moment(createdAt).format('LL')}
										</TableCell>
										<TableCell className='flex justify-end'>
											<DocumentMenu id={id} title={title} />
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
