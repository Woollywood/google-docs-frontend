import React from 'react';
import { editorStore } from '../store';
import { type ColorResult, SketchPicker } from 'react-color';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HighlighterIcon } from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';

export const HighlightColorButton: React.FC = () => {
	const value = editorStore.editor?.getAttributes('highlight').color || '#ffffff';

	const onChange = (color: ColorResult) => {
		editorStore.editor?.chain().focus().setHighlight({ color: color.hex }).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton className='px-1.5'>
					<HighlighterIcon className='size-4' />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='p-0'>
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
