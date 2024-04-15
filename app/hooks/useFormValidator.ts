import { useState } from 'react';
import { emailValidation } from '../utils/validation';
import { passwordValidation } from '../utils/validation';
import { authConstants } from "@/app/constants/auth";

export const useFormValidator = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateForm = (email: string, password: string) => {
    const emailValid = emailValidation(email);
    const passwordValid = passwordValidation(password);
    const { EMAIL_ERROR, PASSWORD_ERROR } = authConstants();

    if (emailValid && passwordValid) {
      setEmailError('');
      setPasswordError('');
      return true;
    } else if (!emailValid) {
      setEmailError(EMAIL_ERROR);
      setPasswordError('');
    } else if (!passwordValid) {
      setPasswordError(PASSWORD_ERROR);
      setEmailError('');
    } else if (!emailValid && !passwordValid) {
      setEmailError(EMAIL_ERROR);
      setPasswordError(PASSWORD_ERROR);
    }
    return false;
  };

  return { validateForm, emailError, passwordError };
};
