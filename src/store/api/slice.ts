import { createSlice } from '@reduxjs/toolkit';
import { addAsyncBuilderCases, initAsyncParticle } from '../utils.ts';
import {
  getProfileAction,
  initAuthorization,
  logoutUserAction,
  signInUserAction,
  signUpUserAction,
} from '../user/actions.ts';
import {
  createTodoAction,
  deleteTodoAction,
  getTodoListData,
  updateTodoAction,
} from '../todo/actions.ts';
import type { Profile } from '../../types/auth.ts';
import type { MetaResponse } from '../../types/meta.ts';
import type { Todo, TodoInfo } from '../../types/todo.ts';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    signInUser: initAsyncParticle(null),
    signUpUser: initAsyncParticle(null),
    logoutUser: initAsyncParticle(null),
    getProfile: initAsyncParticle<Profile | null>(null),
    getTodoListData: initAsyncParticle<MetaResponse<Todo, TodoInfo>>({
      data: [],
      info: { all: 0, inWork: 0, completed: 0 },
      meta: { totalAmount: 0 },
    }),
    deleteTodo: initAsyncParticle(null),
    updateTodo: initAsyncParticle(null),
    createTodo: initAsyncParticle(null),
    initAuthorization: initAsyncParticle(null),
  },
  reducers: {},
  extraReducers: builder => {
    addAsyncBuilderCases(builder, signInUserAction, 'signInUser');
    addAsyncBuilderCases(builder, signUpUserAction, 'signUpUser');
    addAsyncBuilderCases(builder, logoutUserAction, 'logoutUser');
    addAsyncBuilderCases(builder, getTodoListData, 'getTodoListData');
    addAsyncBuilderCases(builder, deleteTodoAction, 'deleteTodo');
    addAsyncBuilderCases(builder, updateTodoAction, 'updateTodo');
    addAsyncBuilderCases(builder, createTodoAction, 'createTodo');
    addAsyncBuilderCases(builder, getProfileAction, 'getProfile');
    addAsyncBuilderCases(builder, initAuthorization, 'initAuthorization');
  },
});

export type ApiStore = ReturnType<typeof apiSlice.reducer>;
