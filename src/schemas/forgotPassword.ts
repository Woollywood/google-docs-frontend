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
