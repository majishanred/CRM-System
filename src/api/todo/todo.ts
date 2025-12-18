import type { ToDoCreate, ToDoListInterface } from '../../types/todo.types.ts';

export const fetchToDo = async (init: RequestInit & { query?: string }) => {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos' + (init.query || ''), init);

    const data: ToDoListInterface = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return {
      data: [],
      info: { all: 0, inWork: 0, completed: 0 },
      meta: { totalAmount: 0 },
    };
  }
};

export const createToDo = async (body: ToDoCreate) => {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateToDo = async (todoId: number, body: ToDoCreate) => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteToDo = async (todoId: number) => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${todoId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
};
