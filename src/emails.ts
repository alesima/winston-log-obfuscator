/**
 * Obfuscates email addresses
 * Replaces the local part with asterisks
 *
 * @param text The input text containing email addresses to obfuscate.
 * @param showFirst Number of characters to show at the start of the local part (default is 0).
 * @returns The text with email addresses obfuscated.
 */
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

export function obfuscateEmails(text: string, showFirst: number = 0): string {
  return text.replace(emailRegex, (match) => {
    const [local, domain] = match.split('@');
    if (showFirst > 0) {
      const visible = local.slice(0, showFirst);
      const masked = '*'.repeat(Math.max(local.length - showFirst, 0));
      return `${visible}${masked}@${domain}`;
    }
    return '*'.repeat(local.length) + '@' + domain;
  });
}
