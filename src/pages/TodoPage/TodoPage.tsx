import { useEffect, useState } from 'react';
import { CreateTodoForm } from '../../components/CreateTodoForm/CreateTodoForm.tsx';
import { ToDo } from '../../components/Todo/Todo.tsx';
import type { TodoFilterParams } from '../../types/todo.ts';
import { Flex, Tabs } from 'antd';
import { useNotification } from '../../hooks/useNotification.ts';
import { useSelector } from 'react-redux';
import { getTodoListSelector } from '../../store/api/selectors/todo.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import { getTodoListData } from '../../store/todo/actions.ts';
import { useTranslation } from 'react-i18next';

export const ToDoPage = () => {
  const { t } = useTranslation();
  const { data: todoData, error } = useSelector(getTodoListSelector);
  const dispatch = useAppDispatch();
  const notificationApi = useNotification();

  const tabs: { key: string; label: string; filter: TodoFilterParams }[] = [
    {
      key: '0',
      label: `${t('All todos')} (${todoData?.info?.all || 0})`,
      filter: 'all',
    },
    {
      key: '1',
      label: `${t('In progress')} (${todoData?.info?.inWork || 0})`,
      filter: 'inWork',
    },
    {
      key: '2',
      label: `${t('Completed todos')} (${todoData?.info?.completed || 0})`,
      filter: 'completed',
    },
  ];

  const [filter, setFilter] = useState<TodoFilterParams>(() => tabs[0].filter);

  const updateTodoData = async () => {
    await dispatch(getTodoListData(filter));
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

  useEffect(() => {
    if (!error) return;

    notificationApi.error({
      title: `Ошибка ${error.code}`,
      description: error.message,
      placement: 'bottomRight',
    });
  }, [error]);

  return (
    <Flex orientation="vertical" gap="large" style={{ maxWidth: '580px', margin: '24px auto' }}>
      <CreateTodoForm updateTodoData={updateTodoData} />
      <Tabs items={tabs} onChange={handleTabChange} />
      {todoData?.data.map(item => (
        <ToDo todo={item} key={item.id} updateTodoData={updateTodoData} />
      ))}
    </Flex>
  );
};
