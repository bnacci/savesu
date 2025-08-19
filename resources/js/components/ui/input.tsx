import * as React from 'react';

import { IconEye, IconEyeOff } from '@tabler/icons-react';

import { cn } from '@lib/utils';
import { useState } from 'react';

function Input({
  className,
  type,
  passwordInputClassName,
  ...props
}: React.ComponentProps<'input'> & { passwordInputClassName?: string }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  return (
    <div className="relative">
      <input
        // type={type}
        type={isVisible ? 'text' : type}
        data-slot="input"
        className={cn(
          'file:text-foreground bg-white placeholder:text-muted-foreground selection:bg-primary-100 selection:text-primary-950 dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-primary-500 focus-visible:ring-primary-500/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-red-500/20 aria-invalid:bg-red-50 aria-invalid:text-red-500 aria-invalid:selection:bg-red-400 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 aria-invalid:placeholder:text-red-200',
          type === 'password' && 'pr-10',
          className,
        )}
        {...props}
      />

      {type === 'password' && (
        <button
          className={cn(
            'text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 right-1 cursor-pointer',
            passwordInputClassName,
          )}
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          aria-controls="password"
          tabIndex={-1}
        >
          {isVisible ? (
            <IconEyeOff size={20} aria-hidden="true" />
          ) : (
            <IconEye size={20} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
