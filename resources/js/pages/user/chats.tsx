import {
  IconCheck,
  IconChecks,
  IconDotsVertical,
  IconPhone,
  IconPinFilled,
  IconSearch,
  IconVideo,
} from '@tabler/icons-react';
import React, { ComponentProps, ReactNode } from 'react';

import AppLayout from '@layouts/app-layout';
import { Badge } from '@components/ui/badge';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { useChatStore } from '@lib/store/chat-store';

const chats = Array.from({ length: 10 }).map((_, i) => ({
  user: {
    name: `Usuário ${i + 1}`,
    avatar: `avatar_usuario_${i + 1}.png`,
    is_online: i + 1 === 6,
  },
  is_pinned: i + 1 === 1,
  sended: i + 1 === 2,
  viewed: i === 5,
  delivered: i + 1 === 9,
  messages: [],
}));

export default function ChatsPage() {
  const { activeChat, setActiveChat } = useChatStore();

  return (
    <AppLayout title="Dashboard">
      <div className="flex gap-10">
        <div className="w-1/5">
          <ScrollArea className="h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.2))] w-full px-4">
            <div className="sticky top-0 bg-background z-20">
              <Input />
            </div>

            <div className="grid grid-cols-1 pt-5 gap-2">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex p-3 rounded-2xl cursor-pointer backdrop-blur-3xl hover:bg-primary-500/15',
                    {
                      'bg-primary-500/15': activeChat === index,
                    },
                  )}
                  onClick={() => setActiveChat(index)}
                >
                  <div
                    className="bg-cover relative bg-center bg-no-repeat size-12 rounded-2xl shrink-0"
                    style={{
                      backgroundImage: `url(https://ui-avatars.com/api/?name=${encodeURIComponent(chat.user.name)}&background=random&length=3)`,
                    }}
                  >
                    {chat.user.is_online && (
                      <div className="h-2.5 w-2.5 ring-[2px] ring-background rounded-full bg-emerald-500 absolute bottom-0 right-0"></div>
                    )}
                  </div>

                  <div className="pl-4">
                    <div className="grid grid-cols-2 mb-1">
                      <span className="font-medium">{chat.user.name}</span>

                      <div className="flex justify-end items-center">
                        <span className="text-xs font-medium opacity-40">
                          4m
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4">
                      <div className="col-span-3 flex items-center gap-1 pr-2">
                        {(chat.viewed || chat.sended || chat.delivered) && (
                          <div
                            className={cn(
                              'opacity-40 [&_svg]:size-[18px] shrink-0',
                              {
                                'text-emerald-500 opacity-100': chat.viewed,
                              },
                            )}
                          >
                            {chat.sended && <IconCheck />}
                            {chat.delivered && <IconChecks />}
                            {chat.viewed && <IconChecks />}
                          </div>
                        )}

                        <p className="line-clamp-1 text-xs">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Quia sint totam dignissimos enim odit modi
                          minima qui doloribus, at atque nesciunt reiciendis
                          aspernatur. Dolorum dolor sequi aut mollitia aliquam
                          magnam.
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-x-2 justify-end">
                        {chat.messages.length > 0 && (
                          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                            5
                          </Badge>
                        )}

                        {chat.is_pinned && (
                          <IconPinFilled size={16} className="shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <Separator className="my-2" /> */}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="w-3/5">
          {activeChat !== null ? (
            <div className="h-full flex flex-col justify-between">
              <div className="sticky top-0 h-10 flex justify-between">
                <div className="">
                  <h3 className="font-bold text-xl">
                    {chats[activeChat].user.name}
                  </h3>
                  {chats[activeChat].user.is_online && (
                    <div className="text-xs text-emerald-500 font-medium">
                      Online
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <IconSearch />
                  <IconPhone />
                  <IconVideo />
                  <IconDotsVertical />
                </div>
              </div>

              <ScrollArea
                className="h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.2)_-_theme(spacing.10)_-_theme(spacing.20))]"
                classNameViewportArea="h-full [&>div]:h-full"
              >
                <div className="flex h-full justify-end items-end flex-col">
                  <Receiver bubbleColor="bg-primary-200" />
                  <Sender bubbleColor="bg-zinc-100 text-zinc-950" />
                </div>
              </ScrollArea>

              <div className="h-20">Message form</div>
            </div>
          ) : (
            <h1>Select chat</h1>
          )}

          {/* <ScrollArea
            className="h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.2))]"
            classNameViewportArea="h-full [&>div]:h-full"
          >
            {activeChat !== null ? (
              <div className="h-full flex flex-col justify-between">
                <div className="sticky top-0">
                  {chats[activeChat!].user.name}
                </div>

                <div className="flex h-full"></div>

                <div>Message form</div>
              </div>
            ) : (
              <h1>Select chat</h1>
            )}
          </ScrollArea> */}
        </div>

        <div className="w-1/5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          iste fugit labore odit voluptatibus temporibus dicta quasi, id sit
          delectus adipisci minus et, inventore eveniet sunt blanditiis
          repellendus laboriosam accusamus!
        </div>
      </div>
    </AppLayout>
  );
}

function ChatBubble({
  children,
  className,
  bubbleColor,
}: ComponentProps<'div'> & { bubbleColor?: string }) {
  return (
    <div
      className={cn(
        'bg-primary-500 rounded-2xl py-2 px-3 max-w-md w-fit text-primary-950',
        className,
        bubbleColor,
      )}
    >
      {/* <div className="chat-header">
        Obi-Wan Kenobi
        <time className="text-xs opacity-50">2 hours ago</time>
      </div> */}
      <div className="chat-bubble">{children}</div>
      {/* <div className="chat-footer opacity-50">Seen</div> */}
    </div>
  );
}

function Sender({ bubbleColor }: { bubbleColor?: string }) {
  return (
    <div className="w-full flex flex-col justify-end items-end gap-0.5 [&>div]:last:rounded-tr-sm [&>div]:not-last:rounded-br-sm [&>div]:not-last:rounded-tr-sm [&>div]:first:rounded-tr-2xl">
      <ChatBubble className={cn(bubbleColor)}>Hello!!</ChatBubble>
      <ChatBubble className={cn(bubbleColor)}>I'm fine! And you?</ChatBubble>
    </div>
  );
}

function Receiver({ bubbleColor }: { bubbleColor?: string }) {
  return (
    <div className="w-full flex flex-col justify-start items-starjustify-start gap-0.5 [&>div]:last:rounded-tl-sm [&>div]:not-last:rounded-bl-sm [&>div]:not-last:rounded-tl-sm [&>div]:first:rounded-tl-2xl">
      <ChatBubble className={cn(bubbleColor)}>Hiii!!!</ChatBubble>
      <ChatBubble className={cn(bubbleColor)}>How are you?</ChatBubble>
      <ChatBubble className={cn(bubbleColor)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique iste
        fugit labore odit voluptatibus temporibus dicta quasi, id sit delectus
        adipisci minus et, inventore eveniet sunt blanditiis repellendus
        laboriosam accusamus!
      </ChatBubble>
    </div>
  );
}
