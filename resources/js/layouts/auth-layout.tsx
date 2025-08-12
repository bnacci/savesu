import { ArrowLeft, GalleryVerticalEnd, Mail } from 'lucide-react';
import { Button, buttonVariants } from '@components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import AuthLogo from '@components/auth-logo';
import SocialButtons from '@components/social-buttons';
import { TextGenerateEffect } from '@components/ui/text-generate-effect';
import { cn } from '@lib/utils';
import { route } from 'ziggy-js';
import { useAuthStore } from '@lib/store/auth-store';
import { useLang } from '@hooks/useLang';

interface Props {
  title: string;
  form: {
    title: string;
    description: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  socialButtons?: boolean;
  status?: string | null | undefined;
}

// const savesuSlogans = [
//   {
//     slogan: 'Saved to Serve, Called to Connect.',
//     description:
//       'Savesu is more than just a platform — it’s a calling. We believe every believer is saved by grace to serve others and called to connect with the Body of Christ. Here, you’ll find tools, teachings, and a community to help you live out your faith in purpose and unity.',
//   },
//   {
//     slogan: 'Faith. Community. Purpose.',
//     description:
//       "At Savesu, everything we do is built on three pillars: unwavering faith, authentic Christian community, and a God-given purpose. Whether you're here to grow spiritually, find support, or serve others, this is the place to walk your journey with Christ — together.",
//   },
//   {
//     slogan: 'Where Salvation Meets Connection.',
//     description:
//       'Savesu bridges the gap between your personal faith and the global Church. It’s a space where your salvation story is just the beginning — and connection with others turns belief into shared mission. Join a movement that unites hearts through Christ.',
//   },
//   {
//     slogan: 'Join the Journey. Live the Gospel.',
//     description:
//       'The walk of faith isn’t meant to be traveled alone. With Savesu, you’re invited to join a Christ-centered journey, grow deeper in God’s Word, and live out the gospel through connection, service, and love. This is your next step — together in faith.',
//   },
//   {
//     slogan: 'More than a Platform, a Purpose.',
//     description:
//       'Savesu isn’t just a digital space — it’s a God-given mission. Here, you’ll find more than content and community; you’ll discover purpose, identity, and belonging in Christ. Everything we do is designed to help you walk boldly in your calling.',
//   },
//   {
//     slogan: 'United in Christ, Connected in Purpose.',
//     description:
//       'In a divided world, Savesu exists to unite believers under one name — Jesus. We’re building a global community that’s rooted in the gospel and driven by purpose. Together, we serve, grow, and reflect the love of Christ wherever we are.',
//   },
// ];

type Slogan = { slogan: string; description: string };

export default function AuthLayout({
  title,
  children,
  form,
  onSubmit,
  socialButtons = true,
  status,
}: PropsWithChildren<Props>) {
  const currentRoute = route().current();
  //   const [showForm, setShowForm] = useState(!socialButtons);
  const { showForm, setShowForm, showedSlogan, setShowedSlogan } =
    useAuthStore();
  const [showSecond, setShowSecond] = useState(false);
  const { slogan } = usePage<{ slogan: Slogan }>().props;
  const { __ } = useLang();

  useEffect(() => {
    // if (socialButtons) {
    //   setShowForm(showForm && socialButtons);
    // }

    const searchParams = new URLSearchParams(window.location.search);
    let params: { [key: string]: string } = {};
    for (let param of searchParams) {
      params[param[0]] = param[1];
    }

    if (params.showForm) {
      setShowForm(true);
    }
  }, []);

  return (
    <>
      <Head title={title} />
      <div className="grid min-h-svh lg:grid-cols-3">
        <div className="bg-white relative hidden lg:block col-span-1">
          <div className="relative h-full w-full flex flex-col p-10">
            <div
              className={cn(
                'absolute inset-0',
                '[background-size:20px_20px]',
                '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
                'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]',
              )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <div className="flex justify-center gap-2 md:justify-start relative z-10">
              <AuthLogo />
            </div>

            {slogan && (
              <div className="relative z-10 mt-auto">
                {!showedSlogan ? (
                  <>
                    <TextGenerateEffect
                      words={slogan.slogan}
                      className="text-6xl mb-10"
                      onComplete={() => {
                        setShowSecond(true);
                      }}
                    />

                    {showSecond && (
                      <TextGenerateEffect
                        className="font-normal"
                        words={slogan.description}
                        onComplete={() => setShowedSlogan(true)}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <span className="font-bold text-6xl mb-10 block">
                      {slogan.slogan}
                    </span>
                    <span>{slogan.description}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 col-span-2 relative">
          <div className="flex flex-1 items-center justify-center md:p-10 p-6">
            <div className="w-full max-w-sm">
              <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">{form.title}</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    {form.description}
                  </p>
                </div>

                {status && (
                  <div className="rounded-md border border-emerald-500/30 px-4 py-3 text-emerald-600 text-center bg-emerald-50/40">
                    <p>{status}</p>
                  </div>
                )}

                <div className="grid gap-3">
                  {(showForm || !socialButtons) && (
                    <>
                      {children}

                      {socialButtons && showForm && (
                        <a
                          className="hover:underline underline-offset-4 cursor-pointer mx-auto mt-5 flex gap-x-1 items-center"
                          onClick={() => setShowForm(false)}
                        >
                          <ArrowLeft size={16} />
                          {__('common.back')}
                        </a>
                      )}
                    </>
                  )}

                  {socialButtons && !showForm && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowForm(true)}
                      >
                        <Mail />
                        {currentRoute === 'login'
                          ? __('auth.access_with_email')
                          : __('auth.create_account_with_email')}
                      </Button>

                      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2 uppercase text-xs">
                          {__('auth.or_continue_with')}
                        </span>
                      </div>

                      <SocialButtons />
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>

          {(currentRoute === 'login' || currentRoute === 'register') && (
            <div className="p-10 relative">
              <div className="h-px w-full absolute left-0 top-0 right-0 block bg-gradient-to-l from-transparent via-border/40 to-trfrom-transparent"></div>

              <div className="flex lg:flex-row flex-col lg:justify-end lg:gap-10 gap-5 lg:text-right text-center items-center">
                <div className="max-w-lg">
                  <h4 className="font-bold text-lg tracking-wide">
                    {currentRoute === 'login'
                      ? __('auth.dont_have_account.title')
                      : __('auth.already_registered.title')}
                  </h4>
                  <p className="text-xs">
                    {currentRoute === 'login'
                      ? __('auth.dont_have_account.description')
                      : __('auth.already_registered.description')}
                  </p>
                </div>

                {currentRoute === 'login' ? (
                  <Link
                    href={route('register')}
                    className={cn(buttonVariants({ variant: 'outline' }))}
                  >
                    {__('auth.sign_up')}
                  </Link>
                ) : (
                  currentRoute === 'register' && (
                    <Link
                      href={route('login')}
                      className={cn(buttonVariants({ variant: 'outline' }))}
                    >
                      {__('auth.sign_in')}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
