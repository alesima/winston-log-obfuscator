/**
 * Obfuscates Brazilian phone numbers
 * Matches +55 XX XXXXX-XXXX, (XX) XXXXX-XXXX, etc.
 *
 * @param text The input text containing Brazilian phone numbers to obfuscate.
 * @param showLast Number of digits to show at the end of phone numbers (default is 0).
 * @returns The text with Brazilian phone numbers obfuscated.
 */
import { maskDigits } from '../utils/mask';

// Digit guards on both sides so longer digit runs are never partially matched.
const intlPhoneRegex = /(?<!\d)(\+55\s\d{2}\s\d{4,5}-\d{4})(?!\d)/g;
const parenPhoneRegex = /(?<!\d)(\(\d{2}\)\s*\d{4,5}[\s-]\d{4})(?!\d)/g;
const barePhoneRegex = /(\b\d{2} \d{4,5}-\d{4}\b)/g;

export function obfuscateBrazilianPhones(text: string, showLast: number = 0): string {
  // Handle +55 XX XXXXX-XXXX format
  text = text.replace(intlPhoneRegex, (match) => {
    if (showLast > 0) {
      const digits = match.replace(/\D/g, '').slice(2); // Remove +55, keep area + phone
      const phoneDigits = digits.slice(2);
      const maskedPhone = maskDigits(phoneDigits, showLast);
      return `+55 XX ${maskedPhone.slice(0, -4)}-${maskedPhone.slice(-4)}`;
    }
    return '+55 XX XXXXX-XXXX';
  });

  // Handle (XX) XXXXX-XXXX format
  text = text.replace(parenPhoneRegex, (match) => {
    if (showLast > 0) {
      const digits = match.replace(/\D/g, '');
      const masked = maskDigits(digits, showLast);
      return `(XX) ${masked.slice(2, 7)}-${masked.slice(7)}`;
    }
    const matchParts = match.match(/(\(\d{2}\))\s*(\d{4,5})[\s-](\d{4})/);
    if (matchParts) {
      const area = '(XX)';
      const first = 'X'.repeat(matchParts[2].length);
      const second = 'X'.repeat(matchParts[3].length);
      return `${area} ${first}-${second}`;
    }
    return match;
  });

  // Handle XX XXXXX-XXXX format (only if it looks like a phone)
  text = text.replace(barePhoneRegex, (match) => {
    if (showLast > 0) {
      const digits = match.replace(/\D/g, '');
      const masked = maskDigits(digits, showLast);
      return `${masked.slice(0, 2)} ${masked.slice(2, 7)}-${masked.slice(7)}`;
    }
    const parts = match.split(/[\s-]/);
    const area = 'XX';
    const first = 'X'.repeat(parts[1].length);
    const second = 'X'.repeat(parts[2].length);
    return `${area} ${first}-${second}`;
  });

  return text;
}
