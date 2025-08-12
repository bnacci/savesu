import { Head } from '@inertiajs/react';
import React from 'react';
import TermsLayout from '@layouts/terms-layout';
import { useLang } from '@hooks/useLang';

interface Props {
  policy: string;
}

export default function PrivacyPolicy({ policy }: Props) {
  const { __ } = useLang();

  return <TermsLayout title={__('common.privacy_policy')} data={policy} />;
}
