import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated/auth/_layout/email-verified')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1 className='text-center text-2xl font-medium'>Email verified!</h1>
				</CardTitle>
				<CardDescription className='text-center'>Your email has been successfully verified.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex items-center justify-center'>
					<Button asChild>
						<Link to='/'>Go to home</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
