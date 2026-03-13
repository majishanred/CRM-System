import { createSelector } from '@reduxjs/toolkit';
import { getAsyncRequestData } from '../../utils.ts';
import type { ApiStore } from '../slice.ts';
import { apiSelector } from '../selector.ts';

export const signInUserSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.signInUser)
);

export const logoutUserSelector = createSelector(
  apiSelector,
  (state: ApiStore) => state.logoutUser
);

export const signUpUserSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.signUpUser)
);

export const getProfileSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.getProfile)
);

export const initAuthorizationSelector = createSelector(
  apiSelector,
  (state: ApiStore) => state.initAuthorization
);
