import { Head, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

import AuthLayout from '@layouts/auth-layout';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import InputError from '@components/InputError';
import { Label } from '@components/ui/label';
import { cn } from '@lib/utils';
import { useLang } from '@hooks/useLang';
import useRoute from '@hooks/useRoute';

export default function TwoFactorChallenge() {
  const route = useRoute();
  const { __ } = useLang();
  const [recovery, setRecovery] = useState(false);
  const form = useForm({
    code: '',
    recovery_code: '',
  });
  const recoveryCodeRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  function toggleRecovery(e: React.FormEvent) {
    e.preventDefault();
    const isRecovery = !recovery;
    setRecovery(isRecovery);

    setTimeout(() => {
      if (isRecovery) {
        recoveryCodeRef.current?.focus();
        form.setData('code', '');
      } else {
        codeRef.current?.focus();
        form.setData('recovery_code', '');
      }
    }, 100);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('two-factor.login'));
  }

  return (
    <AuthLayout
      title={__('auth.two_factor.title')}
      onSubmit={onSubmit}
      form={{
        title: __('auth.two_factor.title'),
        description: __('auth.two_factor.description'),
      }}
    >
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {recovery ? __('auth.status.recovery_code') : __('auth.status.code')}
      </div>

      <form onSubmit={onSubmit}>
        {recovery ? (
          <div>
            <Label htmlFor="recovery_code">{__('common.recovery_code')}</Label>
            <Input
              id="recovery_code"
              type="text"
              className="mt-1 block w-full"
              value={form.data.recovery_code}
              onChange={e =>
                form.setData('recovery_code', e.currentTarget.value)
              }
              ref={recoveryCodeRef}
              autoComplete="one-time-code"
              placeholder={__('auth.placeholders.two_factor.recovery_code')}
            />
            <InputError className="mt-2" message={form.errors.recovery_code} />
          </div>
        ) : (
          <div>
            <Label htmlFor="code">{__('common.code')}</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              className="mt-1 block w-full"
              value={form.data.code}
              onChange={e => form.setData('code', e.currentTarget.value)}
              autoFocus
              autoComplete="one-time-code"
              ref={codeRef}
              placeholder={__('auth.placeholders.two_factor.code')}
            />
            <InputError className="mt-2" message={form.errors.code} />
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <button
            type="button"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer"
            onClick={toggleRecovery}
          >
            {recovery
              ? __('auth.two_factor.use_code')
              : __('auth.two_factor.use_recovery_code')}
          </button>

          <Button
            className={cn('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            {__('common.access_your_account')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
