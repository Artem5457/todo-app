import React, { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from './localStorage';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { TodoForm } from './components/TodoForm';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    setTodoList(getLocalStorage('todos') || []);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.length > 0) {
      const newId = +new Date();
      const newTodo = {
        id: newId,
        title: inputValue,
        completed: false,
      };

      setTodoList(prevState => {
        setLocalStorage('todos', [...prevState, newTodo]);

        return [...prevState, newTodo];
      });

      setInputValue('');
    }
  };

  const handleCompletedChange = (todo: Todo) => {
    setTodoList(prevState => {
      const newState = prevState.map(item => {
        if (item.id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return item;
      });

      setLocalStorage('todos', newState);

      return newState;
    });
  };

  const handleRemove = (todo: Todo) => {
    setTodoList(prevState => {
      const newState = prevState.filter(item => item.id !== todo.id);

      setLocalStorage('todos', newState);

      return newState;
    });
  };

  const handleTodoEdit = (todo: Todo, editTitle: string) => {
    setTodoList(prevState => {
      const newState = prevState.map(item => {
        if (item.id === todo.id) {
          return {
            ...todo,
            title: editTitle,
          };
        }

        return item;
      });

      setLocalStorage('todos', newState);

      return newState;
    });
  };

  const toggleAllTodos = () => {
    setAllTodos(!allTodos);
    setTodoList(prevState => {
      const toggledAllState = prevState.map(item => {
        return {
          ...item,
          completed: allTodos,
        };
      });

      setLocalStorage('todos', toggledAllState);

      return toggledAllState;
    });
  };

  const completedTodos = todoList.filter(item => !item.completed);

  const visibleTodos = filter === 'all'
    ? todoList
    : todoList.filter(item => {
      if (filter === 'active') {
        return !item.completed;
      }

      return item.completed;
    });

  const completedRemove = () => {
    setTodoList(prevState => {
      const newState = prevState.filter(item => !item.completed);

      setLocalStorage('todos', newState);

      return newState;
    });
  };

  return (
    <section className="todoapp">
      <TodoForm
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <TodoList
        todos={visibleTodos}
        toggleAllTodos={toggleAllTodos}
        handleRemove={handleRemove}
        handleTodoEdit={handleTodoEdit}
        handleCompletedChange={handleCompletedChange}
      />

      <footer className="footer">
        {completedTodos.length > 0 && (
          <span className="todo-count">
            {completedTodos.length}
            {' '}
            items left
          </span>
        )}

        <TodosFilter
          onFilterChange={setFilter}
        />

        <button
          type="button"
          className="clear-completed"
          onClick={completedRemove}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
};

export default App;
