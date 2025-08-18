import AppLayout from '@layouts/app-layout';
import DeleteUserForm from '@pages/Profile/Partials/DeleteUserForm';
import LogoutOtherBrowserSessions from '@pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import React from 'react';
import SectionBorder from '@components/SectionBorder';
import { Session } from '@typed';
import TwoFactorAuthenticationForm from '@pages/Profile/Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@pages/Profile/Partials/UpdateProfileInformationForm';
import useTypedPage from '@hooks/useTypedPage';

interface Props {
  sessions: Session[];
  confirmsTwoFactorAuthentication: boolean;
}

export default function Show({
  sessions,
  confirmsTwoFactorAuthentication,
}: Props) {
  const {
    props: {
      jetstream,
      auth: { user },
    },
  } = useTypedPage();

  return (
    <AppLayout
      title={'Profile'}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Profile
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          {jetstream.canUpdateProfileInformation ? (
            <div>
              <UpdateProfileInformationForm user={user!} />

              <SectionBorder />
            </div>
          ) : null}

          {jetstream.canUpdatePassword &&
          !user?.provider &&
          !user?.provider_id ? (
            <div className="mt-10 sm:mt-0">
              <UpdatePasswordForm />

              <SectionBorder />
            </div>
          ) : null}

          {jetstream.canManageTwoFactorAuthentication ? (
            <div className="mt-10 sm:mt-0">
              <TwoFactorAuthenticationForm
                requiresConfirmation={confirmsTwoFactorAuthentication}
              />

              <SectionBorder />
            </div>
          ) : null}

          <div className="mt-10 sm:mt-0">
            <LogoutOtherBrowserSessions sessions={sessions} />
          </div>

          {jetstream.hasAccountDeletionFeatures ? (
            <>
              <SectionBorder />

              <div className="mt-10 sm:mt-0">
                <DeleteUserForm />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
