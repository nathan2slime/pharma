import axios from 'axios';

import { getLocalStorageItem } from '@/utils/funcs';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: getLocalStorageItem('') || undefined,
  },
});
