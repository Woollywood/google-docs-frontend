import React from 'react';
import { ExternalLinkIcon, MoreVertical } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { DocumentDto } from '@/api/generatedApi';
import { Button } from '@/components/ui/button';
import { DocumentRenameDialog } from './DocumentRenameDialog';
import { DocumentDeleteDialog } from './DocumentRemoveDialog';

type Props = DocumentDto;

export const DocumentMenu: React.FC<Props> = ({ id, title }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='rounded-full'>
					<MoreVertical className='size-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem asChild onClick={(e) => e.stopPropagation()}>
					<Link to='/documents/$id' params={{ id: String(id) }} target='_blank' rel='noopener noreferrer'>
						<ExternalLinkIcon className='mr-2 size-4' />
						Open in a new tab
					</Link>
				</DropdownMenuItem>
				<DocumentDeleteDialog id={id} />
				<DocumentRenameDialog id={id} title={title} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
