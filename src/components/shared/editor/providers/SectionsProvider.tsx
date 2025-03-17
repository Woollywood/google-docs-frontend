import React from 'react';
import {
	BoldIcon,
	ItalicIcon,
	ListTodoIcon,
	LucideIcon,
	MessageSquareIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon,
} from 'lucide-react';
import { editorStore } from '../store';

type ToolbarSection = {
	label: string;
	icon: LucideIcon;
	onClick: () => void;
	isActive?: boolean;
}[];

const Context = React.createContext<ToolbarSection[]>([]);

export const SectionsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const sections: ToolbarSection[] = [
		[
			{ label: 'Undo', icon: Undo2Icon, onClick: () => editorStore.editor?.chain().focus().undo().run() },
			{ label: 'Redo', icon: Redo2Icon, onClick: () => editorStore.editor?.chain().focus().redo().run() },
			{ label: 'Print', icon: PrinterIcon, onClick: () => window.print() },
			{
				label: 'Spell check',
				icon: SpellCheckIcon,
				onClick: () => {
					const current = editorStore.editor?.view.dom.getAttribute('spellcheck');
					editorStore.editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false');
				},
			},
		],
		[
			{
				label: 'Bold',
				icon: BoldIcon,
				isActive: editorStore.editor?.isActive('bold'),
				onClick: () => editorStore.editor?.chain().focus().toggleBold().run(),
			},
			{
				label: 'Italic',
				icon: ItalicIcon,
				isActive: editorStore.editor?.isActive('italic'),
				onClick: () => editorStore.editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: 'Underline',
				icon: UnderlineIcon,
				isActive: editorStore.editor?.isActive('underline'),
				onClick: () => editorStore.editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			{
				label: 'Comment',
				icon: MessageSquareIcon,
				onClick: () => editorStore.editor?.chain().focus().addPendingComment().run(),
				isActive: editorStore.editor?.isActive('liveblocksCommentMark'),
			},
			{
				label: 'List Todo',
				icon: ListTodoIcon,
				isActive: editorStore.editor?.isActive('taskList'),
				onClick: () => editorStore.editor?.chain().focus().toggleTaskList().run(),
			},
			{
				label: 'Remove formatting',
				icon: RemoveFormattingIcon,
				onClick: () => editorStore.editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];

	return <Context.Provider value={sections}>{children}</Context.Provider>;
};

export const useSection = () => {
	return React.useContext(Context);
};
