import { z } from 'zod';

export const renameSchema = z.object({
	title: z.string().min(3),
});
export type RenameSchema = z.infer<typeof renameSchema>;
