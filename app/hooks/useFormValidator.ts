import { useState } from 'react';
import { emailValidation } from '@/app/utils/validation';
import { passwordValidation } from '@/app/utils/validation';
import { authConstants } from '@/app/constants/auth';

const { EMAIL_ERROR, PASSWORD_ERROR } = authConstants;

export const useFormValidator = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateForm = (email: string, password: string) => {
    const emailValid = emailValidation(email);
    const passwordValid = passwordValidation(password);

    if (emailValid && passwordValid) {
      setEmailError('');
      setPasswordError('');
      return true;
    }
    if (!emailValid) {
      setEmailError(EMAIL_ERROR);
      setPasswordError('');
      return;
    }
    if (!passwordValid) {
      setPasswordError(PASSWORD_ERROR);
      setEmailError('');
      return;
    }
    if (!emailValid && !passwordValid) {
      setEmailError(EMAIL_ERROR);
      setPasswordError(PASSWORD_ERROR);
      return;
    }
  };

  return { validateForm, emailError, passwordError };
};
