import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated/auth/_layout')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='flex size-full min-h-screen items-center justify-center'>
			<Outlet />
		</div>
	);
}
