import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry(failureCount, error) {
				if (error instanceof AxiosError) {
					if (error.response?.status === 401) {
						return false;
					}
				}

				return failureCount < 3;
			},
		},
	},
});
