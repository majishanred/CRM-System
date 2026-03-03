import type { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';
import type { IAsyncDataStatus, IAsyncParticle, IErrorData, TSliceMethod } from './types.ts';

export const initAsyncParticle = <T = unknown>(data: T): IAsyncParticle<T> => ({
  data,
  error: null,
  errorCounter: 0,
  status: 'idle',
});

export const addAsyncBuilderCases = <TState, RQ, RS>(
  builder: ActionReducerMapBuilder<TState>,
  sliceMethod: TSliceMethod<RQ, RS>,
  key: keyof TState
) => {
  builder.addCase(sliceMethod.pending, (state: Draft<TState>) => {
    // @ts-expect-error Не стакаются типы TState и Draft<TState>
    state[key].status = 'pending';
  });
  builder.addCase(sliceMethod.fulfilled, (state: Draft<TState>, action) => {
    // @ts-expect-error Не стакаются типы TState и Draft<TState>
    state[key].status = 'fulfilled';
    // @ts-expect-error Не стакаются типы TState и Draft<TState>
    state[key].errorCounter = 0;
    // @ts-expect-error Не стакаются типы TState и Draft<TState>
    state[key].data = action.payload;
  });
  builder.addCase(sliceMethod.rejected, (state: Draft<TState>, action) => {
    // @ts-expect-error Не стакаются типы TState и Draft<TState>
    state[key].error = JSON.parse(action.payload);
    // @ts-expect-error Не стакаются типы TState и Draft<TState>
    state[key].errorCounter = (state[key].errorCounter ?? 0) + 1;
    // @ts-expect-error Не стакаются типы TState и Draft<TState>
    state[key].status = 'rejected';
  });
};

export const getAsyncDataStatus = (data: IAsyncParticle<unknown>): IAsyncDataStatus => ({
  hasError: data?.status === 'rejected',
  isIdle: data?.status === 'idle',
  isLoading: data?.status === 'pending',
  isLoadingOrIdle: data?.status === 'pending' || data?.status === 'idle',
  isLoaded: data?.status === 'fulfilled',
  isLoadedOrError: data?.status === 'fulfilled' || data?.status === 'rejected',
});

export const getAsyncRequestData = <T>(
  stateParam: IAsyncParticle<T>
): {
  errorCounter: number | undefined;
  data: T | undefined;
  error: IErrorData | null | undefined;
  status: IAsyncDataStatus;
} => ({
  data: stateParam?.data,
  error: stateParam?.error,
  errorCounter: stateParam?.errorCounter,
  status: getAsyncDataStatus(stateParam),
});
