import create from "zustand";

interface User {
  //state
  email: string;
  authenticated: boolean;
  token: string | "";
  //actions
  setAuthenticated: (authenticated: boolean) => void;
  setToken: (token: string) => void;
  logOut: () => void;
}

export const useUserStore = create<User>((set) => ({
  email: "",
  authenticated: false,
  token: "",

  setToken: (userToken: string) =>
    set((state) => ({ ...state, token: userToken })),
  setEmail: (userEmail: string) =>
    set((state) => ({ ...state, email: userEmail })),
  setAuthenticated: (authenticated) =>
    set((state) => ({ ...state, authenticated })),

  logOut: () =>
    set((state) => ({ ...state, authenticated: false, token: "", email: "" })),
}));
