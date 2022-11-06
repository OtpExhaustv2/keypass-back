import * as argon from 'argon2';

export const hashPassword = async (password: string) =>
  await argon.hash(password);

export const compareHash = async (hash: string, password: string) =>
  await argon.verify(hash, password);
