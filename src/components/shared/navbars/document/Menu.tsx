'use client';

import React from 'react';
import {
	BoldIcon,
	FileIcon,
	FileJsonIcon,
	FilePenIcon,
	FilePlusIcon,
	FileTextIcon,
	GlobeIcon,
	ItalicIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	StrikethroughIcon,
	TextIcon,
	TrashIcon,
	UnderlineIcon,
	Undo2Icon,
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { editorStore } from '@/components/shared/editor/store';

export const Menu: React.FC = () => {
	const insertTable = ({ rows, cols }: { rows: number; cols: number }) =>
		editorStore.editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();

	const onDownload = (blob: Blob, filename: string) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
	};

	const onSaveJSON = () => {
		if (!editorStore.editor) {
			return;
		}

		const content = editorStore.editor?.getJSON();
		const blob = new Blob([JSON.stringify(content)], { type: 'application/json' });
		onDownload(blob, `document.json`);
	};

	const onSaveHTML = () => {
		if (!editorStore.editor) {
			return;
		}

		const content = editorStore.editor?.getHTML();
		const blob = new Blob([content!], { type: 'text/html' });
		onDownload(blob, `document.html`);
	};

	const onSaveText = () => {
		if (!editorStore.editor) {
			return;
		}

		const content = editorStore.editor?.getText();
		const blob = new Blob([content!], { type: 'text/plain' });
		onDownload(blob, `document.txt`);
	};

	return (
		<Menubar className='h-auto border-none bg-transparent p-0 shadow-none'>
			<MenubarMenu>
				<MenubarTrigger className='hover:bg-muted h-auto cursor-pointer rounded-sm px-2 py-0.5 text-sm font-normal'>
					File
				</MenubarTrigger>
				<MenubarContent>
					<MenubarSub>
						<MenubarSubTrigger className='gap-2'>
							<FileIcon className='mr-2 size-4' />
							Save
						</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem onClick={onSaveJSON}>
								<FileJsonIcon className='mr-2 size-4' />
								JSON
							</MenubarItem>
							<MenubarItem onClick={onSaveHTML}>
								<GlobeIcon className='mr-2 size-4' />
								HTML
							</MenubarItem>
							<MenubarItem onClick={() => window.print()}>
								<BsFilePdf className='mr-2 size-4' />
								PDF
							</MenubarItem>
							<MenubarItem onClick={onSaveText}>
								<FileTextIcon className='mr-2 size-4' />
								Text
							</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarItem>
						<FilePlusIcon className='mr-2 size-4' />
						New Document
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						<FilePenIcon className='mr-2 size-4' />
						Rename
					</MenubarItem>
					<MenubarItem>
						<TrashIcon className='mr-2 size-4' />
						Remove
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem onClick={() => window.print()}>
						<PrinterIcon className='mr-2 size-4' />
						Print
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger className='hover:bg-muted h-auto cursor-pointer rounded-sm px-2 py-0.5 text-sm font-normal'>
					Edit
				</MenubarTrigger>
				<MenubarContent>
					<MenubarItem onClick={() => editorStore.editor?.chain().focus().undo().run()}>
						<Undo2Icon className='mr-2 size-4' />
						Undo
					</MenubarItem>
					<MenubarItem onClick={() => editorStore.editor?.chain().focus().redo().run()}>
						<Redo2Icon className='mr-2 size-4' />
						Redo
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger className='hover:bg-muted h-auto cursor-pointer rounded-sm px-2 py-0.5 text-sm font-normal'>
					Insert
				</MenubarTrigger>
				<MenubarContent>
					<MenubarSub>
						<MenubarSubTrigger>Table</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>1 x 1</MenubarItem>
							<MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>2 x 2</MenubarItem>
							<MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>3 x 3</MenubarItem>
							<MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>4 x 4</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger className='hover:bg-muted h-auto cursor-pointer rounded-sm px-2 py-0.5 text-sm font-normal'>
					Format
				</MenubarTrigger>
				<MenubarContent>
					<MenubarSub>
						<MenubarSubTrigger>
							<TextIcon className='mr-2 size-4' />
							Text
						</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem onClick={() => editorStore.editor?.chain().toggleBold().run()}>
								<BoldIcon className='mr-2 size-4' />
								Bold
							</MenubarItem>
							<MenubarItem onClick={() => editorStore.editor?.chain().toggleItalic().run()}>
								<ItalicIcon className='mr-2 size-4' />
								Italic
							</MenubarItem>
							<MenubarItem onClick={() => editorStore.editor?.chain().toggleUnderline().run()}>
								<UnderlineIcon className='mr-2 size-4' />
								Underline
							</MenubarItem>
							<MenubarItem onClick={() => editorStore.editor?.chain().toggleStrike().run()}>
								<StrikethroughIcon className='mr-2 size-4' />
								Strikethrough
							</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarItem onClick={() => editorStore.editor?.chain().unsetAllMarks().run()}>
						<RemoveFormattingIcon className='mr-2 size-4' />
						Clear formatting
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};
