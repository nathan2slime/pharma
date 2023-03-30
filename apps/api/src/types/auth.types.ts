export type UserLogin = {
  password: string;
  email: string;
};

export type AuthJWTSecret = {
  user: number;
};

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

