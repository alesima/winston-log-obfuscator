import { obfuscatePIX } from './pix';

describe('obfuscatePIX', () => {
  // Valid UUID v4 (EVP random key): version nibble 4, variant nibble 8-b
  const evp = '123e4567-e89b-42d3-a456-426614174000';

  it('should obfuscate PIX EVP keys completely by default', () => {
    const input = `Chave PIX: ${evp}`;
    const expected = 'Chave PIX: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
    expect(obfuscatePIX(input)).toBe(expected);
  });

  it('should show last characters when configured', () => {
    const expected = 'Chave PIX: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX4000';
    expect(obfuscatePIX(`Chave PIX: ${evp}`, 4)).toBe(expected);
  });

  it('should not touch non-v4 UUIDs', () => {
    const input = 'UUID: 123e4567-e89b-12d3-a456-426614174000';
    expect(obfuscatePIX(input)).toBe(input);
  });

  it('should leave other text untouched', () => {
    const input = 'Pagamento de R$ 100,00 confirmado';
    expect(obfuscatePIX(input)).toBe(input);
  });
});
