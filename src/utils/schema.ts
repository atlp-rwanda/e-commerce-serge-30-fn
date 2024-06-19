import { z } from 'zod';
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'valid email is required' })
    .email('This is not a valid email.'),
  password: z
    .string({
      required_error: 'Required',
    })
    .min(6, { message: 'Password must be minumum of 6 characters' }),
});
export type FormData = z.infer<typeof loginSchema>;