export type AppI18nLang = 'en' | 'pt';

export type AppI18n = {
  err: {
    userNotFound: string;
    emailAlredyExists: string;
    isNotAuthenticated: string;
    invalidCredentials: string;
    errorUnknow: string;
    sessionExpired: string;
    languageNotAvailable: string;
    productNotFound: string;
    notAuthorized: string;
    timeoutError: string;
    categoryNotFound: string;
  };
  password: string;
  email: string;
  welcome: string;
  loginNow: string;
  login: string;
  form: {
    email: string;
    required: string;
  };
};
