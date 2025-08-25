import { ChatMessages, Message } from '@typed';
import { createJSONStorage, persist } from 'zustand/middleware';
import { groupMessages, ungroupMessages } from '@lib/utils';

import axios from 'axios';
import { create } from 'zustand';
import { route } from 'ziggy-js';

type ChatStoreState = {
  activeChat: number | null;
};

type ChatMessagesStoreState = {
  messages: ChatMessages[];
  loadingMessages: boolean;
};

type ChatMessagesStoreActions = {
  getMessages: (userId: string | number) => void;
  addMessage: (message: Message) => void;
};

type ChatStoreActions = {
  setActiveChat: (chatIndex: ChatStoreState['activeChat']) => void;
};

type ChatStore = ChatStoreState & ChatStoreActions;
type ChatMessagesStore = ChatMessagesStoreState & ChatMessagesStoreActions;

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      activeChat: null,
      setActiveChat: async (chatIndex: ChatStoreState['activeChat']) => {
        set(state => ({
          activeChat: chatIndex,
        }));
      },
    }),
    {
      name: 'chat-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useChatMessagesStore = create<ChatMessagesStore>()((set, get) => ({
  messages: [],
  loadingMessages: false,
  getMessages: async (userId: string | number) => {
    set(state => ({
      messages: [],
      loadingMessages: true,
    }));

    try {
      const res = await axios.post(route('user.chat.messages'), {
        userId,
      });
      const messages = groupMessages(res.data);

      set(state => ({
        loadingMessages: false,
        messages,
      }));
    } catch (err) {
      console.error('Error in data fetch:', err);
      //   set({ ...initialState, error: true, errorData: err.message });
    }
  },
  addMessage: (message: Message) => {
    set(state => {
      const messages = ungroupMessages(state.messages);
      messages.push({
        id: message.id,
        sender_id: message.sender_id,
        content: message.content,
        created_at: message.created_at,
      });

      return {
        messages: groupMessages(messages),
      };
    });
  },
}));
