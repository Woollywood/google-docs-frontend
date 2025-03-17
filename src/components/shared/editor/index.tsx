import React from 'react';
import { SectionsProvider } from './providers/SectionsProvider';
import { ConfigProvider } from './providers/ConfigProvider';
import { Content } from './Content';
import { Room } from './liveblocks/Room';
import { GlobalSpinner } from '../spinners/GlobalSpinner';

interface Props {
	id: string;
}

export const Editor: React.FC<Props> = ({ id }) => {
	return (
		<Room id={id} fallback={<GlobalSpinner className='min-h-auto' />}>
			<SectionsProvider>
				<ConfigProvider>
					<Content />
				</ConfigProvider>
			</SectionsProvider>
		</Room>
	);
};
