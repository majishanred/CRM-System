import './Todo.scss';
import {
  type ChangeEvent,
  type FormEvent,
  type SyntheticEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { deleteToDo, updateToDo } from '../../api/todo/todo.ts';
import type { Todo, TodoRequest } from '../../types/todo.types.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { Input } from '../../ui/Input/Input.tsx';

type ToDoProps = {
  todo: Todo;
  updateTodoData: () => Promise<void>;
};

export const ToDo = ({ todo, updateTodoData }: ToDoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
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

  const onTaskChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: TodoRequest = Object.fromEntries(new FormData(e.currentTarget));
    if (checkValidity()) {
      try {
        await updateToDo(todo.id, data);
        await updateTodoData();
        setIsEditing(false);
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  const onTaskStatusChange = () => {
    const sendToBackend = async () => {
      const data = { ...todo, isDone: !todo.isDone };
      try {
        await updateToDo(todo.id, data);
        await updateTodoData();
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    };

    sendToBackend();
  };

  const onTaskDelete = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await deleteToDo(todo.id);
      await updateTodoData();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
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
            onChange={onTaskStatusChange}
          />
          <p>{todo.title}</p>
          <div className="todo_buttons">
            <Button type="button" onClick={() => setIsEditing(true)} className="button__primary">
              <span className="material-symbols-outlined todo_icon">edit</span>
            </Button>
            <Button type="button" onClick={onTaskDelete} className="button__danger">
              <span className="material-symbols-outlined todo_icon">delete</span>
            </Button>
          </div>
        </div>
      ) : (
        <form className="todo" onSubmit={onTaskChange} onReset={() => setIsEditing(false)}>
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
            <Button type="submit" className="button__primary button__text-white">
              Сохранить
            </Button>
            <Button type="reset" className="button__primary button__text-white">
              Отменить
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
