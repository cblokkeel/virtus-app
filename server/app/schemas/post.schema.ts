import { z } from 'zod';

export const PostSchema = z.object({
  post: z.string(),
});
