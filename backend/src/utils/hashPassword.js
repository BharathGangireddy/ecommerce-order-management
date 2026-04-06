import { compare, genSalt, hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const comparePassword = async (password, hashed) => {
  return await compare(password, hashed);
};
