import React from 'react';
import { QueryClientProvider as _QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/tanstackQuery';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const QueryClientProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<_QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</_QueryClientProvider>
	);
};
