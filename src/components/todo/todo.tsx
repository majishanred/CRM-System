import './todo.scss';
import type { ToDoCreate, ToDoInterface } from '../../types/todo.types.ts';
import { type FormEvent, type SyntheticEvent, useState } from 'react';
import { deleteToDo, updateToDo } from '../../api/todo/todo.ts';

type ToDoProps = {
  todo: ToDoInterface;
};

export const ToDo = ({ todo }: ToDoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const onTaskChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ToDoCreate = Object.fromEntries(new FormData(e.currentTarget));

    const sendToBackend = async () => {
      await updateToDo(todo.id, data);

      window.dispatchEvent(new CustomEvent('todoListUpdate'));
      setIsEditing(false);
    };

    sendToBackend();
  };

  const onTaskStatusChange = () => {
    const sendToBackend = async () => {
      const data = { ...todo, isDone: !todo.isDone };
      await updateToDo(todo.id, data);

      window.dispatchEvent(new CustomEvent('todoListUpdate'));
    };

    sendToBackend();
  };

  const onTaskDelete = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const sendToBackend = async () => {
      await deleteToDo(todo.id);
      window.dispatchEvent(new CustomEvent('todoListUpdate'));
    };

    sendToBackend();
  };

  return (
    <div className="todo">
      <form onSubmit={onTaskChange} onReset={() => setIsEditing(false)}>
        <div className="form-group">
          {!isEditing ? (
            <input
              type="checkbox"
              name="isDone"
              defaultChecked={todo.isDone}
              onChange={onTaskStatusChange}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="form-group">
          {isEditing ? (
            <input
              type="text"
              id="taskTitle"
              name="title"
              placeholder="Введите название задачи"
              disabled={!isEditing}
              required
              defaultValue={todo.title}
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
            />
          ) : (
            <p>{todo.title}</p>
          )}
        </div>
        <div className="form-group todo_buttons">
          {isEditing ? (
            <>
              <button type="submit" className="button__blue button__text-white">
                Ok
              </button>
              <button type="reset" className="button__red button__text-white">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={e => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
                className="button__blue button__text-white"
              >
                <span className="material-symbols-outlined todo_icon">edit</span>
              </button>
              <button onClick={onTaskDelete} className="button__red button__text-white">
                <span className="material-symbols-outlined todo_icon">delete</span>
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
