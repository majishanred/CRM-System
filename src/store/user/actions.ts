import type { AuthData, Profile, UserRegistration } from '../../types/auth.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.ts';
import { setIsAuthorized } from '../user/slice.ts';
import { AuthApi } from '../../api/user/auth.ts';
import { UserApi } from '../../api/user/user.ts';
import { AxiosError, isAxiosError } from 'axios';
import type { TSliceMethod } from '../types.ts';

export const signUpUser: TSliceMethod<UserRegistration, void> = createAsyncThunk<
  void,
  UserRegistration
>('user/createUser', async userData => {
  return await AuthApi.signUpUser(userData);
});

export const signInUser: TSliceMethod<AuthData, void> = createAsyncThunk<void, AuthData>(
  'user/authenticateUser',
  async (loginData, thunkAPI) => {
    const { accessToken, refreshToken } = await AuthApi.signInUser(loginData);
    AuthService.authorize({ accessToken, refreshToken });
    thunkAPI.dispatch(setIsAuthorized(true));
  }
);

export const logoutUser: TSliceMethod<void, void> = createAsyncThunk<void, void>(
  'user/destroySession',
  async (_, thunkAPI) => {
    await UserApi.destroySession();
    AuthService.clearTokens();
    thunkAPI.dispatch(setIsAuthorized(false));
  }
);

export const getProfile: TSliceMethod<void, Profile> = createAsyncThunk<Profile, void>(
  'user/getProfile',
  async () => {
    return await UserApi.fetchProfile();
  }
);

export const initAuthorization: TSliceMethod<void, void> = createAsyncThunk<void, void>(
  'user/initAuthorization',
  async (_, thunkAPI) => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return;
    }

    try {
      const tokens = await AuthApi.refreshAccessToken({
        refreshToken,
      });

      AuthService.authorize(tokens);
      thunkAPI.dispatch(setIsAuthorized(true));
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        AuthService.clearTokens();
      }

      throw error;
    }
  }
);

export const refreshAccessToken: TSliceMethod<void, void> = createAsyncThunk<void, void>(
  'user/refreshAccessToken',
  async () => {
    const { accessToken, refreshToken } = await AuthApi.refreshAccessToken({
      refreshToken: AuthService.refreshToken,
    });

    if (!accessToken || !refreshToken) {
      throw new AxiosError('Произошла ошибка авторизации, пожалуйста, авторизуйтесь снова');
    }

    AuthService.authorize({ accessToken, refreshToken });
  }
);
