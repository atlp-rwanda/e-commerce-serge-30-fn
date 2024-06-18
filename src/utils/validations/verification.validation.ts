import { z } from 'zod';
import { setMessage, setMessageColor } from '../../slices/verification.slice';
import { Dispatch } from 'redux';

const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .regex(emailRegex, { message: 'Invalid email format' }),
});

export const validateEmails = (
  schema: z.ZodSchema<any>,
  data: Record<string, any>,
  dispatch: Dispatch,
) => {
  try {
    schema.parse(data);
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.errors.forEach((err) => {
        const { message } = err;
        dispatch(setMessage(message));
        dispatch(setMessageColor('text-red-500'));
      });
    }
    return false;
  }
};
