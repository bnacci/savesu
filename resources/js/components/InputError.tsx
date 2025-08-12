import React, { PropsWithChildren } from 'react';

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
    <div className={className}>
      <p className="text-xs text-red-600 dark:text-red-400 font-medium">
        {message || children}
      </p>
    </div>
  );
}
