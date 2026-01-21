import type { MetaResponse } from '../../types/meta.ts';
import type { Todo, TodoFilterParams, TodoInfo, TodoRequest } from '../../types/todo.ts';

export const fetchToDo = async (
  filter?: TodoFilterParams
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await fetch(
      'https://easydev.club/api/v1/todos' + (filter ? `?filter=${filter}` : ''),
      {
        method: 'GET',
      }
    );

    const data: MetaResponse<Todo, TodoInfo> = await response.json();

    return data;
  } catch (_e) {
    throw new Error('Не удалось загрузить данные');
  }
};

export const createToDo = async (todoRequest: TodoRequest) => {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      body: JSON.stringify(todoRequest),
    });

    return await response.json();
  } catch (_e) {
    throw new Error('Не удалось загрузить данные');
  }
};

export const updateToDo = async (todoId: number, todoRequest: TodoRequest) => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify(todoRequest),
    });

    return await response.json();
  } catch (error) {
    throw new Error('Не удалось загрузить данные');
  }
};

export const deleteToDo = async (todoId: number) => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${todoId}`, {
      method: 'DELETE',
    });
  } catch (_e) {
    throw new Error('Не удалось загрузить данные');
  }
};
