export const hexToString = (hex: string): string => {
  let string = "";
  for (let i = 0; i < hex.length; i += 2) {
    const charCode = parseInt(hex.substring(i, i + 2), 16);
    if (!isNaN(charCode)) {
      string += String.fromCharCode(charCode);
    } else {
      throw new Error(
        `Invalid hexadecimal character at index ${i}: '${hex.substring(i, 2)}'`
      );
    }
  }
  return string;
};
