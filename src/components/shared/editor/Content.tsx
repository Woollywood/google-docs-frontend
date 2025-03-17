import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { FloatingToolbar } from '@liveblocks/react-tiptap';
import { Ruler } from './Ruler';
import { Toolbar } from './toolbar';
import { useEditorConfig } from './providers/ConfigProvider';
import { Threads } from './liveblocks/Threads';

export const Content: React.FC = () => {
	const config = useEditorConfig();
	const editor = useEditor(config);

	return (
		<div className='grid grid-rows-[auto_1fr]'>
			<Toolbar />
			<div className='bg-editor-background grid size-full grid-rows-[auto_1fr] overflow-x-auto px-4 print:overflow-visible print:bg-white print:p-0'>
				<Ruler />
				<div className='min-h-editor-min-height mx-auto flex h-full min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0'>
					<EditorContent editor={editor} />
				</div>
			</div>
			<Threads editor={editor!} />
			<FloatingToolbar editor={editor} />
		</div>
	);
};
