import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signInSchema, SignInSchema } from '@/schemas/signIn';
import { useSearchParam } from '@/hooks/useSearchParam';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSignIn } from '@/queries/auth';
import { useHandleError } from '@/hooks/useHandleError';

export const Route = createFileRoute('/_unauthenticated/auth/_layout/sign-in')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [callbackURL] = useSearchParam('callbackURL', import.meta.env.VITE_CALLBACK_URL);

	const { mutateAsync } = useSignIn();
	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const { handleError } = useHandleError();
	const onSubmit = async ({ username, email, password }: SignInSchema) => {
		try {
			await mutateAsync({ username, email, password });
			navigate({ to: callbackURL, replace: true });
		} catch (error) {
			handleError(error);
		}
	};

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = form;
	return (
		<Card className='min-w-[26.25rem]'>
			<CardHeader>
				<CardTitle>
					<h1 className='text-center text-2xl font-medium'>Sign in</h1>
				</CardTitle>
				<CardDescription>
					<p className='text-center'>
						Don't have an account?{' '}
						<Link to={'/auth/sign-up'} className='text-blue-500'>
							Sign up
						</Link>
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Link to='/auth/forgot-password' className='text-blue-500'>
							Forgot password?
						</Link>
						<Button type='submit' className='w-full' disabled={isSubmitting}>
							Sign in
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
