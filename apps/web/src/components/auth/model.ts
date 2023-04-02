export type AuthFormFields = {
  email: string;
  password: string;
  username?: string;
};

export type AuthProps = {
  type: 'login' | 'signup';
  onAuth: (data: AuthFormFields) => void;
};
