import { Head, Link } from '@inertiajs/react';

import Logo from '@components/logo';
import React from 'react';
import TrioooLogo from '@components/triooo-logo';
import { route } from 'ziggy-js';

interface Props {
  data: string;
  title: string;
}

export default function TermsLayout({ data, title }: Props) {
  return (
    <div className="sv-page">
      <Head title={title} />

      <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0 container mx-auto">
        <div>
          <Link href={route('index')}>
            <Logo className="size-24" type="single" />
          </Link>
        </div>

        <div
          className="w-full sm:max-w-2xl mt-20 relative z-20"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>

      <div>
        <div className="flex items-center justify-center flex-col gap-y-2 mt-20 text-xs">
          <span>savesu was created and is maintained by:</span>
          <a href="https://triooo.com.br">
            <TrioooLogo className="w-16 mx-auto" />
          </a>
          <small>&copy; 2023 - 2026</small>
        </div>

        <div className="relative bottom-0 left-0 right-0 flex mt-10">
          <div className="w-full h-1.5 bg-[#6e5f51]"></div>
          <div className="w-full h-1.5 bg-gradient-to-r from-[#6e5f51] via-[#00afe5] to-[#ed3539]"></div>
          <div className="w-full h-1.5 bg-[#ed3539]"></div>
        </div>
      </div>
    </div>
  );
}
