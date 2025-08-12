import { Head } from '@inertiajs/react';
import Logo from '@components/logo';
import React from 'react';
import TermsLayout from '@layouts/terms-layout';
import { useLang } from '@hooks/useLang';

interface Props {
  terms: string;
}

export default function TermsOfService({ terms }: Props) {
  const { __ } = useLang();

  return <TermsLayout title={__('common.terms_of_service')} data={terms} />;
}
