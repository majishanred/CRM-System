import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  blockUser,
  changeUserRights,
  deleteUser,
  getUser,
  getUsers,
  unblockUser,
  updateUserProfile,
} from '../../api/admin/admin.ts';
import type { TSliceMethod } from '../types.ts';
import {
  type User,
  type UserFilters,
  type UserRequest,
  type UserRolesRequest,
} from '../../types/admin.ts';
import type { MetaResponse } from '../../types/meta.ts';

export const getUsersAction: TSliceMethod<
  UserFilters | undefined,
  MetaResponse<User, null>
> = createAsyncThunk<MetaResponse<User, null>, UserFilters | undefined>(
  'admin/getUsers',
  async (filters, thunkAPI) => {
    try {
      return await getUsers(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const getUserAction: TSliceMethod<number, User> = createAsyncThunk<User, number>(
  'admin/getUser',
  async (userId, thunkAPI) => {
    try {
      return await getUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const updateUserAction: TSliceMethod<{ userId: number; userData: UserRequest }, User> =
  createAsyncThunk<User, { userId: number; userData: UserRequest }>(
    'admin/updateUserProfile',
    async ({ userId, userData }, thunkAPI) => {
      try {
        return await updateUserProfile(userId, userData);
      } catch (error) {
        return thunkAPI.rejectWithValue(JSON.stringify(error));
      }
    }
  );

export const deleteUserAction: TSliceMethod<number, void> = createAsyncThunk<void, number>(
  'admin/deleteUser',
  async (userId, thunkAPI) => {
    try {
      return await deleteUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const changeUserRightsAction: TSliceMethod<
  { userId: number; userRolesData: UserRolesRequest },
  void
> = createAsyncThunk<void, { userId: number; userRolesData: UserRolesRequest }>(
  'admin/changeUserRights',
  async ({ userId, userRolesData }, thunkAPI) => {
    try {
      await changeUserRights(userId, userRolesData);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const blockUserAction: TSliceMethod<number, void> = createAsyncThunk<void, number>(
  'admin/blockUser',
  async (userId, thunkAPI) => {
    try {
      await blockUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const unblockUserAction: TSliceMethod<number, void> = createAsyncThunk<void, number>(
  'admin/unblockUser',
  async (userId, thunkAPI) => {
    try {
      await unblockUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);
