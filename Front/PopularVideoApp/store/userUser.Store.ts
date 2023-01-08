import create from "zustand";

interface User {
  user: string;
  authenticated: boolean;
  token: string | null;
}

interface UserApi {
  user: User;
  setAuthenticated: (authenticated: boolean) => void;
  setToken: (token: string | null) => void;
}

export const useUser = create<UserApi>((set) => ({
  user: {
    user: "",
    authenticated: false,
    token: null,
  },

  setAuthenticated: (authenticated) =>
    set((state) => ({ ...state, authenticated })),
  setToken: (token) => set((state) => ({ ...state, token })),
}));
