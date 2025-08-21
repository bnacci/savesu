import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';

import { Button } from '@components/ui/button';
import { IconSparkles } from '@tabler/icons-react';
import { RainbowButton } from '@components/ui/rainbow-button';
import React from 'react';
import { cn } from '@lib/utils';
import { useAuthStore } from '@lib/store/auth-store';
import { useSidebar } from '@components/ui/sidebar';

export default function UpgradeForm() {
  const { showUpgradeForm, setShowUpgradeForm } = useAuthStore();
  const { open } = useSidebar();

  //   if (!open) return;

  return (
    showUpgradeForm && (
      <div className="p-0">
        <Card
          className={cn('gap-2 py-4 shadow-none text-center', {
            'py-0 border-0 bg-transparent': !open,
          })}
        >
          {open && (
            <CardHeader className="px-4">
              <CardTitle className="text-sm flex gap-x-2 items-center uppercase">
                <IconSparkles size={30} />
                Upgrade account
              </CardTitle>
              <CardDescription className="text-xs">
                Unlock exclusive features and deepen your journey with God.
                {/* Desbloqueie recursos exclusivos e aprofunde sua jornada com Deus. */}
              </CardDescription>
            </CardHeader>
          )}

          <CardContent className={cn('px-4', { 'px-0': !open })}>
            <div className="grid gap-2.5">
              <RainbowButton className={cn({ 'px-0 h-8': !open })}>
                {open ? 'Upgrade' : <IconSparkles className="size-5" />}
              </RainbowButton>

              {open && (
                <a
                  onClick={() => setShowUpgradeForm(false)}
                  className="text-xs inline-block mx-auto hover:underline underline-offset-2 cursor-pointer"
                >
                  Not yet
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  );
}
