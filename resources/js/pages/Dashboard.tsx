import AppLayout from '@layouts/app-layout';
import React from 'react';
import Welcome from '@components/Welcome';

export default function Dashboard({ locale }: { locale?: string }) {
  return (
    <AppLayout title="Dashboard">
      <Welcome />
    </AppLayout>
  );
}
