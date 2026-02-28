import type { AuthData, RefreshToken, Token, UserRegistration } from '../../types/auth.ts';
import axiosClient from '../axiosClient.ts';
import type { AxiosResponse } from 'axios';

export namespace AuthApi {
  export const signUpUser = async (userData: UserRegistration): Promise<void> => {
    await axiosClient.post<never, never, UserRegistration>('/auth/signup', userData);
  };

  export const signInUser = async (userData: AuthData): Promise<Token> => {
    const response = await axiosClient.post<Token, AxiosResponse<Token>, AuthData>(
      '/auth/signin',
      userData
    );

    return response.data;
  };

  export const refreshAccessToken = async (refreshToken: RefreshToken): Promise<Token> => {
    const response = await axiosClient.post<Token, AxiosResponse<Token>, RefreshToken>(
      '/auth/refresh',
      refreshToken
    );

    return response.data;
  };
}
