import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { useIdle } from '@uidotdev/usehooks';
import useTypedPage from '@hooks/useTypedPage';

export function useLockScreen() {
  const {
    props: {
      auth: { user },
      defaults: { lock_screen_duration },
    },
  } = useTypedPage();

  const idle = useIdle(lock_screen_duration); // 15 minutos

  useEffect(() => {
    if (idle && user && user?.preferences.lock_screen.enabled) {
      router.post(
        route('user.lock', {
          ref: encodeURIComponent(btoa(window.location.href)),
        }),
      );
    }
  }, [idle, user]);

  return { locked: idle };
}
