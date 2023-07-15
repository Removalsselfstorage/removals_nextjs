export const truncateTexts = (text, count) => {
  return text?.length > count ? text.slice(0, count) + '...' : text;
};

export function convertToSentenceCase(text) {
  if (text.length === 0) {
    return text; // Return empty string if the input is empty
  }

  const lowercasedText = text.toLowerCase();
  const firstChar = lowercasedText.charAt(0).toUpperCase();

  return firstChar + lowercasedText.slice(1);
}

export function generateRandomValues() {
  const values = [];
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  for (let i = 0; i < 10; i++) {
    const randomType = Math.random() < 0.5 ? 'string' : 'number';

    if (randomType === 'string') {
      let randomString = 'rs-';
      for (let j = 0; j < 5; j++) {
        const randomChar = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        randomString += randomChar;
      }
      values.push(randomString);
    } else {
      const randomNumber = Math.floor(Math.random() * 100);
      values.push(`rs-${randomNumber}`);
    }
  }

  return values;
}
