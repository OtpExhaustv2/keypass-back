import { User } from '@prisma/client';

export type AuthenticatedRequest = Request & { user: User };

export type ValidateUserDetails = {
  username: string;
  password: string;
};

export type CreateUserDetails = {
  email: string;
  username: string;
  password: string;
};
