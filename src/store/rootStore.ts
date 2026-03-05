import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slice.ts';
import { useDispatch } from 'react-redux';
import { apiSlice } from './api/slice.ts';

export const rootStore = configureStore({
  reducer: { user: userSlice.reducer, api: apiSlice.reducer },
});

export type RootStore = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
