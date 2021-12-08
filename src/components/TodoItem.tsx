import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  completedChange: (todo: Todo) => void;
  todo: Todo;
  handleRemove: (todo: Todo) => void;
  handleTodoEdit: (todo: Todo, editTitle: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  completedChange,
  todo,
  handleRemove,
  handleTodoEdit,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const changeMode = () => {
    setEditMode(true);
  };

  return (
    <>
      <li
        onDoubleClick={changeMode}
        className={
          classNames({
            completed: todo.completed,
            editing: editMode,
          })
        }
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => {
              completedChange(todo);
            }}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            {todo.title}
          </label>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="destroy"
            onClick={() => handleRemove(todo)}
          />
        </div>
        <input
          type="text"
          value={editTitle}
          className="edit"
          onKeyUp={({ keyCode }) => {
            if (editTitle.length > 0 && keyCode === 13) {
              handleTodoEdit(todo, editTitle);
              setEditMode(false);
            } else if (keyCode === 27) {
              setEditMode(false);
            }
          }}
          onChange={event => setEditTitle(event.currentTarget.value)}
        />
      </li>
    </>
  );
};
