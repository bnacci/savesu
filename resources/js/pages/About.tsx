import { Head } from '@inertiajs/react';
import React from 'react';
import { useLang } from '@hooks/useLang';

export default function About() {
  const { trans, __ } = useLang();

  return (
    <>
      <Head title="About" />
      <div className="h-screen flex items-center justify-center">
        <h1>About page</h1>
      </div>
    </>
  );
}
