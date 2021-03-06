import React from 'react';

type Props = {
  onFilterChange: (filter: string) => void;
};

export const TodosFilter: React.FC<Props> = ({ onFilterChange }) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={() => {
            onFilterChange('all');
          }}
          className="selected"
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => {
            onFilterChange('active');
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => {
            onFilterChange('completed');
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
