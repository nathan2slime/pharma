import { AppState } from '@/store';
import { PharAlert } from '@phar/core';
import { useDispatch, useSelector } from 'react-redux';

import { useEventListener } from '@/hooks';
import { AlertState } from '@/types/alert.types';
import { setAlertAction } from '@/store/actions/alert.actions';

export const Alert = () => {
  const { alert } = useSelector((state: AppState) => state);

  const dispatch = useDispatch();

  useEventListener('pharAlert', e =>
    dispatch(setAlertAction((e as CustomEvent).detail as AlertState))
  );

  return (
    <PharAlert
      {...alert}
      onClose={() => dispatch(setAlertAction({ ...alert, open: false }))}
    >
      {alert.message}
    </PharAlert>
  );
};
