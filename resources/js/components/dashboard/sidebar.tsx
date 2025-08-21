'use client';

import {
  IconAccessPoint,
  IconBasket,
  IconBasketFilled,
  IconBible,
  IconBubbleText,
  IconBubbleTextFilled,
  IconFolder,
  IconFolderOpen,
  IconHelpSquareRounded,
  IconLayoutDashboard,
  IconLayoutDashboardFilled,
  IconLifebuoy,
  IconLifebuoyFilled,
  IconMicrophone,
  IconMicrophoneFilled,
  IconMusic,
  IconSend,
  IconUsersGroup,
} from '@tabler/icons-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@components/ui/sidebar';

import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';
import React from 'react';
import { TeamSwitcher } from './team-switcher';
import UpgradeForm from './upgrade-form';
import { route } from 'ziggy-js';

// This is sample data.
const data = {
  navMain: [
    {
      label: 'Platform',
      items: [
        {
          title: 'Dashboard',
          route: 'dashboard',
          icon: {
            active: IconLayoutDashboardFilled,
            default: IconLayoutDashboard,
          },
          isActive: false,
        },
        {
          title: 'SVU Store',
          route: 'dashboard',
          icon: {
            active: IconBasket,
            default: IconBasketFilled,
          },
          isActive: false,
        },
        {
          title: 'File manager',
          route: 'dashboard',
          icon: {
            active: IconFolderOpen,
            default: IconFolder,
          },
          isActive: false,
        },
        {
          title: 'SVU Records',
          route: 'records',
          icon: {
            active: IconMusic,
            default: IconMusic,
          },
          isActive: false,
        },
        {
          title: 'Bible',
          route: 'bible',
          icon: {
            active: IconBible,
            default: IconBible,
          },
          isActive: false,
        },
        {
          title: 'SVU Podcast',
          route: 'podcast',
          icon: {
            active: IconMicrophoneFilled,
            default: IconMicrophone,
          },
          isActive: false,
        },
      ],
    },
    {
      label: 'Connections',
      items: [
        {
          title: 'Chats',
          route: 'user.chats',
          icon: {
            active: IconBubbleTextFilled,
            default: IconBubbleText,
          },
          isActive: false,
        },
        {
          title: 'Channels',
          route: 'dashboard',
          icon: {
            active: IconAccessPoint,
            default: IconAccessPoint,
          },
          isActive: false,
          items: [
            {
              title: 'History',
              route: '#',
            },
            {
              title: 'Starred',
              route: '#',
            },
            {
              title: 'Settings',
              route: '#',
            },
          ],
        },
        {
          title: 'Groups',
          route: 'dashboard',
          icon: {
            active: IconUsersGroup,
            default: IconUsersGroup,
          },
          isActive: false,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: IconLifebuoy,
    },
    {
      title: 'Help',
      url: '#',
      icon: IconHelpSquareRounded,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: IconSend,
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} variant="inset">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UpgradeForm />
        <NavUser />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
