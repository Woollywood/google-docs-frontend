import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { editorStore } from '../store';
import { cn } from '@/lib/utils';
import { ToolbarButton } from './ToolbarButton';

interface Font {
	label: string;
	value: string;
}

export const FontFamilyButton: React.FC = () => {
	const fonts: Font[] = [
		{ label: 'Arial', value: 'Arial' },
		{ label: 'Times New Roman', value: 'Times New Roman' },
		{ label: 'Courier New', value: 'Courier New' },
		{ label: 'Georgia', value: 'Georgia' },
		{ label: 'Verdana', value: 'Verdana' },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton className='w-[7.5rem] justify-between px-1.5'>
					<span className='truncate'>
						{editorStore.editor?.getAttributes('textStyle').FontFamily || 'Arial'}
					</span>
					<ChevronDownIcon className='ml-2 size-4 shrink-0' />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
				{fonts.map(({ label, value }) => (
					<DropdownMenuItem key={value} className='p-0'>
						<button
							className={cn(
								'flex w-full items-center gap-x-2 rounded-sm px-2 py-1 transition-colors hover:bg-neutral-200/80',
								{
									'bg-neutral-200/80':
										editorStore.editor?.getAttributes('textStyle').FontFamily === value,
								},
							)}
							style={{ fontFamily: value }}
							onClick={() => editorStore.editor?.chain().focus().setFontFamily(value).run()}>
							<span className='text-sm'>{label}</span>
						</button>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
