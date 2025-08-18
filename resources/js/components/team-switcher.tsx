'use client';

import * as React from 'react';

import { ChevronsUpDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';

import { Team } from '@typed';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';

export function TeamSwitcher() {
  const route = useRoute();
  const {
    props: {
      auth: { user },
      jetstream: { hasTeamFeatures },
    },
  } = useTypedPage();

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <activeTeam.logo className="size-4" />
        </div> */}
        <div className="flex w-full">
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {user?.current_team?.name}
            </span>
            {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
          </div>
          <ChevronsUpDown className="ml-auto" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        side="left"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Current team
        </DropdownMenuLabel>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={route('teams.show', [user?.current_team!])}>
            Team settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-muted-foreground text-xs">
          My teams
        </DropdownMenuLabel>
        {user?.all_teams?.map((team, index) => (
          <DropdownMenuItem
            key={team.name}
            className="gap-2 p-2 cursor-pointer"
            onClick={e => switchToTeam(e, team)}
          >
            <div className="flex items-center">
              {team.id == user?.current_team_id && (
                <svg
                  className="mr-2 h-5 w-5 text-green-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              )}
              <div>{team.name}</div>
            </div>

            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 p-2 cursor-pointer" asChild>
          <Link href={route('teams.create')}>
            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
              <Plus className="size-4" />
            </div>
            <div className="text-muted-foreground font-medium">Add team</div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
