import { Head, Link } from '@inertiajs/react';

import Logo from '@components/logo';
import React from 'react';
import { route } from 'ziggy-js';

interface Props {
  data: string;
  title: string;
}

export default function TermsLayout({ data, title }: Props) {
  return (
    <div className="sv-page">
      <Head title={title} />

      <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
        <div>
          <Link href={route('index')}>
            <Logo className="size-24" />
          </Link>
        </div>

        <div
          className="w-full sm:max-w-2xl mt-10 relative z-20"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    </div>
  );
}
