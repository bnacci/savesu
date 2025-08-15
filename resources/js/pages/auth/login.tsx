import { Head, Link, useForm } from '@inertiajs/react';

import AuthLayout from '@layouts/auth-layout';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import InputError from '@components/InputError';
import { Label } from '@components/ui/label';
import React from 'react';
import { cn } from '@lib/utils';
import { useLang } from '@hooks/useLang';
import useRoute from '@hooks/useRoute';

interface Props {
  canResetPassword: boolean;
  status: string;
  error: string;
}

type FormProps = {
  username: string;
  password: string;
  remember: boolean;
};

export default function Login({ canResetPassword, status, error }: Props) {
  const route = useRoute();
  const { setData, post, data, reset, errors, processing } = useForm<FormProps>(
    {
      username: '',
      password: '',
      remember: false,
    },
  );
  const { trans, __ } = useLang();

  const handleChange = (checked: boolean) => {
    setData('remember', checked);
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  }

  return (
    <AuthLayout
      title={__('auth.login.title')}
      onSubmit={onSubmit}
      form={{
        title: __('auth.login.title'),
        description: __('auth.login.description'),
      }}
      status={status}
      error={error}
    >
      <div className="grid gap-2">
        <Label htmlFor="username">{__('common.email_or_username')}</Label>
        <Input
          id="username"
          type="text"
          value={data.username}
          onChange={e => setData('username', e.currentTarget.value)}
          autoFocus
          disabled={processing}
          aria-invalid={errors.username ? true : false}
          placeholder={__('auth.placeholders.login.username')}
        />
        <InputError message={errors.username} />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">{__('common.password')}</Label>

          {canResetPassword && (
            <Link
              tabIndex={-1}
              href={route('password.request')}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {__('common.forgot_password')}
            </Link>
          )}
        </div>
        <Input
          id="password"
          type="password"
          value={data.password}
          onChange={e => setData('password', e.currentTarget.value)}
          autoComplete="current-password"
          disabled={processing}
          aria-invalid={errors.password ? true : false}
          placeholder={__('auth.placeholders.login.password')}
        />
        <InputError message={errors.password} />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-3">
          <Checkbox
            name="remember"
            id="remember"
            disabled={processing}
            checked={data.remember}
            //   checked={data.remember === 'on'}
            //   onChange={e =>
            //     setData('remember', e.currentTarget.checked ? 'on' : '')
            //   }
            onCheckedChange={handleChange}
          />
          <Label htmlFor="remember">{__('common.remember_me')}</Label>
        </div>
      </div>

      <Button
        className={cn({ 'opacity-25': processing })}
        disabled={processing}
      >
        {__('common.access_your_account')}
      </Button>

      {/* <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
        <div className="flex items-center justify-end">
          <Link
            href={route('register')}
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Need an account?
          </Link>

          <Button
            className={cn('ml-4', { 'opacity-25': processing })}
            disabled={processing}
          >
            Log in
          </Button>
        </div> */}
      {/* </div> */}
    </AuthLayout>
  );
}
