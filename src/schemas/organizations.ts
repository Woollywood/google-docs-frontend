import { z } from 'zod';

export const createOrganizationSchema = z.object({
	title: z.string().min(3),
});
export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
