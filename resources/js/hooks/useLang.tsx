import React, { ReactNode } from 'react';

import { usePage } from '@inertiajs/react';

type Replaces = Record<string, string | number>;
type ReplacesNode = Record<string, ReactNode>;

type LangValue = string | { [key: string]: string | LangValue };
type LangObject = Record<string, LangValue>;

export function useLang() {
  const { translations } = usePage<{ translations: LangObject }>().props;
  const lang = JSON.parse(translations as unknown as string);

  //   function trans(key: string, replaces: Replaces | string = {}): string {
  //     const raw = getValueFromKey(key);
  //     if (typeof raw !== 'string') return key;

  //     let translated = raw;

  //     if (typeof replaces === 'string') {
  //       translated += ' ' + replaces;
  //     } else if (typeof replaces === 'object') {
  //       translated = replacePlaceholders(translated, replaces);
  //     }

  //     return translated;
  //   }

  // 🔤 Translação simples que sempre retorna string
  function trans(key: string, replaces: Replaces | string = {}): string {
    const raw = getValueFromKey(key);
    if (typeof raw !== 'string') return key;

    if (typeof replaces === 'string') {
      return raw + ' ' + replaces;
    }

    return replacePlaceholders(raw, replaces);
  }

  function _r(key: string, replaces: ReplacesNode = {}): ReactNode {
    const raw = getValueFromKey(key);
    if (typeof raw !== 'string') return key;

    const parts: ReactNode[] = [];
    const regex = /:([a-zA-Z0-9_]+)/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(raw)) !== null) {
      const [placeholder, name] = match;
      const index = match.index;

      // Texto antes do placeholder
      if (lastIndex < index) {
        parts.push(raw.slice(lastIndex, index));
      }

      // Substituir pelo ReactNode ou placeholder original
      parts.push(replaces[name] ?? placeholder);

      lastIndex = index + placeholder.length;
    }

    // Texto restante após o último placeholder
    if (lastIndex < raw.length) {
      parts.push(raw.slice(lastIndex));
    }

    return <>{parts}</>;
  }

  function __(key: string, replaces: Replaces | string = {}) {
    return trans(key, replaces);
  }

  function replacePlaceholders(text: string, replaces: Replaces): string {
    return Object.entries(replaces).reduce(
      (acc, [key, val]) => acc.replaceAll(`:${key}`, String(val)),
      text,
    );
  }

  function getValueFromKey(key: string): string | undefined {
    const segments = key.split('.');
    let current: LangValue | undefined = lang;

    for (const segment of segments) {
      if (typeof current !== 'object' || current === null) return undefined;
      current = current[segment] as LangValue | undefined;
    }

    return typeof current === 'string' ? current : undefined;
  }

  return { trans, __, _r };
}
