/** @type { import('next').NextConfig } */
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {},
  transpilePackages: ['@phar/core', '@phar/i18n', '@phar/err', '@phar/themes'],
};
