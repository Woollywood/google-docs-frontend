import React, { useMemo } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useLocalStorage } from '@uidotdev/usehooks';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { AuthTokens } from './services/AuthService';
import { useIdentity } from './api/hooks/queries/auth';
import { RouterContext } from './routes/__root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useHandleError } from './hooks/useHandleError';
import { AxiosError } from 'axios';
import { GlobalSpinner } from './components/shared/spinners/GlobalSpinner';

// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient: null } as unknown as RouterContext });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

interface RootProps {
	queryClient: QueryClient;
}
const Root: React.FC<RootProps> = ({ queryClient }) => {
	const [accessToken] = useLocalStorage<string>(AuthTokens.ACCESS_TOKEN);
	const [refreshToken] = useLocalStorage<string>(AuthTokens.REFRESH_TOKEN);
	const [emailVerifyed] = useLocalStorage<boolean>(AuthTokens.EMAIL_VERIFYED, false);
	const enabled = !!accessToken && !!refreshToken && emailVerifyed;

	const { isPending, isFetching } = useIdentity({ enabled });
	const isLoading = isPending && isFetching;

	return isLoading ? <GlobalSpinner /> : <RouterProvider router={router} context={{ queryClient }} />;
};

export const Router: React.FC = () => {
	const { handleError } = useHandleError();
	const queryClient: QueryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry(failureCount, error) {
							if (error instanceof AxiosError) {
								if (error.response?.status === 401) {
									return false;
								}

								if (error.response?.status === 403) {
									handleError(error);
									return false;
								}
							}

							return failureCount < 3;
						},
					},
					mutations: {
						onError(error) {
							if (error instanceof AxiosError) {
								handleError(error);
							}
						},
					},
				},
			}),
		[handleError],
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Root queryClient={queryClient} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
