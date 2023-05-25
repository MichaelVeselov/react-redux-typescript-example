import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { toggleTodo, removeTodo } from './todoSlice';
import { selectAllTodos } from './todoSelectors';

import { Todo } from '../../types';

import TodoItem from '../../components/TodoItem';

const TodoList = () => {
  const list = useAppSelector(selectAllTodos);
  const dispatch = useAppDispatch();

  const handleToggleTodo = (id: Todo['id']) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: Todo['id']) => {
    dispatch(removeTodo(id));
  };

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

export default TodoList;
