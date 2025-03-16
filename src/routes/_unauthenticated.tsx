import { UserDto } from '@/api/generatedApi';
import { QueryKeys } from '@/api/hooks/queryKeys';
import { AuthService } from '@/services/AuthService';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated')({
	component: RouteComponent,
	beforeLoad: ({ context: { queryClient } }) => {
		const userData =
			AuthService.checkTokens() && AuthService.emailVerifyed()
				? (queryClient.getQueryData([QueryKeys.CURRENT_USER]) as UserDto | null)
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
