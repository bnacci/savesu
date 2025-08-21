'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react';
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
  IconLogout,
  IconSparkles,
  IconUserCircle,
} from '@tabler/icons-react';
import { Link, router } from '@inertiajs/react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@components/ui/sidebar';

import React from 'react';
import { getInitials } from '@lib/utils';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';

export function NavUser() {
  const { isMobile } = useSidebar();

  const {
    props: {
      auth: { user },
      jetstream: { managesProfilePhotos, hasApiFeatures },
    },
  } = useTypedPage();
  const route = useRoute();

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  const UserAvatar = () => (
    <Avatar className="h-8 w-8 rounded-full">
      {managesProfilePhotos && (
        <AvatarImage src={user!.profile_photo_url} alt={user!.name} />
      )}
      <AvatarFallback className="rounded-lg">
        {getInitials(user!.name)}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="#">
                <IconSparkles />
                Upgrade account
              </Link>
            </DropdownMenuItem>

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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
