import { useAppDispatch } from '../../redux-hooks';
import { createTodo } from './todoAsyncActions';

import AddNewItem from '../../components/NewItem';

const NewAsyncTodo = () => {
  const dispatch = useAppDispatch();

  const handleNewTodo = (title: string) => {
    dispatch(createTodo(title));
  };

  return <AddNewItem placeholder='add new todo' handleClick={handleNewTodo} />;
};

export default NewAsyncTodo;
