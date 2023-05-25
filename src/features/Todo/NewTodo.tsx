import { useAppDispatch } from '../../redux-hooks';
import { addTodo } from './todoSlice';

import AddNewItem from '../../components/NewItem';

const NewTodo = () => {
  const dispatch = useAppDispatch();

  const handleNewTodo = (title: string) => {
    dispatch(addTodo(title));
  };

  return <AddNewItem placeholder='add new todo' handleClick={handleNewTodo} />;
};

export default NewTodo;
