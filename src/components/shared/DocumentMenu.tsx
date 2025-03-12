import React from 'react';
import { Button } from '../ui/button';
import { ExternalLinkIcon, MoreVertical } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';

interface Props {
	id: number;
	title: string;
}

export const DocumentMenu: React.FC<Props> = ({ id }) => {
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
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
