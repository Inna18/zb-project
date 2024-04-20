export const authConstants = () => {
  const EMAIL_ERROR = 'Check check the email address format.';
  const PASSWORD_ERROR =
    'Password should contain 1 letter, 1 number, 1 special character, 1~8 total.';

  return { EMAIL_ERROR, PASSWORD_ERROR };
};
