import { createContext } from 'react';
import type { NotificationInstance } from 'antd/es/notification/interface';

export const NotificationContext = createContext<NotificationInstance | null>(null);
