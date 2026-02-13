import { useEffect, useState } from 'react';
import { fetchTodos } from '../../api/todo/todo.ts';
import { CreateTodoForm } from '../../components/CreateTodoForm/CreateTodoForm.tsx';
import { ToDo } from '../../components/Todo/Todo.tsx';
import type { MetaResponse } from '../../types/meta.ts';
import type { Todo, TodoFilterParams, TodoInfo } from '../../types/todo.ts';
import { Flex, Tabs } from 'antd';
import { isAxiosError } from 'axios';
import { useNotification } from '../../hooks/useNotification.ts';

export const ToDoPage = () => {
  const [todoData, setTodoData] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: { all: 0, inWork: 0, completed: 0 },
    meta: { totalAmount: 0 },
  });
  const notificationApi = useNotification();

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
      const data = await fetchTodos(filter);
      setTodoData(() => data);
    } catch (error) {
      if (isAxiosError(error)) {
        notificationApi.error({
          title: `Ошибка ${error.code}`,
          description: error.message,
          placement: 'bottomRight',
        });
      }
    }
  };

  const handleTabChange = (key: string) => {
    setFilter(() => tabs.find(tab => tab.key === key)?.filter || tabs[0].filter);
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
    <Flex orientation="vertical" gap="large" style={{ maxWidth: '580px', margin: '24px auto' }}>
      <CreateTodoForm updateTodoData={updateTodoData} />
      <Tabs items={tabs} onChange={handleTabChange} />
      {todoData.data.map(item => (
        <ToDo todo={item} key={item.id} updateTodoData={updateTodoData} />
      ))}
    </Flex>
  );
};
