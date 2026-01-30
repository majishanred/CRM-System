import axiosClient from '../axiosClient.ts';
import {
  type MetaResponse,
  Roles,
  type User,
  type UserFilters,
  type UserRequest,
} from '../../types/admin.ts';

export const getUsers = async (filters?: UserFilters): Promise<MetaResponse<User>> => {
  const response = await axiosClient.get<MetaResponse<User>>('/admin/users', {
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
  const response = await axiosClient.put(`/admin/users/${userId}`, profileData);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axiosClient.delete(`/admin/users/${userId}`);
};

export const changeUserRights = async (
  userId: number,
  userRolesData: { roles: Roles[] }
): Promise<void> => {
  await axiosClient.post(`/admin/users/${userId}/rights`, userRolesData);
};

export const blockUser = async (userId: number): Promise<void> => {
  await axiosClient.post(`/admin/users/${userId}/block`);
};

export const unblockUser = async (userId: number): Promise<void> => {
  await axiosClient.post(`/admin/users/${userId}/unblock`);
};
