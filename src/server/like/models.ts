import { z } from "zod";

export const likeToggleInputSchema = z.object({ postId: z.string() });
