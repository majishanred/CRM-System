import { useContext } from 'react';
import { NotificationContext } from '../contexts/notification/context.tsx';

export const useNotification = () => {
  const notificationApi = useContext(NotificationContext);

  if (!notificationApi) {
    throw new Error('No notification api returned');
  }

  return notificationApi;
};
