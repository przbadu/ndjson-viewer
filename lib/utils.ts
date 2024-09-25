import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const flattenObject = (obj: Record<string, any>, parentKey = '', result: Record<string, any> = {}): Record<string, any> => {
  for (let key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      flattenObject(obj[key], newKey, result);
    } else {
      // Assign top-level or flattened key-value pairs
      result[newKey] = obj[key];
    }
  }
  return result;
};
