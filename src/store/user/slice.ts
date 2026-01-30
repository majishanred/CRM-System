import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    isAdmin: false,
  },
  reducers: {
    setIsAuthorized: (state, action: { payload: boolean }) => {
      state.isAuthorized = action.payload;
    },
    setIsUserAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },
  },
});

export type UserStore = ReturnType<typeof userSlice.reducer>;

export const { setIsAuthorized, setIsUserAdmin } = userSlice.actions;
