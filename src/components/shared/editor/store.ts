import { makeAutoObservable } from 'mobx';
import type { Editor } from '@tiptap/react';

class Store {
	_editor: Editor | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	set editor(editor: Editor | null) {
		this._editor = editor;
	}

	get editor() {
		return this._editor;
	}
}

export const editorStore = new Store();
