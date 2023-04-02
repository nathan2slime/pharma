import { createAction } from '@reduxjs/toolkit';

import { AlertState } from '@/types/alert.types';

export const setAlertAction = createAction<AlertState, string>('setAlert');
export const closeAlertAction = createAction<undefined, string>('closeAlert');
