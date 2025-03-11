import React from 'react';
import { editorStore } from '../store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarButton } from './ToolbarButton';

interface Alignment {
	label: string;
	value: 'left' | 'center' | 'right' | 'justify';
	icon: LucideIcon;
}

export const AlignButton: React.FC = () => {
	const alignments: Alignment[] = [
		{ label: 'Align left', value: 'left', icon: AlignLeftIcon },
		{ label: 'Align center', value: 'center', icon: AlignCenterIcon },
		{ label: 'Align right', value: 'right', icon: AlignRightIcon },
		{ label: 'Align justify', value: 'justify', icon: AlignJustifyIcon },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton>
					<AlignLeftIcon className='size-4' />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
				{alignments.map(({ label, value, icon: Icon }) => (
					<button
						key={value}
						className={cn(
							'flex items-center gap-x-2 rounded-sm px-2 py-1 transition-colors hover:bg-neutral-200/80',
							{ 'bg-neutral-200/80': editorStore.editor?.isActive({ TextAlign: value }) },
						)}
						onClick={() => editorStore.editor?.chain().focus().setTextAlign(value).run()}>
						<Icon className='size-4' />
						<span className='text-sm'>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
