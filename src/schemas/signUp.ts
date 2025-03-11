import { z } from 'zod';

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
