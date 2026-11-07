/**
 * Obfuscates Social Security Numbers
 * Matches XXX-XX-XXXX pattern
 *
 * @param text The input text containing SSNs to obfuscate.
 * @param showLast Number of digits to show at the end of SSNs (default is 0).
 * @returns The text with SSNs obfuscated.
 */
import { maskDigits } from './utils/mask';

const ssnRegex = /\b\d{3}[- ]\d{2}[- ]\d{4}\b/g;

export function obfuscateSSN(text: string, showLast: number = 0): string {
  return text.replace(ssnRegex, (match) => {
    const digits = match.replace(/\D/g, '');
    const masked = maskDigits(digits, showLast);
    return `${masked.slice(0, 3)}-${masked.slice(3, 5)}-${masked.slice(5)}`;
  });
}
