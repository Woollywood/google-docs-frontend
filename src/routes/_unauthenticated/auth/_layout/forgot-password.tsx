import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { $api } from '@/api/instance';
import { useHandleError } from '@/hooks/useHandleError';
import { forgotPasswordSchema, ForgotPasswordSchema } from '@/schemas/auth';

export const Route = createFileRoute('/_unauthenticated/auth/_layout/forgot-password')({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const { handleError } = useHandleError();
	const submitHandler = async ({ email, newPassword }: ForgotPasswordSchema) => {
		try {
			await $api.auth.authControllerResetPasswordLink({ email, newPassword });
			toast('Check your email for a restoration link');
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
				<CardTitle className='text-center'>
					<h1 className='text-center text-2xl font-medium'>Forgot password?</h1>
				</CardTitle>
				<CardDescription className='text-center'>
					Enter the email address associated with account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={handleSubmit(submitHandler)} className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input autoComplete='email' placeholder='Enter your email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='newPassword'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type='password' placeholder='New password' {...field} />
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
									<FormControl>
										<Input type='password' placeholder='Confirm new password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex items-center justify-center'>
							<Button disabled={isSubmitting} size='lg' className='w-full'>
								Send link to email
							</Button>
						</div>
					</form>
					<div className='mt-8 flex items-center justify-center'>
						<Link to='/auth/sign-in' className='text-blue-500'>
							Back to sign in
						</Link>
					</div>
				</Form>
			</CardContent>
		</Card>
	);
}
