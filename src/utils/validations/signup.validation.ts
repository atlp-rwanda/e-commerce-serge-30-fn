import { z } from 'zod';
import { setError } from '../../slices/signup.slice';
import { Dispatch } from 'redux';

const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .regex(emailRegex, { message: 'Invalid email format' }),
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .min(5, { message: 'Username must be at least 5 characters' }),
  firstname: z.string().min(1, { message: 'Firstname is required' }),
  lastname: z.string().min(1, { message: 'Lastname is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const validateForm = (
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
        const { path, message } = err;
        const field = path[0] as keyof typeof signupSchema._type;
        dispatch(setError({ field, error: message }));
      });
    }
    return false;
  }
};
