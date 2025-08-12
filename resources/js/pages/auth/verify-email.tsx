import { Head, Link, useForm } from '@inertiajs/react';
import { LogOut, UserRound } from 'lucide-react';

import AuthLayout from '@layouts/auth-layout';
import { Button } from '@components/ui/button';
import React from 'react';
import { cn } from '@lib/utils';
import { useLang } from '@hooks/useLang';
import useRoute from '@hooks/useRoute';

interface Props {
  status: string;
}

export default function VerifyEmail({ status }: Props) {
  const route = useRoute();
  const { __ } = useLang();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('verification.send'));
  }

  return (
    <AuthLayout
      title={__('auth.verify_email.title')}
      onSubmit={onSubmit}
      form={{
        title: __('auth.verify_email.title'),
        description: __('auth.verify_email.description'),
      }}
      status={verificationLinkSent ? __('auth.verify_email.link_sent') : null}
      socialButtons={false}
    >
      <div className="mt-4 flex items-center flex-col justify-between gap-5">
        <Button
          className={cn('w-full', { 'opacity-25': form.processing })}
          disabled={form.processing}
        >
          {__('auth.verify_email.resend_verification_email')}
        </Button>

        <div className="flex justify-evenly items-center w-full">
          <Link
            href={route('profile.show')}
            className="flex items-center gap-x-2 hover:underline underline-offset-4"
          >
            <UserRound size={16} />
            {__('common.edit_profile')}
          </Link>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="flex items-center gap-x-2 cursor-pointer hover:underline underline-offset-4"
          >
            <LogOut size={16} />
            {__('common.log_out')}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
