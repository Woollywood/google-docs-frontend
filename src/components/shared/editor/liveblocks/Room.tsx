import React from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { authEndpoint, resolveMentionSuggestions, resolveUsers } from '@/lib/liveblocks';

interface Props extends React.PropsWithChildren {
	id: string;
	fallback: React.ReactNode;
}

export const Room: React.FC<Props> = ({ id, fallback, children }) => {
	return (
		<LiveblocksProvider
			authEndpoint={authEndpoint}
			resolveUsers={resolveUsers}
			resolveMentionSuggestions={resolveMentionSuggestions}>
			<RoomProvider id={id}>
				<ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
};
