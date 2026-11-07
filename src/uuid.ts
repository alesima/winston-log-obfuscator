/**
 * Obfuscates UUIDs in the given text.
 * By default, it masks the entire UUID. If showLast is greater than 0,
 * it reveals the specified number of characters at the end of the UUID.
 *
 * @param text - The input text containing UUIDs to obfuscate.
 * @param showLast - Number of characters to show at the end of the UUID (default is 0).
 * @returns The text with UUIDs obfuscated.
 */
import { maskDigits } from './utils/mask';

const uuidRegex = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;

function formatGrouped(masked: string): string {
  return `${masked.slice(0, 8)}-${masked.slice(8, 12)}-${masked.slice(12, 16)}-${masked.slice(16, 20)}-${masked.slice(20)}`;
}

export function obfuscateUUIDs(text: string, showLast: number = 0): string {
  return text.replace(uuidRegex, (match) => {
    const digits = match.replace(/-/g, '');
    return formatGrouped(maskDigits(digits, showLast));
  });
}
