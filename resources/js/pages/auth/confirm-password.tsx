import { Head, useForm } from '@inertiajs/react';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import InputError from '@components/InputError';
import { Label } from '@components/ui/label';
import React from 'react';
import { cn } from '@lib/utils';
import { useLang } from '@hooks/useLang';
import useRoute from '@hooks/useRoute';

export default function ConfirmPassword() {
  const route = useRoute();
  const { __ } = useLang();
  const { post, reset, data, setData, processing, errors } = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('password.confirm'), {
      onFinish: () => reset(),
    });
  }

  return (
    <div className="flex min-h-svh justify-center items-center">
      <Head title={__('auth.confirm_password.title')} />

      <div className="w-full max-w-sm">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              {__('auth.confirm_password.title')}
            </h1>
            <p className="text-muted-foreground text-sm text-balance">
              {__('auth.confirm_password.description')}
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">{__('common.password')}</Label>
            <Input
              id="password"
              type="password"
              className="mt-1 block w-full"
              value={data.password}
              onChange={e => setData('password', e.currentTarget.value)}
              autoComplete="current-password"
              autoFocus
              aria-invalid={errors.password ? true : false}
              placeholder={__('auth.placeholders.login.password')}
            />
            <InputError className="mt-2" message={errors.password} />
          </div>

          <Button
            className={cn({ 'opacity-25': processing })}
            disabled={processing}
          >
            {__('common.confirm')}
          </Button>

          <a
            className="hover:underline underline-offset-4 cursor-pointer mx-auto mt-5 flex gap-x-1 items-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            {__('common.back')}
          </a>
        </form>
      </div>
    </div>
  );
}
