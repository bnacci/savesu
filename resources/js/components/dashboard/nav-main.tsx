'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@components/ui/sidebar';
import React from 'react';
import { TablerIcon } from '@tabler/icons-react';
import useRoute from '@hooks/useRoute';
import { Link } from '@inertiajs/react';

export function NavMain({
  items,
}: {
  items: {
    label: string;
    items: {
      title: string;
      route: string;
      icon?: {
        active: LucideIcon | TablerIcon;
        default: LucideIcon | TablerIcon;
      };
      isActive?: boolean;
      items?: {
        title: string;
        route: string;
        icon?: {
          active: LucideIcon | TablerIcon;
          default: LucideIcon | TablerIcon;
        };
      }[];
    }[];
  }[];
}) {
  const route = useRoute();

  return (
    <SidebarGroup>
      {items.map(({ items, label }) => (
        <div key={label}>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarMenu>
            {items.map(item => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                {item.items && item.items.length > 0 ? (
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="cursor-pointer"
                      >
                        {item.icon &&
                          (route().current(item.route) ? (
                            <item.icon.active />
                          ) : (
                            <item.icon.default />
                          ))}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map(subItem => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={route(item.route)}>
                                {subItem.icon &&
                                  (route().current(subItem.route) ? (
                                    <subItem.icon.active />
                                  ) : (
                                    <subItem.icon.default />
                                  ))}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={item.route}>
                    <SidebarMenuButton asChild>
                      <Link href={route(item.route)}>
                        {item.icon &&
                          (route().current(item.route) ? (
                            <item.icon.active />
                          ) : (
                            <item.icon.default />
                          ))}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </Collapsible>
            ))}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}
