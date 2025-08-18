import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

import AuthLayout from '@layouts/auth-layout';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import InputError from '@components/InputError';
import { Label } from '@components/ui/label';
import { cn } from '@lib/utils';
import { useLang } from '@hooks/useLang';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';

type FormProps = {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
  timezone: string;
};

export default function Register({ error }: { error: string }) {
  const page = useTypedPage();
  const route = useRoute();
  const { __, trans, _r } = useLang();
  const { data, post, reset, processing, errors, setData } = useForm<FormProps>(
    {
      name: '',
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      terms: false,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  );

  const handleChange = (checked: boolean) => {
    setData('terms', checked);
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthLayout
      title={__('auth.register.title')}
      onSubmit={onSubmit}
      form={{
        title: __('auth.register.title'),
        description: __('auth.register.description'),
      }}
      error={error}
    >
      <input
        type="hidden"
        onChange={e => setData('timezone', e.currentTarget.value)}
        value={data.timezone}
      />
      <InputError message={errors.timezone} />

      <div className="flex gap-2">
        <div className="grid gap-2 w-full">
          <Label htmlFor="name">{__('common.name')}</Label>
          <Input
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={data.name}
            onChange={e => setData('name', e.currentTarget.value)}
            autoFocus
            autoComplete="name"
            disabled={processing}
            aria-invalid={errors.name ? true : false}
            placeholder={__('auth.placeholders.register.name')}
          />
          <InputError message={errors.name} />
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="username">{__('common.username')}</Label>
          <Input
            id="username"
            type="text"
            className="mt-1 block w-full"
            value={data.username}
            onChange={e => setData('username', e.currentTarget.value)}
            autoComplete="username"
            disabled={processing}
            aria-invalid={errors.username ? true : false}
            placeholder={__('auth.placeholders.register.username')}
          />
          <InputError message={errors.username} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">{__('common.email')}</Label>
        <Input
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={data.email}
          onChange={e => setData('email', e.currentTarget.value)}
          disabled={processing}
          aria-invalid={errors.email ? true : false}
          placeholder={__('auth.placeholders.register.email')}
        />
        <InputError message={errors.email} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="grid gap-2 w-full">
            <Label htmlFor="password">{__('common.password')}</Label>
            <Input
              id="password"
              type="password"
              className="mt-1 block w-full"
              value={data.password}
              onChange={e => setData('password', e.currentTarget.value)}
              autoComplete="new-password"
              disabled={processing}
              aria-invalid={errors.password ? true : false}
              placeholder={__('auth.placeholders.register.password')}
            />
          </div>

          <div className="grid gap-2 w-full">
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
              disabled={processing}
              aria-invalid={errors.password_confirmation ? true : false}
              placeholder={__('auth.placeholders.register.password')}
            />
          </div>
        </div>

        <InputError message={errors.password} />
        <InputError message={errors.password_confirmation} />
      </div>

      {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
        <div className="grid gap-2">
          <Label htmlFor="terms">
            <div className="flex items-center">
              <Checkbox
                name="terms"
                id="terms"
                checked={data.terms}
                onCheckedChange={handleChange}
                disabled={processing}
                aria-invalid={errors.terms ? true : false}
              />

              <div className="ml-2">
                {_r('common.agree_terms', {
                  terms: (
                    <Link
                      key="terms_of_service"
                      target="_blank"
                      href={route('terms.show')}
                      className="underline"
                    >
                      {__('common.terms_of_service')}
                    </Link>
                  ),
                  privacy: (
                    <Link
                      key="privacy_policy"
                      target="_blank"
                      href={route('policy.show')}
                      className="underline"
                    >
                      {__('common.privacy_policy')}
                    </Link>
                  ),
                })}
              </div>
            </div>
          </Label>
          <InputError message={errors.terms} />
        </div>
      )}

      <Button
        className={cn({ 'opacity-25': processing })}
        disabled={processing}
      >
        {__('common.create_account')}
      </Button>
    </AuthLayout>
  );
}
