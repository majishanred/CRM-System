import axiosClient from '../axiosClient.ts';
import {
  type User,
  type UserFilters,
  type UserRequest,
  type UserRolesRequest,
} from '../../types/admin.ts';
import type { AxiosResponse } from 'axios';
import type { MetaResponse } from '../../types/meta.ts';

export const getUsers = async (filters?: UserFilters): Promise<MetaResponse<User, null>> => {
  const response = await axiosClient.get<MetaResponse<User, null>>('/admin/users', {
    params: filters,
  });
  return response.data;
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await axiosClient.get<User>(`/admin/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (
  userId: number,
  profileData: UserRequest
): Promise<User> => {
  const response = await axiosClient.put<User, AxiosResponse<User>, UserRequest>(
    `/admin/users/${userId}`,
    profileData
  );
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axiosClient.delete(`/admin/users/${userId}`);
};

export const changeUserRights = async (
  userId: number,
  userRolesData: UserRolesRequest
): Promise<void> => {
  await axiosClient.post<void, void, UserRolesRequest>(
    `/admin/users/${userId}/rights`,
    userRolesData
  );
};

export const blockUser = async (userId: number): Promise<void> => {
  await axiosClient.post(`/admin/users/${userId}/block`);
};

export const unblockUser = async (userId: number): Promise<void> => {
  await axiosClient.post(`/admin/users/${userId}/unblock`);
};
