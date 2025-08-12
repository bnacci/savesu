import { Head, useForm } from '@inertiajs/react';

import AuthLayout from '@layouts/auth-layout';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import InputError from '@components/InputError';
import { Label } from '@components/ui/label';
import React from 'react';
import { cn } from '@lib/utils';
import { useLang } from '@hooks/useLang';
import useRoute from '@hooks/useRoute';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const { __ } = useLang();

  const { data, processing, setData, post, reset, errors } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('password.update'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthLayout
      title={__('auth.reset_password.title')}
      onSubmit={onSubmit}
      form={{
        title: __('auth.reset_password.title'),
        description: __('auth.reset_password.description'),
      }}
      socialButtons={false}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">{__('common.email')}</Label>
        <Input
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={data.email}
          onChange={e => setData('email', e.currentTarget.value)}
          autoFocus
          aria-invalid={errors.email ? true : false}
          placeholder={__('auth.placeholders.forgot_password.email')}
        />
        <InputError className="mt-2" message={errors.email} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="grid gap-2">
            <Label htmlFor="password">{__('common.password')}</Label>
            <Input
              id="password"
              type="password"
              className="mt-1 block w-full"
              value={data.password}
              onChange={e => setData('password', e.currentTarget.value)}
              autoComplete="new-password"
              aria-invalid={errors.password ? true : false}
              placeholder={__('auth.placeholders.reset_password.password')}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">
              {__('common.confirm_password')}
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full"
              value={data.password_confirmation}
              onChange={e =>
                setData('password_confirmation', e.currentTarget.value)
              }
              autoComplete="new-password"
              aria-invalid={errors.password_confirmation ? true : false}
              placeholder={__('auth.placeholders.reset_password.password')}
            />
          </div>
        </div>
        <InputError className="mt-2" message={errors.password} />
        <InputError className="mt-2" message={errors.password_confirmation} />
      </div>

      <Button
        className={cn({ 'opacity-25': processing })}
        disabled={processing}
      >
        {__('common.reset_password')}
      </Button>
    </AuthLayout>
  );
}
