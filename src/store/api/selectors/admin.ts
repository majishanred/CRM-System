import { createSelector } from '@reduxjs/toolkit';
import { apiSelector } from '../selector.ts';
import type { ApiStore } from '../slice.ts';
import { getAsyncRequestData } from '../../utils.ts';
import type { User } from '../../../types/admin.ts';
import type { MetaResponse } from '../../../types/meta.ts';

export const getUsersSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData<MetaResponse<User, null> | null>(state.getUsers)
);

export const getUserSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData<User | null>(state.getUser)
);

export const updateUserProfileSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData<User | null>(state.updateUserProfile)
);

export const deleteUserSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.deleteUser)
);

export const changeUserRightsSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.changeUserRights)
);

export const blockUserSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.blockUser)
);

export const unblockUserSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.unblockUser)
);
