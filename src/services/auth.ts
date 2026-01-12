import { authenticateUser, refreshAccessToken } from '../api/user/auth.ts';
import { rootStore } from '../store/rootStore.ts';
import { loginUser, logoutUser } from '../store/user/slice.ts';
import type { AuthData, Token } from '../types/auth.ts';
import { isAxiosError } from 'axios';
import axiosClient from '../api/axiosClient.ts';
import { destroySession } from '../api/user/user.ts';

class Auth {
  private _accessToken: string = '';
  private _refreshToken: string = '';

  constructor() {}

  async refreshAccessToken(): Promise<void> {
    const { accessToken, refreshToken } = await refreshAccessToken({
      refreshToken: this.refreshToken,
    });

    if (!accessToken || !refreshToken) {
      throw new Error('Произошла ошибка авторизации, пожалуйста, авторизуйтесь снова');
    }

    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }

  async init(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return;
    }

    try {
      const tokens = await refreshAccessToken({
        refreshToken,
      });

      this.authorize(tokens);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        this.clearTokens();
      }
    }
  }

  clearTokens() {
    this.accessToken = '';
    this.refreshToken = '';
    localStorage.removeItem('refreshToken');
    rootStore.dispatch(logoutUser());
  }

  async logout(): Promise<void> {
    try {
      await destroySession();
    } finally {
      this.clearTokens();
    }
  }

  async login(authData: AuthData) {
    const tokens = await authenticateUser(authData);
    this.authorize(tokens);
  }

  authorize({ accessToken, refreshToken }: Token) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    rootStore.dispatch(loginUser());
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
    localStorage.setItem('refreshToken', value);
  }
}

const AuthService = new Auth();
await AuthService.init();

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${AuthService.accessToken}`;

  return config;
});

let refreshProcess: Promise<void> | null = null;

axiosClient.interceptors.response.use(undefined, async err => {
  const originalConfig = err.config;
  if (!isAxiosError(err)) throw err;
  if (originalConfig.url === '/auth/refresh' && err.response?.status == 401) {
    AuthService.clearTokens();
    throw err;
  }

  if (!refreshProcess) {
    refreshProcess = new Promise((resolve, reject) => {
      AuthService.refreshAccessToken()
        .then(() => {
          resolve();
          refreshProcess = null;
        })
        .catch(err => {
          reject(err);
        });
    });

    // eslint-disable-next-line no-useless-catch
    try {
      await refreshProcess;
    } catch (error) {
      throw error;
    }

    if (originalConfig.headers) {
      originalConfig.headers.Authorization = `Bearer ${AuthService.accessToken}`;
    }

    return axiosClient(originalConfig);
  } else {
    // eslint-disable-next-line no-useless-catch
    try {
      await refreshProcess;
    } catch (error) {
      throw error;
    }

    if (originalConfig.headers) {
      originalConfig.headers.Authorization = `Bearer ${AuthService.accessToken}`;
    }

    return axiosClient(originalConfig);
  }
});

export default AuthService;
