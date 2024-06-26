import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  passwordsMatch,
} from '../../src/utils/validators';

describe('validateEmail', () => {
  it('should correctly validate emails', () => {
    expect(validateEmail('valid@email.com')).toBe(true);
    expect(validateEmail('invalid_email.com')).toBe(false);
    expect(validateEmail('another_invalid.email')).toBe(false);
  });
});

describe('validatePassword', () => {
  it('should correctly validate password length', () => {
    expect(validatePassword('valid')).toBe(false);
    expect(validatePassword('validp')).toBe(true);
    expect(validatePassword('validpassword')).toBe(true);
  });
});

describe('passwordsMatch', () => {
  it('should correctly validate if passwords match', () => {
    expect(passwordsMatch('password123', 'password123')).toBe(true);
    expect(passwordsMatch('password123', 'password456')).toBe(false);
  });
});
