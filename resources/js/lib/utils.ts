import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function minutesToMilliseconds(minutes: number): number {
  return minutes * 60 * 1000;
}

export function getInitials(name: string) {
  const words = name
    .trim() // remove espaços do início/fim
    .split(/\s+/); // divide por qualquer quantidade de espaços

  if (words.length === 0) return '';

  const firstLetter = words[0][0];
  const lastLetter = words[words.length - 1][0];

  return (firstLetter + lastLetter).toUpperCase();
}

export function coinsFormatted(amount: number, locale: string) {
  const cents = Math.round(amount * 100);

  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
