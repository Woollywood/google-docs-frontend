import { z } from 'zod';

export const documentSchema = z.object({
	title: z.string().min(3),
	content: z.string().optional(),
	authorId: z.string(),
});
export type DocumentSchema = z.infer<typeof documentSchema>;
