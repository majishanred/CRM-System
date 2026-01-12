import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
  },
  reducers: {
    loginUser: state => {
      state.isAuthorized = true;
    },
    logoutUser: state => {
      state.isAuthorized = false;
    },
  },
});

export type UserStore = ReturnType<typeof userSlice.reducer>;

export const { loginUser, logoutUser } = userSlice.actions;
