import {
  IconCheck,
  IconChecks,
  IconDotsVertical,
  IconPhone,
  IconPinFilled,
  IconSearch,
  IconSend,
  IconVideo,
} from '@tabler/icons-react';
import React, {
  ComponentProps,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn, nl2br } from '@lib/utils';
import { useChatMessagesStore, useChatStore } from '@lib/store/chat-store';

import AppLayout from '@layouts/app-layout';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ChatMessage } from '@typed';
import { Input } from '@components/ui/input';
import { Link } from '@inertiajs/react';
import LinkPreviewer from '@components/link-previewer';
import Loader from '@components/ui/loader';
import Logo from '@components/logo';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import { Textarea } from '@components/ui/textarea';
import { useRoute } from 'ziggy-js';
import useTypedPage from '@hooks/useTypedPage';

const chats = Array.from({ length: 20 }).map((_, i) => ({
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

const wallpaper =
  'https://i.pinimg.com/736x/ba/3f/60/ba3f6015223ac6d947835ef5ae387ffe.jpg';

export default function ChatsPage() {
  const { activeChat, setActiveChat } = useChatStore();
  const { messages, loadingMessages, getMessages, addMessage } =
    useChatMessagesStore();
  const route = useRoute();

  const {
    props: {
      auth: { user },
    },
  } = useTypedPage();

  const chatListRef = useRef<HTMLDivElement | null>(null);
  const chatTextareaContainerRef = useRef<HTMLDivElement | null>(null);
  const chatTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtro com base no nome ou conteúdo da mensagem
  const filteredChats = chats.filter(chat => {
    const nameMatch = chat.user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // const messageMatch = chat.messages.some((msg) =>
    //   msg.content.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // return nameMatch || messageMatch;
    return nameMatch;
  });

  useEffect(() => {
    if (activeChat) {
      getMessages(activeChat);
    }

    if (!chatListRef.current && !chatTextareaContainerRef.current) return; // Ensure the ref is attached

    const observer = new ResizeObserver(entries => {
      // Callback function fired when the observed element's size changes
      for (let entry of entries) {
        chatListRef.current!.style.height = `calc(100vh - ${entry.target.clientHeight}px)`;
      }
    });

    observer.observe(chatTextareaContainerRef.current!); // Start observing the element

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, [activeChat]);

  const selectChat = (index: number) => {
    setActiveChat(index);
    getMessages(index);
  };

  const sendMessage = () => {
    if (chatTextareaRef.current?.value) {
      addMessage({
        id: Math.random() * 100,
        sender_id: user?.id!,
        content: chatTextareaRef.current.value,
        created_at: Date.now().toLocaleString(),
      });

      chatTextareaRef.current.value = '';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      } else {
        // Previne a quebra de linha padrão
        event.preventDefault();
        sendMessage();
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <ScrollArea className="h-full w-full p-4">
          <div className="sticky top-0 bg-background z-20 flex gap-x-3">
            <Link href={route('index')}>
              <Logo type="single" className="shrink-0 size-10" />
            </Link>
            <Input
              className="focus-visible:ring-0 w-full"
              placeholder="Search chats..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 pt-5 gap-2">
            {filteredChats.map((chat, index) => (
              <div
                key={index}
                className={cn(
                  'flex p-3 rounded-2xl cursor-pointer backdrop-blur-3xl hover:bg-primary-500/15',
                  {
                    'bg-primary-500/15': activeChat === index,
                  },
                )}
                onClick={() => selectChat(index)}
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
                      <span className="text-xs font-medium opacity-40">4m</span>
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
                        elit. Quia sint totam dignissimos enim odit modi minima
                        qui doloribus, at atque nesciunt reiciendis aspernatur.
                        Dolorum dolor sequi aut mollitia aliquam magnam.
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
          <div
            className="h-full w-full shrink-0 flex flex-col justify-between relative bg-center bg-[size:50%] overflow-hidden"
            style={{
              backgroundImage: `url(${wallpaper || 'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-[2px]"></div>

            <ScrollArea
              ref={chatListRef}
              className="h-[calc(100vh_-_68px)]"
              classNameViewportArea="h-full [&>div]:h-full p-3 pb-0"
            >
              {!loadingMessages ? (
                <div className="flex h-full justify-end items-end flex-col">
                  {messages.length > 0 &&
                    messages!.map((group, index) =>
                      group.sender_id === user?.id ? (
                        <Sender key={index} messages={group.messages} />
                      ) : (
                        <Receiver key={index} messages={group.messages} />
                      ),
                    )}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-full flex justify-center items-center">
                  <Loader containerStyle="gap-0.5" />
                </div>
              )}
            </ScrollArea>

            <div
              className="w-full left-0 bottom-0 p-3 flex items-end gap-4 relative"
              ref={chatTextareaContainerRef}
            >
              <Textarea
                className="max-h-20 min-h-auto bg-background rounded-3xl focus:ring-transparent ring-0 border-0 focus:border-0 focus-visible:ring-0 py-3"
                placeholder="Typing message..."
                onKeyDown={handleKeyDown}
                ref={chatTextareaRef}
                disabled={loadingMessages}
              />
              <Button
                className="shrink-0 rounded-full size-10"
                disabled={loadingMessages}
                onClick={sendMessage}
              >
                <IconSend />
              </Button>
            </div>
          </div>
        ) : (
          <h1>Select chat</h1>
        )}
      </div>

      <div className="w-1/6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique iste
        fugit labore odit voluptatibus temporibus dicta quasi, id sit delectus
        adipisci minus et, inventore eveniet sunt blanditiis repellendus
        laboriosam accusamus!
      </div>
    </div>
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
        'bg-primary-500 rounded-lg p-2 max-w-sm w-fit text-primary-950',
        className,
        bubbleColor,
      )}
    >
      {/* <div className="chat-header">
        Obi-Wan Kenobi
        <time className="text-xs opacity-50">2 hours ago</time>
      </div> */}
      <div className="chat-bubble">{nl2br(children)}</div>
      {/* <div className="chat-footer opacity-50">Seen</div> */}
    </div>
  );
}

function Sender({
  bubbleColor,
  messages,
}: {
  bubbleColor?: string;
  messages: ChatMessage[];
}) {
  return (
    <div className="w-full flex flex-col justify-end items-end gap-0.5 [&>div]:last:rounded-tr-sm [&>div]:not-last:rounded-br-sm [&>div]:not-last:rounded-tr-sm [&>div]:first:rounded-tr-2xl">
      {messages.map(msg => (
        <ChatBubble
          key={msg.id}
          className={cn('bg-zinc-100 text-zinc-950', bubbleColor)}
        >
          <LinkPreviewer text={msg.content} />
        </ChatBubble>
      ))}
    </div>
  );
}

function Receiver({
  bubbleColor,
  messages,
}: {
  bubbleColor?: string;
  messages: ChatMessage[];
}) {
  return (
    <div className="w-full flex flex-col justify-start items-starjustify-start gap-0.5 [&>div]:last:rounded-tl-sm [&>div]:not-last:rounded-bl-sm [&>div]:not-last:rounded-tl-sm [&>div]:first:rounded-tl-2xl">
      {messages.map(msg => (
        <ChatBubble
          key={msg.id}
          className={cn('bg-primary-200 text-primary-950', bubbleColor)}
        >
          <LinkPreviewer text={msg.content} />
        </ChatBubble>
      ))}
    </div>
  );
}
