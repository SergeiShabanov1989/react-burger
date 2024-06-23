import { REGEX_EMAIL } from "./constants";

export const validateEmail = (email) => {
  const regex = REGEX_EMAIL;
  return regex.test(email);
};