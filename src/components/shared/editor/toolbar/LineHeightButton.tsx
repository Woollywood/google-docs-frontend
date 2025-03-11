import React from 'react';
import { editorStore } from '../store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ListCollapseIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarButton } from './ToolbarButton';

interface LineHeight {
	label: string;
	value: string;
}

export const LineHeightButton: React.FC = () => {
	const lineHeights: LineHeight[] = [
		{ label: 'Default', value: 'normal' },
		{ label: 'Single', value: '1' },
		{ label: '1.15', value: '1.15' },
		{ label: '1.5', value: '1.5' },
		{ label: 'Double', value: '2' },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton>
					<ListCollapseIcon className='size-4' />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
				{lineHeights.map(({ label, value }) => (
					<button
						key={value}
						className={cn(
							'flex items-center gap-x-2 rounded-sm px-2 py-1 transition-colors hover:bg-neutral-200/80',
							{
								'bg-neutral-200/80':
									editorStore.editor?.getAttributes('paragraph').lineHeight === value,
							},
						)}
						onClick={() => editorStore.editor?.chain().focus().setLineHeight(value).run()}>
						<span className='text-sm'>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
