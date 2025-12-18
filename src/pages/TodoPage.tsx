import { useEffect, useMemo, useState } from 'react';
import type { ToDoListInterface } from '../types/todo.types.ts';
import { fetchToDo } from '../api/todo/todo.ts';
import { Form } from '../components/form/form.tsx';
import { ToggbleTabs } from '../components/toggble_tabs/toggble_tabs.tsx';
import { ToDo } from '../components/todo/todo.tsx';
import { List } from '../components/list/list.tsx';

export const ToDoPage = () => {
  const [todoList, setTodoList] = useState<ToDoListInterface>({
    data: [],
    info: { all: 0, inWork: 0, completed: 0 },
    meta: { totalAmount: 0 },
  });

  const tabs = useMemo(() => {
    return [
      {
        text: `Все (${todoList.info?.all || 0})`,
        fetcher: async (controller: AbortController) =>
          await fetchToDo({ query: '?filter=all', signal: controller.signal }),
      },
      {
        text: `В работе (${todoList.info?.inWork || 0})`,
        fetcher: async (controller: AbortController) =>
          await fetchToDo({ query: '?filter=inWork', signal: controller.signal }),
      },
      {
        text: `Сделано (${todoList.info?.completed || 0})`,
        fetcher: async (controller: AbortController) =>
          await fetchToDo({ query: '?filter=completed', signal: controller.signal }),
      },
    ];
  }, [todoList]);

  const [fetcher, setFetcher] = useState(() => tabs[0].fetcher);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTodos = async () => {
      const data = await fetcher(controller);
      if (!data) return;
      setTodoList(() => data);
    };

    fetchTodos();

    return () => {
      controller.abort('Component Unmounted');
    };
  }, [fetcher]);

  useEffect(() => {
    const controller = new AbortController();

    const eventListener = async () => {
      const data = await fetcher(controller);
      if (!data) return;
      setTodoList(() => data);
    };

    window.addEventListener('todoListUpdate', eventListener);

    return () => {
      controller.abort('Component Unmounted');
      window.removeEventListener('todoListUpdate', eventListener);
    };
  }, [fetcher]);

  return (
    <List className="main-container">
      <Form />
      <ToggbleTabs
        tabs={tabs}
        onChange={tab => {
          setFetcher(() => tab.fetcher);
        }}
      />
      {todoList.data.map(item => (
        <ToDo todo={item} key={item.id} />
      ))}
    </List>
  );
};
