export const toUpper = (text: string | undefined) => {
  if (!text) return;
  else return text.toUpperCase();
};

export const limit = (text: string | undefined, limit: number) => {
  if (!text) return;
  else return text.substring(0, limit) + '...';
};

export const capitalize = (text: string | undefined) => {
  if (!text) return;
  else return text.charAt(0).toUpperCase() + text.slice(1);
};
