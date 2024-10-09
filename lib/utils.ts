import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const flattenObject = (obj: Record<string, unknown>, parentKey = '', result: Record<string, unknown> = {}): Record<string, unknown> => {
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      flattenObject(obj[key] as Record<string, unknown>, newKey, result);
    } else {
      // Assign top-level or flattened key-value pairs
      result[newKey] = obj[key];
    }
  }
  return result;
};
