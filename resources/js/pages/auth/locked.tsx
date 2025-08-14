import { Button } from '@components/ui/button';
import React from 'react';
import { useAuthStore } from '@lib/store/auth-store';

export default function Locked({ back }: { back: string }) {
  const { lockedPage, setLockedPage } = useAuthStore();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>User locked</h1>
      <Button
        onClick={() => {
          setLockedPage(false);
          window.location.href = back;
        }}
      >
        Unlock
      </Button>
    </div>
  );
}
