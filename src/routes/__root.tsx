import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/react';

export const Route = createRootRoute({
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
