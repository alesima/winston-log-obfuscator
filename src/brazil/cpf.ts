/**
 * Obfuscates Brazilian CPF (Cadastro de Pessoas Físicas)
 * Matches XXX.XXX.XXX-XX pattern
 *
 * @param text The input text containing CPFs to obfuscate.
 * @param showLast Number of digits to show at the end of CPFs (default is 0).
 * @returns The text with CPFs obfuscated.
 */
import { maskDigits } from '../utils/mask';

const cpfRegex = /\b\d{3}[.\s-]?\d{3}[.\s-]?\d{3}[.\s-]?\d{2}\b/g;

export function obfuscateCPF(text: string, showLast: number = 0): string {
  return text.replace(cpfRegex, (match) => {
    const digits = match.replace(/\D/g, '');
    const masked = maskDigits(digits, showLast);
    return `${masked.slice(0, 3)}.${masked.slice(3, 6)}.${masked.slice(6, 9)}-${masked.slice(9)}`;
  });
}
