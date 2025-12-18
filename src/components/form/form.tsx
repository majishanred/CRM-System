import './form.scss';
import { useCallback, useRef } from 'react';
import type { ToDoCreate } from '../../types/todo.types.ts';
import { createToDo } from '../../api/todo/todo.ts';

export const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onTaskSubmit = useCallback((todo: ToDoCreate) => {
    const sendToBackend = async () => {
      await createToDo(todo);

      window.dispatchEvent(new CustomEvent('todoListUpdate'));
    };

    sendToBackend();
  }, []);

  return (
    <form
      id="taskForm"
      className="task-form"
      onSubmit={e => {
        e.preventDefault();

        const data: ToDoCreate = Object.fromEntries(new FormData(e.currentTarget));
        onTaskSubmit(data);

        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }}
    >
      <div className="form-group">
        <input
          type="text"
          id="taskTitle"
          name="title"
          placeholder="Введите название задачи"
          defaultValue=""
          required
          minLength={2}
          maxLength={64}
          aria-required="true"
          onChange={e => {
            const value = e.target.value;
            if (value.length > 1 && !value.trim()) {
              e.target.setCustomValidity('Текст задачи не может состоять только из пробелов');
              e.target.reportValidity();
            } else {
              e.target.setCustomValidity('');
            }
          }}
          ref={inputRef}
        />
      </div>
      <button
        type="submit"
        id="task_submitBtn"
        className="task-form_button button__text-white button__blue"
      >
        Создать задачу
      </button>
    </form>
  );
};
