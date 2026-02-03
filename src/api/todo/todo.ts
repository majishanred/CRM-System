import type { MetaResponse } from '../../types/meta.ts';
import type { Todo, TodoFilterParams, TodoInfo, TodoRequest } from '../../types/todo.ts';
import axiosClient from '../axiosClient.ts';
import type { AxiosResponse } from 'axios';

export const fetchToDo = async (
  filter?: TodoFilterParams
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await axiosClient.get<MetaResponse<Todo, TodoInfo>>('/todos', {
    params: {
      filter,
    },
  });

  return response.data;
};

export const createToDo = async (todoRequest: TodoRequest): Promise<Todo> => {
  const response = await axiosClient.post<Todo, AxiosResponse<Todo>, TodoRequest>(
    '/todos',
    todoRequest
  );

  return response.data;
};

export const updateToDo = async (todoId: number, todoRequest: TodoRequest) => {
  const response = await axiosClient.put<Todo, AxiosResponse<Todo>, TodoRequest>(
    `/todos/${todoId}`,
    todoRequest
  );

  return response.data;
};

export const deleteToDo = async (todoId: number) => {
  await axiosClient.delete(`https://easydev.club/api/v1/todos/${todoId}`);
};
