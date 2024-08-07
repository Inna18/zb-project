export const toUpper = (text: string | undefined) => {
  if (!text) return;
  return text.toUpperCase();
};

export const limit = (text: string | undefined, limit: number) => {
  if (!text) return;
  else if (text.length < limit) return text;
  return text.substring(0, limit) + '...';
};

export const capitalize = (text: string | undefined) => {
  if (!text) return;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const hideInfo = (text: string | undefined, letterToShow: number) => {
  if (!text) return;
  return (
    text.substring(0, letterToShow) +
    text.substring(4, text.length).replace(/./g, '*')
  );
};
