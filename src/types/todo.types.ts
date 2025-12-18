import type { MetaResponse } from './meta.ts';

export interface ToDoInterface {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface ToDoCreate {
  title?: string;
  isDone?: boolean;
}

export type ToDoListInterface = MetaResponse<
  ToDoInterface,
  {
    all: number;
    inWork: number;
    completed: number;
  }
>;
