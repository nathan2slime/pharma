jest.mock('@phar/err', () => ({
  getErrorMessage: (code: number, _lang: 'en') => code,
}));

// jest.mock('../../src/utils/err/index.ts', () => {
//   const mockAppError = jest.fn().mockImplementation((code, lang) => {
//     return {
//       code,
//       lang,
//       message: code,
//       getMessage: jest.fn().mockReturnValue(code),
//       getError: jest.fn().mockReturnValue(code),
//     };
//   });

//   return {
//     AppError: mockAppError,
//   };
// });
