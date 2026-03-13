import axios, { isAxiosError } from 'axios';
import AuthService from '../services/auth.ts';
import { rootStore } from '../store/rootStore.ts';
import { setIsAuthorized } from '../store/user/slice.ts';
import { refreshAccessTokenAction } from '../store/user/actions.ts';

const axiosClient = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  timeout: 5000,
});

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${AuthService.accessToken}`;

  return config;
});

let refreshProcess: Promise<void> | null = null;

axiosClient.interceptors.response.use(undefined, async err => {
  const originalConfig = err.config;

  if (!isAxiosError(err)) throw err;

  if (err.response?.status !== 401) {
    throw err;
  }

  if (
    originalConfig.url === '/auth/refresh' ||
    originalConfig.url === '/auth/signin' ||
    originalConfig.url === '/user/logout'
  ) {
    rootStore.dispatch(setIsAuthorized(false));
    AuthService.clearTokens();
    throw err;
  }

  if (!refreshProcess) {
    refreshProcess = new Promise((resolve, reject) => {
      rootStore
        .dispatch(refreshAccessTokenAction())
        .then(() => {
          resolve();
          rootStore.dispatch(setIsAuthorized(true));
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

export default axiosClient;
