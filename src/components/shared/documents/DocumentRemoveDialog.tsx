import React from 'react';
import { AlertDialog } from '../modals/AlertDialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { TrashIcon } from 'lucide-react';
import { useDeleteDocument } from '@/queries/documents';

interface Props {
	id: string;
}

export const DocumentDeleteDialog: React.FC<Props> = ({ id }) => {
	const { mutateAsync, isPending } = useDeleteDocument();

	return (
		<AlertDialog handler={() => mutateAsync(id)} isPending={isPending}>
			<DropdownMenuItem
				className='w-full'
				onSelect={(e) => e.preventDefault()}
				onClick={(e) => e.stopPropagation()}>
				<TrashIcon className='mr-2 size-4' />
				Delete
			</DropdownMenuItem>
		</AlertDialog>
	);
};
