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

export const newPasswordSchema = z.string().min(6, 'Password must be a minimum of 6 characters.');

export const matchPasswordschema = z.object({
  newPassword: newPasswordSchema,
  confirmNewPassword: newPasswordSchema,
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'New passwords do not match.',
  path: ['confirmNewPassword'],
});

export type FormData = z.infer<typeof loginSchema>;
