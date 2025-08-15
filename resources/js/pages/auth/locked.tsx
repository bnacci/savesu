import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LogOut, PowerOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import InputError from '@components/InputError';
import { router } from '@inertiajs/core';
import { useAuthStore } from '@lib/store/auth-store';
import { useLang } from '@hooks/useLang';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';

type FormProps = {
  password: string;
};

export default function Locked({
  back,
  locale,
  canResetPassword,
}: {
  back: string;
  locale: string;
  canResetPassword?: boolean;
}) {
  const route = useRoute();
  const {
    props: {
      auth: { user },
    },
  } = useTypedPage();
  const { trans, __ } = useLang();
  const { setData, post, data, reset, errors, processing, clearErrors } =
    useForm<FormProps>({
      password: '',
    });
  const [inputFocused, setInputFocused] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearErrors();
    post(route('user.unlock', { ref: back }), {
      onFinish: () => reset('password'),
      onError: () => reset('password'),
    });
  }

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <>
      <Head title={__('common.lock_screen')} />
      <div className="h-screen flex flex-col items-center justify-center">
        <div
          className="bg-center bg-no-repeat bg-cover h-full w-full fixed top-0 left-0"
          style={{
            backgroundImage:
              'url(https://wallshub.pw/wp-content/uploads/2024/11/winter-snow-landscape-trees-1920x1280.jpg)',
            // 'url(https://depositphotos-blog.s3.eu-west-1.amazonaws.com/uploads/2017/07/Soothing-nature-backgrounds-2.jpg)',
          }}
        >
          <div
            className="absolute h-full w-full top-0 left-0 bg-black/50 transition-all ease-in-out"
            style={{
              backdropFilter: inputFocused ? 'blur(10px)' : undefined,
            }}
          ></div>
        </div>

        <div className="relative h-screen flex flex-col justify-between w-full items-center">
          <div className="self-end p-10">
            <ul className="text-white">
              <li>
                <Link
                  href={route('page.locked-page')}
                  className="hover:underline hover:opacity-100 opacity-70 underline-offset-4"
                >
                  {__('auth.why_seeing_page')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full max-w-xs">
            <img
              src={user?.profile_photo_url}
              alt={user?.username}
              className="size-40 rounded-full mb-10 mx-auto block object-cover"
            />

            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={e => setData('password', e.currentTarget.value)}
                  autoComplete="current-password"
                  disabled={processing}
                  aria-invalid={errors.password ? true : false}
                  placeholder={__('auth.placeholders.login.password')}
                  className="bg-white/20 backdrop-blur-lg border-0 text-white placeholder:text-white/50 focus-visible:ring-0 aria-invalid:bg-red-500/10 aria-invalid:placeholder:text-red-300/50"
                  onFocus={() => setInputFocused(true)}
                  onMouseEnter={() => setInputFocused(true)}
                  onMouseLeave={() => setInputFocused(false)}
                  onBlur={() => setInputFocused(false)}
                  passwordInputClassName="text-white hover:text-white"
                />
                <InputError
                  message={errors.password}
                  className="text-center bg-red-300 text-red-900 px-2 py-1 w-fit mx-auto"
                />
              </div>

              <Button disabled={processing}>
                {!processing ? __('common.unlock') : __('common.unlocking')}
              </Button>

              {canResetPassword && (
                <Link
                  tabIndex={-1}
                  href={route('password.request')}
                  className="text-sm underline-offset-4 hover:underline text-center text-white"
                >
                  {__('common.forgot_password')}
                </Link>
              )}
            </form>
          </div>

          <div className="flex p-10 justify-between w-full items-end">
            <Clock locale={locale} />

            <ul>
              <li>
                <form onSubmit={logout}>
                  <Button
                    variant="ghost"
                    className="hover:bg-white/30 hover:text-white text-white text-lg"
                  >
                    <LogOut />
                    {__('common.log_out')}
                  </Button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function Clock({ locale }: { locale: string }) {
  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
  });

  const date = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToTwoDigit = (number: number) => {
    return number.toLocaleString(locale, {
      minimumIntegerDigits: 2,
    });
  };

  return (
    <div className="text-center select-none pointer-events-none">
      <span className="text-white text-xl mb-3">{date}</span>

      <div className="font-medium text-white text-8xl tracking-tight [&>span]:not-last:after:content-[':']">
        <span>{convertToTwoDigit(time.hours)}</span>
        <span>{convertToTwoDigit(time.minutes)}</span>
        {/* <span>{convertToTwoDigit(time.seconds)}</span> */}
        {/* <span>{time.hours >= 12 ? ' PM' : ' AM'}</span> */}
      </div>
    </div>
  );
}
