import { User } from '@/api/generatedApi';
import { queryClient } from '@/lib/tanstackQuery';
import { QueryKeys } from '@/queries/queryKeys';
import { AuthService } from '@/services/AuthService';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated')({
	component: RouteComponent,
	beforeLoad: () => {
		const userData =
			AuthService.checkTokens() && AuthService.emailVerifyed()
				? (queryClient.getQueryData([QueryKeys.CURRENT_USER]) as User | null)
				: null;

		if (userData) {
			throw redirect({
				to: '/',
				replace: true,
			});
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
