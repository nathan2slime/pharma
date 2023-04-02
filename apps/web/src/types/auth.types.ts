export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = { username: string } & LoginData;

export type User = {
  _id: string;
  saved: string[];
  cart: string[];
  favorites: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  roles: string[];
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type UserState = {
  token?: string;
  data?: User;
  isLogged?: boolean;
  isLoading?: boolean;
  isAdmin?: boolean;
};
