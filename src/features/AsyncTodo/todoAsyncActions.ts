import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../types';
import { TodoSlice } from './asyncTodoSlice';

export const fetchAllTodos = createAsyncThunk<
  Todo[],
  undefined,
  { state: { asyncTodos: TodoSlice } }
>(
  'todos/fetchTodos',
  async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=10'
    );

    return (await response.json()) as Todo[];
  },
  {
    condition: (_, { getState, extra }) => {
      const { status } = getState().asyncTodos;
      if (status === 'loading') {
        return false;
      }
    },
  }
);

export const createTodo = createAsyncThunk<Todo, string>(
  'todos/createTodo',
  async (text: string) => {
    const newTodo: Required<Omit<Todo, 'id'>> = {
      title: text,
      userId: 1,
      completed: false,
    };

    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    return (await response.json()) as Todo;
  }
);

export const removeTodo = createAsyncThunk<
  Todo['id'],
  Todo['id'],
  { rejectValue: string }
>('todos/removeTodo', async (id: Todo['id'], { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    { method: 'DELETE' }
  );

  if (!response.ok) {
    return rejectWithValue('Impossible to delete....');
  }

  return id;
});

export const toggleTodo = createAsyncThunk<
  Todo,
  Todo['id'],
  { state: { asyncTodos: TodoSlice }; rejectValue: string }
>('todos/toggleTodo', async (id: Todo['id'], { getState, rejectWithValue }) => {
  const todo = getState().asyncTodos.list.find((item) => item.id === id);

  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue('Impossible to update....');
    }

    return await response.json();
  }
  return rejectWithValue('No todo found...');
});
