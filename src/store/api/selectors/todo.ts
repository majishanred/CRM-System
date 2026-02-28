import { createSelector } from '@reduxjs/toolkit';
import { apiSelector } from '../selector.ts';
import type { ApiStore } from '../slice.ts';
import { getAsyncRequestData } from '../../utils.ts';

export const getTodoListSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.getTodoListData)
);

export const deleteTodoSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.deleteTodo)
);

export const updateTodoSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.updateTodo)
);

export const createTodoSelector = createSelector(apiSelector, (state: ApiStore) =>
  getAsyncRequestData(state.createTodo)
);
