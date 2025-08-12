import { Link } from '@inertiajs/react';
import Logo from './logo';
import React from 'react';

export default function AuthLogo() {
  return (
    <Link href="/" className="flex items-center gap-x-3 select-none">
      <Logo className="size-10" />

      <span className="text-2xl leading-none">
        saves<b className="font-extrabold">u</b>
      </span>
    </Link>
  );
}
