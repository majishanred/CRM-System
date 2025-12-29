import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchToDo } from '../api/todo/todo.ts';
import { CreateTodoForm } from '../components/CreateTodoForm/CreateTodoForm.tsx';
import { ToggbleTabs } from '../components/ToggbleTabs/ToggbleTabs.tsx';
import { ToDo } from '../components/Todo/Todo.tsx';
import type { MetaResponse } from '../types/meta.ts';
import type { Todo, TodoInfo } from '../types/todo.types.ts';

export const ToDoPage = () => {
  const [todoData, setTodoData] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: { all: 0, inWork: 0, completed: 0 },
    meta: { totalAmount: 0 },
  });

  const [filter, setFilter] = useState<string>('?filter=all');

  const tabs = useMemo<{ text: string; filter: string }[]>(() => {
    return [
      {
        text: `Все (${todoData.info?.all || 0})`,
        filter: '?filter=all',
      },
      {
        text: `В работе (${todoData.info?.inWork || 0})`,
        filter: '?filter=inWork',
      },
      {
        text: `Сделано (${todoData.info?.completed || 0})`,
        filter: '?filter=completed',
      },
    ];
  }, [todoData]);

  const updateTodoData = useCallback(async () => {
    try {
      const data = await fetchToDo(filter);
      setTodoData(() => data);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }, [filter]);

  useEffect(() => {
    const asyncFunc = async () => {
      await updateTodoData();
    };

    asyncFunc();
  }, [filter, updateTodoData]);

  return (
    <div className="main-container">
      <CreateTodoForm updateTodoData={updateTodoData} />
      <ToggbleTabs tabs={tabs} onChange={tab => setFilter(() => tab.filter)} />
      {todoData.data.map(item => (
        <ToDo todo={item} key={item.id} updateTodoData={updateTodoData} />
      ))}
    </div>
  );
};
