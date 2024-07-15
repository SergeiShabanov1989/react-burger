import { REGEX_EMAIL } from "./constants";

export const validateEmail = (email: string): boolean => {
  const regex = REGEX_EMAIL;
  return regex.test(email);
};