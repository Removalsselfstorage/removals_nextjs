export const truncateTexts = (text, count) => {
  return text?.length > count ? text.slice(0, count) + '...' : text;
};
