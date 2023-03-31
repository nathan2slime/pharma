jest.mock('@phar/err', () => ({
  getErrorMessage: (code: number, _lang: 'en') => code,
}));
