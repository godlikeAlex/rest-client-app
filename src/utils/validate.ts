const letterRegex = /\p{L}/u;
const digitRegex = /\p{N}/u;
const specialRegex = /[^\p{L}\p{N}]/u;

export interface AuthorizationValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export function validatePassword(value: string) {
  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!letterRegex.test(value)) {
    return 'Password must contain at least one letter';
  }
  if (!digitRegex.test(value)) {
    return 'Password must contain at least one digit';
  }
  if (!specialRegex.test(value)) {
    return 'Password must contain at least one special character';
  }
  return null;
}
