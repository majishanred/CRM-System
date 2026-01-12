import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slice.ts';

export const rootStore = configureStore({
  reducer: { user: userSlice.reducer },
});

export type RootStore = ReturnType<typeof rootStore.getState>;
