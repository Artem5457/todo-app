import React from 'react';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  toggleAllTodos: () => void;
  handleRemove: (todo: Todo) => void;
  handleTodoEdit: (todo: Todo, editTitle: string) => void;
  handleCompletedChange: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleAllTodos,
  handleRemove,
  handleTodoEdit,
  handleCompletedChange,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        onChange={toggleAllTodos}
        className="toggle-all"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="toggle-all"
        style={{ cursor: 'pointer' }}
      >
        Mark all as complete
      </label>

      <ul className="todo-list">
        {todos.map(item => {
          return (
            <TodoItem
              completedChange={handleCompletedChange}
              todo={item}
              key={item.id}
              handleRemove={handleRemove}
              handleTodoEdit={handleTodoEdit}
            />
          );
        })}
      </ul>
    </section>
  );
};
