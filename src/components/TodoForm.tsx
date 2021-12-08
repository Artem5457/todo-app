import React from 'react';

type Props = {
  handleSubmit: (event: React.FormEvent) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
};

export const TodoForm: React.FC<Props> = ({
  handleSubmit,
  inputValue,
  setInputValue,
}) => {
  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
        />
      </form>
    </header>
  );
};
