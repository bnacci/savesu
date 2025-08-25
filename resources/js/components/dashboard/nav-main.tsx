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
import { Badge } from '@components/ui/badge';

type Items = {
  title: string;
  route: string;
  icon?: {
    active: LucideIcon | TablerIcon;
    default: LucideIcon | TablerIcon;
  };
  isActive?: boolean;
  count?: number;
  items?: Items[];
};

type ItemsProp = {
  label: string;
  items: Items[];
};

export function NavMain({ items }: { items: ItemsProp[] }) {
  const route = useRoute();

  return (
    <SidebarGroup>
      {items.map(({ items, label }) => (
        <div key={label}>
          <SidebarGroupLabel className="pointer-events-none select-none">
            {label}
          </SidebarGroupLabel>
          <SidebarMenu>
            {items.map(
              ({
                title,
                count,
                route: itemRoute,
                items: data,
                isActive,
                icon,
              }) => (
                <Collapsible
                  key={title}
                  asChild
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  {data && data.length > 0 ? (
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={title}
                          className="cursor-pointer"
                        >
                          {icon &&
                            (route().current(itemRoute) ? (
                              <icon.active />
                            ) : (
                              <icon.default />
                            ))}
                          <span>{title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {data?.map(subItem => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={route(itemRoute)}>
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
                    <SidebarMenuItem key={itemRoute}>
                      <SidebarMenuButton asChild>
                        <Link href={route(itemRoute)}>
                          {icon &&
                            (route().current(itemRoute) ? (
                              <icon.active className="size-4" />
                            ) : (
                              <icon.default className="size-4" />
                            ))}
                          <span>{title}</span>

                          {count && (
                            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                              {count > 10 ? `${count}+` : count}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </Collapsible>
              ),
            )}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}
