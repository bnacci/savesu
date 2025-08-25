import { ChatMessages, FlattenedMessage, Message } from '@typed';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { ReactElement } from 'react';

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

export function groupMessages(messages: Message[]) {
  const grouped: ChatMessages[] = [];

  messages.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  for (const message of messages) {
    const lastGroup = grouped[grouped.length - 1];

    if (!lastGroup || lastGroup.sender_id !== message.sender_id) {
      // Cria novo grupo
      grouped.push({
        sender_id: message.sender_id,
        messages: [],
      });
    }

    // Adiciona mensagem ao último grupo
    grouped[grouped.length - 1].messages.push({
      id: message.id,
      content: message.content,
      created_at: message.created_at,
    });
  }

  return grouped;
}

export function ungroupMessages(grouped: ChatMessages[]): FlattenedMessage[] {
  const flat: FlattenedMessage[] = [];

  for (const group of grouped) {
    for (const message of group.messages) {
      flat.push({
        id: message.id,
        sender_id: group.sender_id,
        content: message.content,
        created_at: message.created_at,
      });
    }
  }

  // Opcional: ordenar por data
  flat.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return flat;
}

export function nl2br(input: string): (string | ReactElement)[];
export function nl2br<T>(input: T): T;
export function nl2br<T>(input: T | string): (string | ReactElement)[] | T {
  if (typeof input === 'string') {
    const newlineRegex = /\r\n|\n|\r/g;
    return input
      .split(newlineRegex)
      .flatMap((part, index, array) =>
        index < array.length - 1 ? [part, <br key={index} />] : [part],
      );
  }
  return input;
}
