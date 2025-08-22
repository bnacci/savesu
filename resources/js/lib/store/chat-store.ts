import { createJSONStorage, persist } from 'zustand/middleware';

import { create } from 'zustand';

type ChatStoreState = {
  activeChat: number | null;
};

type ChatStoreActions = {
  setActiveChat: (chatIndex: ChatStoreState['activeChat']) => void;
};

type ChatStore = ChatStoreState & ChatStoreActions;

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      activeChat: null,
      setActiveChat: (chatIndex: ChatStoreState['activeChat']) => {
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
