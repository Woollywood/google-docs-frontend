import React from 'react';
import { editorStore } from '../store';
import { type ColorResult, SketchPicker } from 'react-color';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ToolbarButton } from './ToolbarButton';

export const TextColorButton: React.FC = () => {
	const value = editorStore.editor?.getAttributes('textStyle').color || '#000000';

	const onChange = (color: ColorResult) => {
		editorStore.editor?.chain().focus().setColor(color.hex).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton className='flex-col px-1.5'>
					<span className='text-xs'>A</span>
					<div className='h-0.5 w-full' style={{ backgroundColor: value }} />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='p-0'>
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
