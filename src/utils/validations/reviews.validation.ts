import { z } from 'zod';

export const reviewSchema = z.object({
  reviewTitle: z.string().min(1, 'Review title must not be empty'),
  reviewContent: z.string().min(1, 'Review content must not be empty'),
  rating: z.number().min(1, 'Rating must be greater than 0'),
});
