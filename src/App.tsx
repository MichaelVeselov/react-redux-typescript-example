import NewTodo from './features/Todo/NewTodo';
import TodoList from './features/Todo/TodoList';
import NewAsyncTodo from './features/AsyncTodo/NewAsyncTodo';
import AsyncTodoList from './features/AsyncTodo/AsyncTodoList';

import './App.css';

function App() {
  return (
    <>
      <NewTodo />
      <TodoList />
      <hr />
      <NewAsyncTodo />
      <AsyncTodoList />
    </>
  );
}

export default App;
