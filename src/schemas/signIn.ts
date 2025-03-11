import { z } from 'zod';

export const signInSchema = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
});
export type SignInSchema = z.infer<typeof signInSchema>;
