import './Todo.scss';
import { type ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { deleteToDo, updateToDo } from '../../api/todo/todo.ts';
import type { Todo, TodoRequest } from '../../types/todo.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { Input } from '../../ui/Input/Input.tsx';
import { getTodoValidationMessage } from '../../utils/todo.ts';

type ToDoProps = {
  todo: Todo;
  updateTodoData: () => Promise<void>;
};

export const ToDo = ({ todo, updateTodoData }: ToDoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onTodoChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: TodoRequest = Object.fromEntries(new FormData(e.currentTarget));

    const validationMessage = getTodoValidationMessage(inputRef.current?.value);

    if (validationMessage) {
      inputRef.current?.setCustomValidity(validationMessage);
      inputRef.current?.reportValidity();
      return;
    }

    try {
      await updateToDo(todo.id, data);
      await updateTodoData();
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const onTodoStatusChange = async () => {
    const data = { ...todo, isDone: !todo.isDone };
    try {
      await updateToDo(todo.id, data);
      await updateTodoData();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const onTodoDelete = async () => {
    try {
      await deleteToDo(todo.id);
      await updateTodoData();
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
    <>
      {!isEditing ? (
        <div className="todo">
          <Input
            type="checkbox"
            name="isDone"
            defaultChecked={todo.isDone}
            onChange={onTodoStatusChange}
          />
          <p>{todo.title}</p>
          <div className="todo_buttons">
            <Button type="button" onClick={() => setIsEditing(true)} variant="primary">
              <span className="material-symbols-outlined todo_icon">edit</span>
            </Button>
            <Button type="button" onClick={onTodoDelete} variant="danger">
              <span className="material-symbols-outlined todo_icon">delete</span>
            </Button>
          </div>
        </div>
      ) : (
        <form className="todo" onSubmit={onTodoChange} onReset={() => setIsEditing(false)}>
          <Input
            className="todo_input"
            type="text"
            id="taskTitle"
            name="title"
            placeholder="Введите название задачи"
            disabled={!isEditing}
            defaultValue={todo.title}
            aria-required="true"
            onChange={onInputChange}
            ref={inputRef}
          />
          <div className="todo_buttons">
            <Button type="submit" variant="primary">
              <span className="material-symbols-outlined">check</span>
            </Button>
            <Button type="reset" variant="primary">
              <span className="material-symbols-outlined">close</span>
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
