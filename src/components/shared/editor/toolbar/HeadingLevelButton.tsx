import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Level } from '@tiptap/extension-heading';
import { editorStore } from '../store';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarButton } from './ToolbarButton';

interface Heading {
	label: string;
	value: 0 | Level;
	fontSize: string;
}

export const HeadingLevelButton: React.FC = () => {
	const headings: Heading[] = [
		{
			label: 'Normal text',
			value: 0,
			fontSize: '16px',
		},
		{
			label: 'Heading 1',
			value: 1,
			fontSize: '32px',
		},
		{
			label: 'Heading 2',
			value: 2,
			fontSize: '24px',
		},
		{
			label: 'Heading 3',
			value: 3,
			fontSize: '20px',
		},
		{
			label: 'Heading 4',
			value: 4,
			fontSize: '18px',
		},
		{
			label: 'Heading 5',
			value: 5,
			fontSize: '16px',
		},
	];

	const getCurrentHeading = () => {
		for (let level = 1; level <= headings.length - 1; level++) {
			if (editorStore.editor?.isActive('heading', { level })) {
				return `Heading ${level}`;
			}
		}

		return 'Normal text';
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton className='min-w-7 justify-center px-1.5'>
					<span className='truncate'>{getCurrentHeading()}</span>
					<ChevronDownIcon className='ml-2 size-4 shrink-0' />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
				{headings.map(({ label, value, fontSize }) => (
					<DropdownMenuItem key={value} className='p-0'>
						<button
							className={cn(
								'flex w-full items-center gap-x-2 rounded-sm px-2 py-1 transition-colors hover:bg-neutral-200/80',
								{
									'bg-neutral-200/80':
										(value === 0 && editorStore.editor?.isActive('heading')) ||
										editorStore.editor?.isActive('heading', { level: value }),
								},
							)}
							style={{ fontSize }}
							onClick={() => {
								if (value === 0) {
									editorStore.editor?.chain().focus().setParagraph().run();
								} else {
									editorStore.editor?.chain().focus().toggleHeading({ level: value }).run();
								}
							}}>
							<span className='text-sm'>{label}</span>
						</button>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
