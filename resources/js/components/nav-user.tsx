'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import {
  IconApiApp,
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react';
import { Link, router } from '@inertiajs/react';

import React from 'react';
import { TeamSwitcher } from './team-switcher';
import { getInitials } from '@lib/utils';
import { useRoute } from 'ziggy-js';
import useTypedPage from '@hooks/useTypedPage';

export function NavUser() {
  const {
    props: {
      auth: { user },
      jetstream: { hasTeamFeatures, managesProfilePhotos, hasApiFeatures },
    },
  } = useTypedPage();
  const route = useRoute();

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-x-3 cursor-pointer">
        <Avatar className="h-8 w-8 rounded-full">
          {managesProfilePhotos && (
            <AvatarImage src={user!.profile_photo_url} alt={user!.name} />
          )}
          <AvatarFallback className="rounded-lg">
            {getInitials(user!.name)}
          </AvatarFallback>
        </Avatar>
        {/* <span>{user?.username}</span> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={user!.profile_photo_url} alt={user!.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user!.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user!.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {hasTeamFeatures && (
          <DropdownMenuItem>
            <TeamSwitcher />
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs">
            Manage account
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href={route('profile.show')}>
              <IconUserCircle />
              Profile
            </Link>
          </DropdownMenuItem>

          {hasApiFeatures && (
            <DropdownMenuItem asChild>
              <Link href={route('api-tokens.index')}>
                <IconApiApp />
                API Tokens
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
