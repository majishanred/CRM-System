import './TodoPage.scss';
import { useEffect, useState } from 'react';
import { fetchToDo } from '../../api/todo/todo.ts';
import { CreateTodoForm } from '../../components/CreateTodoForm/CreateTodoForm.tsx';
import { ToDo } from '../../components/Todo/Todo.tsx';
import type { MetaResponse } from '../../types/meta.ts';
import type { Todo, TodoFilterParams, TodoInfo } from '../../types/todo.ts';
import { Flex, Tabs } from 'antd';

export const ToDoPage = () => {
  const [todoData, setTodoData] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: { all: 0, inWork: 0, completed: 0 },
    meta: { totalAmount: 0 },
  });

  const tabs: { key: string; label: string; filter: TodoFilterParams }[] = [
    {
      key: '0',
      label: `Все (${todoData.info?.all || 0})`,
      filter: 'all',
    },
    {
      key: '1',
      label: `В работе (${todoData.info?.inWork || 0})`,
      filter: 'inWork',
    },
    {
      key: '2',
      label: `Сделано (${todoData.info?.completed || 0})`,
      filter: 'completed',
    },
  ];

  const [filter, setFilter] = useState<TodoFilterParams>(() => tabs[0].filter);

  const updateTodoData = async () => {
    try {
      const data = await fetchToDo(filter);
      setTodoData(() => data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await updateTodoData();
    };

    const intervalId = setInterval(asyncFunc, 5000);

    asyncFunc();

    return () => {
      clearInterval(intervalId);
    };
  }, [filter]);

  return (
    <Flex orientation="vertical" style={{ maxWidth: '580px', margin: '24px auto', gap: '24px' }}>
      <CreateTodoForm updateTodoData={updateTodoData} />
      <Tabs
        items={tabs}
        onChange={key =>
          setFilter(() => tabs.find(tab => tab.key === key)?.filter || tabs[0].filter)
        }
      />
      {todoData.data.map(item => (
        <ToDo todo={item} key={item.id} updateTodoData={updateTodoData} />
      ))}
    </Flex>
  );
};
