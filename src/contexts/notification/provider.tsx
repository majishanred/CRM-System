import { notification } from 'antd';
import { type PropsWithChildren } from 'react';
import { NotificationContext } from './context.tsx';

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notificationApi, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={notificationApi}>
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
};
