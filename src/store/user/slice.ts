import { createSlice } from '@reduxjs/toolkit';
import type { Roles } from '../../types/admin.ts';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    userRoles: [] as Roles[],
  },
  reducers: {
    setIsAuthorized: (state, action: { payload: boolean }) => {
      state.isAuthorized = action.payload;
    },
    setUserRoles: (state, { payload }) => {
      state.userRoles = payload;
    },
  },
});

export type UserStore = ReturnType<typeof userSlice.reducer>;

export const { setIsAuthorized, setUserRoles } = userSlice.actions;
