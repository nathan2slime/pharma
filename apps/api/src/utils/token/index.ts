import { log } from '@/log';
import { decode, sign } from 'jsonwebtoken';

const SECURITY_KEY = process.env.SECURITY_KEY || Math.random().toString();

export const createToken = async (payload: object) => {
  const token = sign(payload, SECURITY_KEY, {
    expiresIn: '7d',
  });
  log.info('create new token with secret', payload);
  return token;
};

export const decodeToken = async (token: string) => {
  try {
    const secret = decode(token);
    log.info('token was decoded', token);

    return secret;
  } catch (_error) {
    return;
  }
};
