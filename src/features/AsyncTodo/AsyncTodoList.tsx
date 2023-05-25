import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { selectAsyncTodos } from './asyncTodoSelectors';

import { Todo } from '../../types';

import TodoItem from '../../components/TodoItem';
import { fetchAllTodos, removeTodo, toggleTodo } from './todoAsyncActions';

const AsyncTodoList = () => {
  const { list } = useAppSelector(selectAsyncTodos);
  const dispatch = useAppDispatch();

  const handleToggleTodo = (id: Todo['id']) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: Todo['id']) => {
    dispatch(removeTodo(id));
  };

  useEffect(() => {
    dispatch(fetchAllTodos());
    // eslint-disable-next-line
  }, []);

  return (
    <ul>
      {list.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          toggleTodo={handleToggleTodo}
          removeTodo={handleRemoveTodo}
        />
      ))}
    </ul>
  );
};

export default AsyncTodoList;
