import React from 'react';
import { editorStore } from '../store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ListIcon, ListOrderedIcon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarButton } from './ToolbarButton';

interface List {
	label: string;
	value: 'bulletList' | 'orderedList';
	icon: LucideIcon;
	onClick?: () => void;
}

export const ListButton: React.FC = () => {
	const lists: List[] = [
		{
			label: 'Bullet list',
			value: 'bulletList',
			icon: ListIcon,
			onClick: () => editorStore.editor?.chain().focus().toggleBulletList().run(),
		},
		{
			label: 'Ordered list',
			value: 'orderedList',
			icon: ListOrderedIcon,
			onClick: () => editorStore.editor?.chain().focus().toggleOrderedList().run(),
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton>
					<ListIcon className='size-4' />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
				{lists.map(({ label, value, icon: Icon, onClick }) => (
					<button
						key={label}
						className={cn(
							'flex items-center gap-x-2 rounded-sm px-2 py-1 transition-colors hover:bg-neutral-200/80',
							{ 'bg-neutral-200/80': editorStore.editor?.isActive(value) },
						)}
						onClick={onClick}>
						<Icon className='size-4' />
						<span className='text-sm'>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
