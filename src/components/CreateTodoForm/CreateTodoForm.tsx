import './CreateTodoForm.scss';
import { type ChangeEvent, type FormEvent, useCallback, useRef } from 'react';
import type { TodoRequest } from '../../types/todo.types.ts';
import { createToDo } from '../../api/todo/todo.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { Input } from '../../ui/Input/Input.tsx';

type CreateTodoFormProps = {
  updateTodoData: () => Promise<void>;
};

export const CreateTodoForm = ({ updateTodoData }: CreateTodoFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const checkValidity = useCallback((): boolean => {
    let isValid = true;

    if (!inputRef.current?.value.length) {
      inputRef.current?.setCustomValidity('Обязательное поле');
      isValid = false;
    } else if (inputRef.current?.value.length < 2) {
      inputRef.current?.setCustomValidity('Минимальный размер текста - 2');
      isValid = false;
    } else if (inputRef.current?.value.length > 1 && !inputRef.current?.value.trim()) {
      inputRef.current?.setCustomValidity('Текст задачи не может состоять только из пробелов');
      isValid = false;
    } else {
      inputRef.current?.setCustomValidity('');
    }

    inputRef.current?.reportValidity();

    return isValid;
  }, []);

  const onFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const todoRequest: TodoRequest = Object.fromEntries(new FormData(e.currentTarget));

      if (checkValidity()) {
        try {
          await createToDo(todoRequest);
          await updateTodoData();
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        } catch (error) {
          if (error instanceof Error) alert(error.message);
        }
      }
    },
    [updateTodoData, checkValidity]
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity('');
    e.target.reportValidity();
  };

  return (
    <form id="taskForm" className="create-todo-form" onSubmit={onFormSubmit}>
      <Input
        type="text"
        id="taskTitle"
        name="title"
        placeholder="Введите название задачи"
        defaultValue=""
        aria-required="true"
        className="create-todo-form_input"
        onChange={onInputChange}
        ref={inputRef}
      />
      <Button type="submit" id="task_submitBtn" className="create-todo-form_button button__primary">
        Создать задачу
      </Button>
    </form>
  );
};
