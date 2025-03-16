import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { QueryClient } from '@tanstack/react-query';

export interface RouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<NuqsAdapter>
				<div className='container mx-auto min-h-screen px-8'>
					<Outlet />
				</div>
				<Toaster />
			</NuqsAdapter>
			<TanStackRouterDevtools />
		</>
	),
});
