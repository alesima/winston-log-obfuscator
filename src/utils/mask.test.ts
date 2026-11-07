import { maskDigits } from './mask';

describe('maskDigits', () => {
  it('should mask every character when showLast is 0', () => {
    expect(maskDigits('12345678901', 0)).toBe('XXXXXXXXXXX');
  });

  it('should reveal the trailing characters when showLast is set', () => {
    expect(maskDigits('12345678901', 2)).toBe('XXXXXXXXX01');
  });

  it('should support a custom mask character', () => {
    expect(maskDigits('1234', 0, '*')).toBe('****');
  });

  it('should keep the input length', () => {
    const masked = maskDigits('123456789012345678901234567890123456789012345678', 4);
    expect(masked).toHaveLength(48);
    expect(masked.endsWith('5678')).toBe(true);
  });
});
