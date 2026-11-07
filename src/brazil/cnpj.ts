/**
 * Obfuscates Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica)
 * Matches XX.XXX.XXX/XXXX-XX pattern
 *
 * @param text The input text containing CNPJs to obfuscate.
 * @param showLast Number of digits to show at the end of CNPJs (default is 0).
 * @returns The text with CNPJs obfuscated.
 */
import { maskDigits } from '../utils/mask';

const cnpjRegex = /\b\d{2}[.\s-]?\d{3}[.\s-]?\d{3}[.\s-]?\/?\d{4}[.\s-]?\d{2}\b/g;

export function obfuscateCNPJ(text: string, showLast: number = 0): string {
  return text.replace(cnpjRegex, (match) => {
    const digits = match.replace(/\D/g, '');
    const masked = maskDigits(digits, showLast);
    return `${masked.slice(0, 2)}.${masked.slice(2, 5)}.${masked.slice(5, 8)}/${masked.slice(8, 12)}-${masked.slice(12)}`;
  });
}
