import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParam } from '@/hooks/useSearchParam';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import { useVerifyEmail } from '@/api/hooks/mutations/auth';

export const Route = createFileRoute('/_unauthenticated/auth/_layout/email-verification')({
	component: RouteComponent,
});

function RouteComponent() {
	const { mutateAsync } = useVerifyEmail();
	const navigate = useNavigate();
	const [token] = useSearchParam('token');

	useEffect(() => {
		if (token) {
			mutateAsync({ token })
				.then(() => {
					navigate({ to: import.meta.env.VITE_EMAIL_VERIFICATION_CALLBACK_URL || '/', replace: true });
				})
				.catch((error) => {
					toast(error.message || 'Something went wrong');
					navigate({ to: '/auth/sign-up', replace: true });
				});
		} else {
			toast('Invalid token');
			navigate({ to: '/auth/sign-up', replace: true });
		}
	}, [mutateAsync, navigate, token]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<h1 className='text-center text-2xl font-medium'>Email verification</h1>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex items-center justify-center gap-2'>
					<p>Verifying...</p>
					<Loader2Icon className='animate-spin' />
				</div>
			</CardContent>
		</Card>
	);
}
