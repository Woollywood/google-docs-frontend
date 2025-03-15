import { UserDto } from '@/api/generatedApi';
import { QueryKeys } from '@/api/hooks/queryKeys';
import { queryClient } from '@/lib/tanstackQuery';
import { AuthService } from '@/services/AuthService';
import { Outlet, redirect } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
	component: RouteComponent,
	beforeLoad: ({ location }) => {
		const userData =
			AuthService.checkTokens() && AuthService.emailVerifyed()
				? (queryClient.getQueryData([QueryKeys.CURRENT_USER]) as UserDto | null)
				: null;

		if (!userData) {
			throw redirect({
				to: '/auth/sign-in',
				search: {
					callbackURL: location.href,
				},
				replace: true,
			});
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
