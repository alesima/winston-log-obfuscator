/**
 * Obfuscates Brazilian PIX keys (chaves PIX).
 *
 * PIX EVP (chave aleatória) keys use the UUID v4 format, so they get their own
 * obfuscator: UUID-shaped values are only masked here when the `pix` option
 * is enabled, while the generic `uuid` option stays independent. Other PIX
 * key types (CPF, CNPJ, email, phone) are already covered by their own
 * obfuscators and need no special handling.
 *
 * @param text The input text containing PIX keys to obfuscate.
 * @param showLast Number of characters to show at the end of the key (default is 0).
 * @returns The text with PIX keys obfuscated.
 */
import { maskDigits } from './utils/mask';

// UUID v4: random keys issued by the Central Bank (EVP) follow this format.
const pixEvpRegex = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\b/g;

function formatGrouped(masked: string): string {
  return `${masked.slice(0, 8)}-${masked.slice(8, 12)}-${masked.slice(12, 16)}-${masked.slice(16, 20)}-${masked.slice(20)}`;
}

export function obfuscatePIX(text: string, showLast: number = 0): string {
  return text.replace(pixEvpRegex, (match) => {
    const digits = match.replace(/-/g, '');
    return formatGrouped(maskDigits(digits, showLast));
  });
}
