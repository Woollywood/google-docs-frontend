import React, { useState } from 'react';
import { editorStore } from '../store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolbarButton } from './ToolbarButton';

export const LinkButton: React.FC = () => {
	const [value, setValue] = useState<string>(editorStore.editor?.getAttributes('link').href || '');

	const onChange = (href: string) => {
		editorStore.editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
		setValue('');
	};

	return (
		<DropdownMenu onOpenChange={(open) => open && setValue(editorStore.editor?.getAttributes('link').href || '')}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton>
					<Link2Icon className='size-4' />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex items-center gap-x-2 p-2.5'>
				<Input placeholder='https://example.com' value={value} onChange={(e) => setValue(e.target.value)} />
				<Button onClick={() => onChange(value)}>Apply</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
