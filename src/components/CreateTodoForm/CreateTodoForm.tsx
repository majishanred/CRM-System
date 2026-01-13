import './CreateTodoForm.scss';
import { type ChangeEvent, type FormEvent, useRef } from 'react';
import type { TodoRequest } from '../../types/todo.ts';
import { createToDo } from '../../api/todo/todo.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { Input } from '../../ui/Input/Input.tsx';
import { getTodoValidationMessage } from '../../utils/todo.ts';

type CreateTodoFormProps = {
  updateTodoData: () => Promise<void>;
};

export const CreateTodoForm = ({ updateTodoData }: CreateTodoFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todoRequest: TodoRequest = Object.fromEntries(new FormData(e.currentTarget));

    const validationMessage = getTodoValidationMessage(inputRef.current?.value);

    if (validationMessage) {
      inputRef.current?.setCustomValidity(validationMessage);
      inputRef.current?.reportValidity();
      return;
    }

    try {
      await createToDo(todoRequest);
      await updateTodoData();
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

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
      <Button
        type="submit"
        id="task_submitBtn"
        className="create-todo-form_button"
        variant="primary"
      >
        Создать задачу
      </Button>
    </form>
  );
};
