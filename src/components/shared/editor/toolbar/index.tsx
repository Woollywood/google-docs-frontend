import React from 'react';
import { Separator } from '@/components/ui/separator';
import { HeadingLevelButton } from './HeadingLevelButton';
import { FontFamilyButton } from './FontFamilyButton';
import { ToolbarButton } from './ToolbarButton';
import { observer } from 'mobx-react-lite';
import { useSection } from '../providers/SectionsProvider';
import { TextColorButton } from './TextColorButton';
import { HighlightColorButton } from './HighlightColorButton';
import { LinkButton } from './LinkButton';
import { ImageButton } from './ImageButton';
import { AlignButton } from './AlignButton';
import { ListButton } from './ListButton';
import { FontSizeButton } from './FontSizeButton';
import { LineHeightButton } from './LineHeightButton';

export const Toolbar: React.FC = observer(() => {
	const sections = useSection();

	return (
		<div className='w-editor-width bg-editor-toolbar-background mx-auto flex min-h-8 items-center gap-x-0.5 overflow-x-auto rounded-3xl px-2.5 py-0.5'>
			{sections[0].map(({ icon: Icon, ...props }) => (
				<ToolbarButton key={props.label} {...props}>
					<Icon className='size-4' />
				</ToolbarButton>
			))}
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<FontFamilyButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<HeadingLevelButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<FontSizeButton />
			{sections[1].map(({ icon: Icon, ...props }) => (
				<ToolbarButton key={props.label} {...props}>
					<Icon className='size-4' />
				</ToolbarButton>
			))}
			<TextColorButton />
			<HighlightColorButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<LinkButton />
			<ImageButton />
			<AlignButton />
			<LineHeightButton />
			<ListButton />
			{sections[2].map(({ icon: Icon, ...props }) => (
				<ToolbarButton key={props.label} {...props}>
					<Icon className='size-4' />
				</ToolbarButton>
			))}
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
		</div>
	);
});
