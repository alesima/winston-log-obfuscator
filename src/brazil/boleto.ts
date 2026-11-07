/**
 * Obfuscates Boleto codes
 * Boleto codes are typically 44-48 digits
 *
 * @param text The input text containing Boleto codes to obfuscate.
 * @param showLast Number of digits to show at the end of Boleto codes (default is 0).
 * @returns The text with Boleto codes obfuscated.
 */
import { maskDigits } from '../utils/mask';

const boletoRegex = /\b\d{44,48}\b/g;

export function obfuscateBoleto(text: string, showLast: number = 0): string {
  return text.replace(boletoRegex, (match) => maskDigits(match, showLast));
}
