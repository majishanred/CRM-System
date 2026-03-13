import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Todo, TodoFilterParams, TodoInfo, TodoRequest } from '../../types/todo.ts';
import type { MetaResponse } from '../../types/meta.ts';
import type { TSliceMethod } from '../types.ts';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '../../api/todo/todo.ts';

export const getTodoListData: TSliceMethod<
  TodoFilterParams,
  MetaResponse<Todo, TodoInfo>
> = createAsyncThunk<MetaResponse<Todo, TodoInfo>, TodoFilterParams>(
  'todo/getTodoListData',
  async (todoFilters, thunkAPI) => {
    try {
      return await fetchTodos(todoFilters);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const createTodoAction: TSliceMethod<TodoRequest, void> = createAsyncThunk<
  void,
  TodoRequest
>('todo/createTodo', async (todoData, thunkAPI) => {
  try {
    await createTodo(todoData);
  } catch (error) {
    return thunkAPI.rejectWithValue(JSON.stringify(error));
  }
});

export const updateTodoAction: TSliceMethod<{ todoId: number; todoData: TodoRequest }, void> =
  createAsyncThunk<void, { todoId: number; todoData: TodoRequest }>(
    'todo/updateTodo',
    async ({ todoId, todoData }, thunkAPI) => {
      try {
        await updateTodo(todoId, todoData);
      } catch (error) {
        return thunkAPI.rejectWithValue(JSON.stringify(error));
      }
    }
  );

export const deleteTodoAction: TSliceMethod<number, void> = createAsyncThunk<void, number>(
  'todo/deleteTodo',
  async (todoId, thunkAPI) => {
    try {
      await deleteTodo(todoId);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);
