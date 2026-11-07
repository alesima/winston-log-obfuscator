/**
 * Masks a digit string, optionally revealing the last `showLast` characters.
 * @param digits Only the digits to mask.
 * @param showLast Number of trailing characters to reveal (0 masks everything).
 * @param maskChar Character used for masking.
 * @returns The masked string, same length as the input.
 */
export function maskDigits(
  digits: string,
  showLast: number,
  maskChar = 'X',
): string {
  if (showLast > 0) {
    const visible = digits.slice(-showLast);
    return maskChar.repeat(Math.max(digits.length - showLast, 0)) + visible;
  }
  return maskChar.repeat(digits.length);
}
