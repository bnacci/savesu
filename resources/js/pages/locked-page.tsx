import { Head } from '@inertiajs/react';
import React from 'react';
import TermsLayout from '@layouts/terms-layout';
import { useLang } from '@hooks/useLang';

interface Props {
  locked_page: string;
}

export default function PrivacyPolicy({ locked_page }: Props) {
  const { __ } = useLang();

  return <TermsLayout title={__('common.locked_page')} data={locked_page} />;
}
