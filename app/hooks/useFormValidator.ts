import { useState } from "react";
import { emailValidation } from "../utils/validation"
import { passwordValidation } from "../utils/validation"

export const useFormValidator = () => {
  const [emailError, setEmailError] = useState<string|null>(null);
  const [passwordError, setPasswordError] = useState<string|null>(null);

  const validateForm = (email: string, password: string) => {
    const emailValid = emailValidation(email);
    const passwordValid = passwordValidation(password);

    if (emailValid && passwordValid) {
      setEmailError('');
      setPasswordError('');
      return true;
    } else if (!emailValid) {
      setEmailError("Check check the email address format.")
      setPasswordError('');
    } else if (!passwordValid) {
      setPasswordError("Password should contain 1 letter, 1 number, 1 special character, 1~8 total.")
      setEmailError('');
    } else if (!emailValid && !passwordValid) {
      setEmailError("Check check the email address format.")
      setPasswordError("Password should contain 1 letter, 1 number, 1 special character, 1~8 total.")
    }
    return false;
  }

  return {validateForm, emailError, passwordError}
}