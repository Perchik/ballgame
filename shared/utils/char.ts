// Char is just an alias for a single a-z character
// prettier-ignore
export type Char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

// Function to validate that a string is a single character, ignoring case
export function isValidChar(char: string): boolean {
  const lowerChar = char.toLowerCase();
  return lowerChar.length === 1 && /^[a-z]$/.test(lowerChar);
}

// Function to ensure the string is a valid character, returning the lowercase version
export function sanitizeChar(char: string): Char | null {
  const lowerChar = char.toLowerCase();
  if (isValidChar(lowerChar)) {
    return lowerChar as Char; // Type assertion because we know it's valid at this point
  }
  return null; // not valid
}
