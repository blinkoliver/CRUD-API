export const parseURL = (string: string): string => {
  const begin: number = string.indexOf("$%7B");
  const end: number = string.lastIndexOf("%7D");
  if (begin === -1 && end === -1) {
    return string;
  } else {
    return string.slice(begin + 4, end);
  }
};
