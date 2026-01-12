import axiosClient from '../axiosClient.ts';
import type { Profile } from '../../types/auth.ts';

export const fetchProfile = async (): Promise<Profile> => {
  const response = await axiosClient.get('/user/profile');

  return response.data;
};

export const destroySession = async (): Promise<void> => {
  const response = await axiosClient.post('/user/logout');
  return response.data;
};
