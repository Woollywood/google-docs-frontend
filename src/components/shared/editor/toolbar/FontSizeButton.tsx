import React, { useEffect, useRef, useState } from 'react';
import { editorStore } from '../store';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { Input } from '@/components/ui/input';

export const FontSizeButton: React.FC = () => {
	const currentFontSize = editorStore.editor?.getAttributes('textStyle').fontSize
		? editorStore.editor.getAttributes('textStyle').fontSize.replace('px', '')
		: '16';

	const [fontSize, setFontSize] = useState(currentFontSize);
	const [inputValue, setInputValue] = useState(fontSize);
	const [isEditing, setEditing] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	const updateFontSize = (strSize: string) => {
		const size = parseInt(strSize);
		if (!isNaN(size) && size > 0) {
			editorStore.editor?.chain().focus().setFontSize(`${size}px`).run();
			setFontSize(strSize);
			setInputValue(strSize);
			setEditing(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputBlur = () => {
		updateFontSize(inputValue);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			updateFontSize(inputValue);
			editorStore.editor?.commands.focus();
		}
	};

	const increment = () => {
		const newSize = parseInt(fontSize) + 1;
		updateFontSize(newSize.toString());
	};

	const decrement = () => {
		const newSize = parseInt(fontSize) - 1;
		if (newSize > 0) {
			updateFontSize(newSize.toString());
		}
	};

	return (
		<div className='flex items-center gap-x-0.5'>
			<ToolbarButton onClick={decrement}>
				<MinusIcon className='size-4' />
			</ToolbarButton>
			{isEditing ? (
				<Input
					size='sm'
					className='w-10 text-center'
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					ref={inputRef}
				/>
			) : (
				<ToolbarButton
					className='w-10 cursor-text border border-neutral-500 hover:bg-transparent'
					onClick={() => {
						setEditing(true);
						setFontSize(currentFontSize);
					}}>
					{currentFontSize}
				</ToolbarButton>
			)}
			<ToolbarButton onClick={increment}>
				<PlusIcon className='size-4' />
			</ToolbarButton>
		</div>
	);
};
