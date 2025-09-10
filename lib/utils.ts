import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currencyCode = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount)
}


/**
 * Converts camelCase or PascalCase to human-readable text.
 * Capitalizes each word and preserves common abbreviations (ID, URL, API, etc.).
 */
export function formatLabel(text: string): string {
  const abbreviations = ["ID", "URL", "API", "HTML", "CSS"];

  // Step 1: Add spaces before uppercase letters
  let result = text.replace(/([A-Z])/g, ' $1').trim();

  // Step 2: Capitalize first letter of each word, except known abbreviations
  result = result
    .split(' ')
    .map((word) => {
      return abbreviations.includes(word.toUpperCase()) 
        ? word.toUpperCase() 
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

  return result;
}

