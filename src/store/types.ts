import type { AxiosError } from 'axios';
import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';

export interface IAsyncParticle<T> {
  data: T;
  error: AxiosError | null;
  errorCounter: number;
  status: 'idle' | 'rejected' | 'pending' | 'fulfilled';
}

export type TSliceMethod<RQ, RS> = AsyncThunk<RS, RQ, AsyncThunkConfig>;
export type IErrorData = AxiosError;

export interface IAsyncDataStatus {
  hasError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isLoadingOrIdle: boolean;
  isLoaded: boolean;
  isLoadedOrError: boolean;
}
