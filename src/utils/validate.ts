const letterRegex = /\p{L}/u;
const digitRegex = /\p{N}/u;
const specialRegex = /[^\p{L}\p{N}]/u;

export interface AuthorizationValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export function validatePassword(value: string, t: (key: string) => string) {
  if (value.length < 8) {
    return t('validate.validatePasswordLength');
  }
  if (!letterRegex.test(value)) {
    return t('validate.validatePasswordLetterRegex');
  }
  if (!digitRegex.test(value)) {
    return t('validate.validatePasswordDigitRegex');
  }
  if (!specialRegex.test(value)) {
    return t('validate.validatePasswordSpecialRegex');
  }
  return null;
}
