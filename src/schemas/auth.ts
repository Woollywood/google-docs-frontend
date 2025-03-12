import { z } from 'zod';

export const forgotPasswordSchema = z
	.object({
		email: z.string().email(),
		newPassword: z.string().min(6),
		confirmPassword: z.string().min(6),
	})
	.superRefine((data, ctx) => {
		if (data.newPassword !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const signInSchema = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
});
export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
	.object({
		username: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string(),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});
export type SignUpSchema = z.infer<typeof signUpSchema>;
