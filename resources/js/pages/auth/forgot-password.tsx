import { Head, useForm, usePage } from '@inertiajs/react';

import AuthLayout from '@layouts/auth-layout';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import InputError from '@components/InputError';
import { Label } from '@components/ui/label';
import React from 'react';
import classNames from 'classnames';
import { useLang } from '@hooks/useLang';
import useRoute from '@hooks/useRoute';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();
  const { post, errors, data, setData, processing } = useForm({
    email: '',
  });
  const { trans, __ } = useLang();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('password.email'));
  }

  return (
    <AuthLayout
      title={__('auth.forgot_password.title')}
      onSubmit={onSubmit}
      form={{
        title: __('auth.forgot_password.title'),
        description: __('auth.forgot_password.description'),
      }}
      status={status}
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

      <Button
        className={classNames({ 'opacity-25': processing })}
        disabled={processing}
      >
        {__('auth.forgot_password.send_password_reset_link')}
      </Button>
    </AuthLayout>
  );
}
