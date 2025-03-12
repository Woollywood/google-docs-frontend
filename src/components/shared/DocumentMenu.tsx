import React from 'react';
import { Button } from '../ui/button';
import { DeleteIcon, ExternalLinkIcon, MoreVertical } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { useDeleteDocument } from '@/queries/documents';
import { Document } from '@/api/generatedApi';

type Props = Pick<Document, 'id' | 'title'>;

export const DocumentMenu: React.FC<Props> = ({ id }) => {
	const { mutateAsync } = useDeleteDocument();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='rounded-full'>
					<MoreVertical className='size-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem asChild>
					<Link to='/documents/$id' params={{ id: String(id) }} target='_blank' rel='noopener noreferrer'>
						<ExternalLinkIcon className='mr-2 size-4' />
						Open in a new tab
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => mutateAsync(id)}>
					<DeleteIcon className='mr-2 size-4' />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
