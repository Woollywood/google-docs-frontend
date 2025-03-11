import React from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useLocalStorage } from '@uidotdev/usehooks';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { Loader2Icon } from 'lucide-react';
import { useGetMe } from '@/queries/user';
import { AuthTokens } from './services/AuthService';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export const Router: React.FC = () => {
	const [accessToken] = useLocalStorage<string>(AuthTokens.ACCESS_TOKEN);
	const [refreshToken] = useLocalStorage<string>(AuthTokens.REFRESH_TOKEN);
	const [emailVerifyed] = useLocalStorage<boolean>(AuthTokens.EMAIL_VERIFYED, false);
	const enabled = !!accessToken && !!refreshToken && emailVerifyed;

	const { isPending, isFetching } = useGetMe({ enabled });
	const isLoading = isPending && isFetching;

	return isLoading ? (
		<div className='flex size-full min-h-screen items-center justify-center'>
			<Loader2Icon className='size-16 animate-spin' />
		</div>
	) : (
		<RouterProvider router={router} />
	);
};
