import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
  },
  reducers: {
    setIsAuthorized: (state, action: { payload: boolean }) => {
      state.isAuthorized = action.payload;
    },
  },
});

export type UserStore = ReturnType<typeof userSlice.reducer>;

export const { setIsAuthorized } = userSlice.actions;
