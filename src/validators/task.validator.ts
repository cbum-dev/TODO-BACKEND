import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
});
