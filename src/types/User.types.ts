export interface IUser {
  user_id: string;
  username: string;
  email: string;
  password: string;
  resetToken: string | null;
  resetTokenExpiration: Date | null;
  emailVerificationToken: string | null;
  emailVerificationTokenExpiration: Date | null;
  verified: boolean;
  active: boolean;
  firstname: string;
  lastname: string;
  role: 'USER' | 'ADMIN' | 'VENDOR';
  image_url: string | null;
  google_id: string | null;
  google_token: string | null;
  previousPasswords: string[];
  lastTimePasswordUpdate: Date;
  passwordExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}
