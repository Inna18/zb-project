export const emailValidation = (email: string) => {
  const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
  return emailRegex.test(email);
};

export const passwordValidation = (password: string) => {
  const pwRegex = new RegExp(
    '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
  ); // at least 8 chars, one letter, one number, one special character
  return pwRegex.test(password);
};
