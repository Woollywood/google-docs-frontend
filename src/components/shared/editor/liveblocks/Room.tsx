import React from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';

const publicApiKey = import.meta.env.VITE_LIVEBLOCKS_PUBLIC_API_KEY;

interface Props extends React.PropsWithChildren {
	id: string;
	fallback: React.ReactNode;
}

export const Room: React.FC<Props> = ({ id, fallback, children }) => {
	return (
		<LiveblocksProvider publicApiKey={publicApiKey}>
			<RoomProvider id={id}>
				<ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
};
