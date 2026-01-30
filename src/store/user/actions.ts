import type { AuthData, Profile, UserRegistration } from '../../types/auth.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.ts';
import { setIsAuthorized, setIsUserAdmin } from '../user/slice.ts';
import { AxiosError, isAxiosError } from 'axios';
import type { TSliceMethod } from '../types.ts';
import { refreshAccessToken, signInUser, signUpUser } from '../../api/user/auth.ts';
import { logout, fetchProfile } from '../../api/user/user.ts';

export const signUpUserAction: TSliceMethod<UserRegistration, void> = createAsyncThunk<
  void,
  UserRegistration
>('user/createUser', async (userData, thunkAPI) => {
  try {
    return await signUpUser(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(JSON.stringify(error));
  }
});

export const signInUserAction: TSliceMethod<AuthData, void> = createAsyncThunk<void, AuthData>(
  'user/authenticateUser',
  async (loginData, thunkAPI) => {
    try {
      const { accessToken, refreshToken } = await signInUser(loginData);

      AuthService.authorize({ accessToken, refreshToken });

      thunkAPI.dispatch(setIsAuthorized(true));

      if (AuthService.isAdmin) {
        thunkAPI.dispatch(setIsUserAdmin(true));
      } else {
        thunkAPI.dispatch(setIsUserAdmin(false));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const logoutUserAction: TSliceMethod<void, void> = createAsyncThunk<void, void>(
  'user/destroySession',
  async (_, thunkAPI) => {
    try {
      await logout();
      AuthService.clearTokens();
      thunkAPI.dispatch(setIsAuthorized(false));
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const getProfileAction: TSliceMethod<void, Profile> = createAsyncThunk<Profile, void>(
  'user/getProfile',
  async (_, thunkAPI) => {
    try {
      return await fetchProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
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
      const tokens = await refreshAccessToken({
        refreshToken,
      });

      AuthService.authorize(tokens);

      thunkAPI.dispatch(setIsAuthorized(true));

      if (AuthService.isAdmin) {
        thunkAPI.dispatch(setIsUserAdmin(true));
      } else {
        thunkAPI.dispatch(setIsUserAdmin(false));
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        AuthService.clearTokens();
      }

      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const refreshAccessTokenAction: TSliceMethod<void, void> = createAsyncThunk<void, void>(
  'user/refreshAccessToken',
  async (_, thunkAPI) => {
    const { accessToken, refreshToken } = await refreshAccessToken({
      refreshToken: AuthService.refreshToken,
    });

    if (!accessToken || !refreshToken) {
      throw new AxiosError('Произошла ошибка авторизации, пожалуйста, авторизуйтесь снова');
    }

    AuthService.authorize({ accessToken, refreshToken });

    if (AuthService.isAdmin) {
      thunkAPI.dispatch(setIsUserAdmin(true));
    } else {
      thunkAPI.dispatch(setIsUserAdmin(false));
    }
  }
);
