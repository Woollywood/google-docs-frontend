import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useHandleError } from '@/hooks/useHandleError';
import { signUpSchema, SignUpSchema } from '@/schemas/auth';
import { useSignUp } from '@/api/hooks/mutations/auth';

export const Route = createFileRoute('/_unauthenticated/auth/_layout/sign-up')({
	component: RouteComponent,
});

function RouteComponent() {
	const { mutateAsync } = useSignUp();
	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const { handleError } = useHandleError();
	const onSubmit = async ({ username, email, password }: SignUpSchema) => {
		try {
			await mutateAsync({ username, email, password });
			toast('Your account has been created. Check your email for a verification link');
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
					<h1 className='text-center text-2xl font-medium'>Sign up</h1>
				</CardTitle>
				<CardDescription>
					<p className='text-center'>
						Already have an account?{' '}
						<Link to={'/auth/sign-in'} className='text-blue-500'>
							Sign in
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
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={isSubmitting}>
							Sign up
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
