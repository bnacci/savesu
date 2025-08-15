import React, { PropsWithChildren } from 'react';

import { cn } from '@lib/utils';

interface Props {
  message?: string;
  className?: string;
}

export default function InputError({
  message,
  className,
  children,
}: PropsWithChildren<Props>) {
  if (!message && !children) {
    return null;
  }
  return (
    <div
      className={cn(
        'text-xs text-red-600 dark:text-red-400 font-medium',
        className,
      )}
    >
      {message || children}
    </div>
  );
}
