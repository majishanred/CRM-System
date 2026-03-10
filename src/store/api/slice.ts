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
import {
  blockUserAction,
  changeUserRightsAction,
  deleteUserAction,
  getUserAction,
  getUsersAction,
  unblockUserAction,
  updateUserAction,
} from '../admin/actions.ts';
import type { User, MetaResponse as AdminMetaResponse } from '../../types/admin.ts';

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
    getUsers: initAsyncParticle<AdminMetaResponse<User> | null>(null),
    getUser: initAsyncParticle<User | null>(null),
    updateUserProfile: initAsyncParticle<User | null>(null),
    deleteUser: initAsyncParticle(null),
    changeUserRights: initAsyncParticle(null),
    blockUser: initAsyncParticle(null),
    unblockUser: initAsyncParticle(null),
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
    addAsyncBuilderCases(builder, getUsersAction, 'getUsers');
    addAsyncBuilderCases(builder, getUserAction, 'getUser');
    addAsyncBuilderCases(builder, updateUserAction, 'updateUserProfile');
    addAsyncBuilderCases(builder, deleteUserAction, 'deleteUser');
    addAsyncBuilderCases(builder, changeUserRightsAction, 'changeUserRights');
    addAsyncBuilderCases(builder, blockUserAction, 'blockUser');
    addAsyncBuilderCases(builder, unblockUserAction, 'unblockUser');
  },
});

export type ApiStore = ReturnType<typeof apiSlice.reducer>;
