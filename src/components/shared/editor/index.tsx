import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { FontSizeExtension } from './extensions/fontSize';
import { LineHeightExtension } from './extensions/lineHeight';
import { Color } from '@tiptap/extension-color';
import { editorStore } from './store';
import { Toolbar } from './toolbar';
import { SectionsProvider } from './providers/SectionsProvider';
import { Ruler } from './Ruler';

export const Editor: React.FC = () => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				style: 'padding-left: 56px; padding-right: 56px',
				class: 'focus:outline-none print:border-0 bg-white border border-editor-border flex flex-col h-full w-editor-width py-12',
			},
		},
		extensions: [
			StarterKit,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			Image,
			ImageResize,
			Underline,
			FontFamily,
			TextStyle,
			Highlight.configure({ multicolor: true }),
			Color,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			FontSizeExtension,
			LineHeightExtension.configure({
				types: ['paragraph', 'heading'],
				defaultLineHeight: 'normal',
			}),
		],
		immediatelyRender: false,
		onCreate({ editor }) {
			editorStore.editor = editor;
		},
		onDestroy() {
			editorStore.editor = null;
		},
		onUpdate({ editor }) {
			editorStore.editor = editor;
		},
		onSelectionUpdate({ editor }) {
			editorStore.editor = editor;
		},
		onTransaction({ editor }) {
			editorStore.editor = editor;
		},
		onFocus({ editor }) {
			editorStore.editor = editor;
		},
		onBlur({ editor }) {
			editorStore.editor = editor;
		},
		onContentError({ editor }) {
			editorStore.editor = editor;
		},
	});

	return (
		<div className='grid grid-rows-[auto_1fr]'>
			<SectionsProvider>
				<Toolbar />
				<div className='bg-editor-background grid size-full grid-rows-[auto_1fr] overflow-x-auto px-4 print:overflow-visible print:bg-white print:p-0'>
					<Ruler />
					<div className='mx-auto flex h-full min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0'>
						<EditorContent editor={editor} />
					</div>
				</div>
			</SectionsProvider>
		</div>
	);
};
