import { createSlice } from '@reduxjs/toolkit';
import { addAsyncBuilderCases, initAsyncParticle } from '../utils.ts';
import {
  getProfile,
  initAuthorization,
  logoutUser,
  signInUser,
  signUpUser,
} from '../user/actions.ts';
import { createTodo, deleteTodo, getTodoListData, updateTodo } from '../todo/actions.ts';
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
    addAsyncBuilderCases(builder, signInUser, 'signInUser');
    addAsyncBuilderCases(builder, signUpUser, 'signUpUser');
    addAsyncBuilderCases(builder, logoutUser, 'logoutUser');
    addAsyncBuilderCases(builder, getTodoListData, 'getTodoListData');
    addAsyncBuilderCases(builder, deleteTodo, 'deleteTodo');
    addAsyncBuilderCases(builder, updateTodo, 'updateTodo');
    addAsyncBuilderCases(builder, createTodo, 'createTodo');
    addAsyncBuilderCases(builder, getProfile, 'getProfile');
    addAsyncBuilderCases(builder, initAuthorization, 'initAuthorization');
  },
});

export type ApiStore = ReturnType<typeof apiSlice.reducer>;
