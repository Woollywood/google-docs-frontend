import React, { useState } from 'react';
import { editorStore } from '../store';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ImageIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolbarButton } from './ToolbarButton';

export const ImageButton: React.FC = () => {
	const [imageUrl, setImageUrl] = useState<string>(editorStore.editor?.getAttributes('link').href || '');
	const [isDialogOpen, setDialogOpen] = useState(false);

	const onChange = (src: string) => {
		editorStore.editor?.chain().focus().setImage({ src }).run();
	};

	const onUpload = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';

		input.addEventListener(
			'change',
			(e) => {
				const file = (e.target as HTMLInputElement).files?.[0];
				if (file) {
					const imageUrl = URL.createObjectURL(file);
					onChange(imageUrl);
				}
			},
			{ once: true },
		);

		input.click();
	};

	const handleImageUrlSubmit = () => {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl('');
			setDialogOpen(false);
		}
	};

	return (
		<>
			<DropdownMenu
				onOpenChange={(open) => open && setImageUrl(editorStore.editor?.getAttributes('link').href || '')}>
				<DropdownMenuTrigger asChild>
					<ToolbarButton>
						<ImageIcon className='size-4' />
					</ToolbarButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={onUpload}>
						<SearchIcon className='mr-2 size-4' />
						Upload
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setDialogOpen(true)}>
						<SearchIcon className='mr-2 size-4' />
						Pase image url
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Insert image URL</DialogTitle>
					</DialogHeader>
					<Input
						placeholder='Insert image  URL'
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleImageUrlSubmit();
							}
						}}
					/>
					<DialogFooter>
						<Button onClick={handleImageUrlSubmit}>Insert</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
