import { z } from 'zod';

const EmailSchema = z.string().email();

/**
 * Validates an email address using Zod.
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns true if the email address is valid according to the schema, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
  try {
    EmailSchema.parse(email);
    return true;
  } catch (error) {
    return false;
  }
};

const PasswordSchema = z.string().min(6);

/**
 * Validates a password to ensure it meets minimum length requirements using Zod.
 * @param {string} password - The password to validate.
 * @returns {boolean} Returns true if the password meets the minimum length requirement (6 characters), false otherwise.
 */
export const validatePassword = (password: string): boolean => {
  try {
    PasswordSchema.parse(password);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Checks if two passwords match.
 * @param {string} password - The first password.
 * @param {string} confirmPassword - The second password to compare.
 * @returns {boolean} Returns true if both passwords match, false otherwise.
 */
export const passwordsMatch = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};
