import { createAsyncThunk } from '@reduxjs/toolkit';
import { TodoApi } from '../../api/todo/todo.ts';
import type { Todo, TodoFilterParams, TodoInfo, TodoRequest } from '../../types/todo.ts';
import type { MetaResponse } from '../../types/meta.ts';
import type { TSliceMethod } from '../types.ts';

export const getTodoListData: TSliceMethod<
  TodoFilterParams,
  MetaResponse<Todo, TodoInfo>
> = createAsyncThunk<MetaResponse<Todo, TodoInfo>, TodoFilterParams>(
  'todo/getTodoListData',
  async todoFilters => {
    return await TodoApi.fetchTodos(todoFilters);
  }
);

export const createTodo: TSliceMethod<TodoRequest, void> = createAsyncThunk<void, TodoRequest>(
  'todo/createTodo',
  async todoData => {
    await TodoApi.createTodo(todoData);
  }
);

export const updateTodo: TSliceMethod<{ todoId: number; todoData: TodoRequest }, void> =
  createAsyncThunk<void, { todoId: number; todoData: TodoRequest }>(
    'todo/updateTodo',
    async ({ todoId, todoData }) => {
      await TodoApi.updateTodo(todoId, todoData);
    }
  );

export const deleteTodo: TSliceMethod<number, void> = createAsyncThunk<void, number>(
  'todo/deleteTodo',
  async todoId => {
    await TodoApi.deleteTodo(todoId);
  }
);
