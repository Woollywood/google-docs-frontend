import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParam } from '@/hooks/useSearchParam';
import { useResetPassword } from '@/queries/auth';

export const Route = createFileRoute('/_unauthenticated/auth/_layout/reset-password')({
	component: RouteComponent,
});

function RouteComponent() {
	const { mutateAsync } = useResetPassword();
	const navigate = useNavigate();
	const [token] = useSearchParam('token');

	useEffect(() => {
		if (token) {
			mutateAsync({ token }).catch((error) => {
				toast(error.message || 'Something went wrong');
				navigate({ to: '/auth/sign-in', replace: true });
			});
		} else {
			toast('Invalid token');
			navigate({ to: '/auth/sign-in', replace: true });
		}
	}, [mutateAsync, navigate, token]);

	useEffect(() => {
		if (!token) {
			toast('Invalid token');
			navigate({ to: '/auth/sign-in', replace: true });
		}
	}, [navigate, token]);

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1 className='text-center text-2xl font-medium'>Password changed!</h1>
				</CardTitle>
				<CardDescription className='text-center'>Your password has been successfully changed.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex items-center justify-center'>
					<Button asChild>
						<Link to='/auth/sign-in'>Go to Sign in</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
