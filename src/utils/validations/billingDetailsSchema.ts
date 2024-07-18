import { z } from 'zod';

export const billingDetailsSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  zipCode: z.string().min(1, 'Zip code is required'),
  expectedDeliveryDate: z.string().min(1, 'Expected delivery date is required'),
});

export type BillingDetailsFormData = z.infer<typeof billingDetailsSchema>;
