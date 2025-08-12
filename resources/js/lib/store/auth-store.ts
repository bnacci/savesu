import { createJSONStorage, persist } from 'zustand/middleware';

import { create } from 'zustand';

type AuthStoreState = { showForm: boolean; showedSlogan: boolean };

type AuthStoreActions = {
  setShowForm: (show: AuthStoreState['showForm']) => void;
  setShowedSlogan: (show: AuthStoreState['showedSlogan']) => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      showForm: false,
      setShowForm: (show: AuthStoreState['showForm']) => {
        set(state => ({
          showForm: show,
        }));
      },
      showedSlogan: false,
      setShowedSlogan: (show: AuthStoreState['showedSlogan']) => {
        set(state => ({
          showedSlogan: show,
        }));
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
