/**
 * WARNING: This is a problem for a locale that uses a comma as a decimal separator
 * Removes comma from the input string and parses it to a float.
 *
 * @param {string} value - The input string to remove comma and parse
 * @return {number} The parsed float number
 */
export function removeCommaAndParseFloat(value: string): number {
  if (!value) return 0;
  if (typeof value === "number") return value;
  try {
    return parseFloat(value.replace(",", ""));
  } catch (e) {
    console.error(`Error parsing ${value} to float`, e);
    return 0;
  }
}

/**
 * Returns the number with its (+/-) sign flipped.
 * @param {number} num The number to flip the sign of
 * @returns {number} The number with its sign flipped
 */
export const invertNumber = (num: number): number => {
  if (typeof num !== "number") {
    throw new Error("invertNumber() expects a number, but got " + typeof num);
  }
  return num * -1;
};
