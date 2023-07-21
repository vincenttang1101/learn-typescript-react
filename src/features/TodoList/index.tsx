import './styles.css';
import { AddTodo, TodoItem } from './components';
import { TodoType } from '../../types';
import { RootState } from '../../app/store';
import { activeTodo, addTodo, deleteTodo, editTodo } from './components/todoSlice';
import { useAppDispatch, useAppSelector } from '@app/hook';
import { nanoid } from '@reduxjs/toolkit';

export default function TodoList() {
  const todos = useAppSelector((state: RootState) => state.todo.todos);
  const dispatch = useAppDispatch();

  const handleAddTodoClick = (newTitle: string): void => {
    const newTodoItem: TodoType = {
      id: nanoid(),
      title: newTitle,
      isCompleted: false,
    };
    dispatch(addTodo(newTodoItem));
  };

  const handleActiveTodoClick = (id: string): void => {
    const todo = todos.filter((todo) => todo.id === id);
    dispatch(activeTodo({ ...todo[0] }));
  };

  const handleEditTodoClick = (id: string, title: string): void => {
    const todo = todos.filter((todo) => todo.id === id);
    dispatch(editTodo({ ...todo[0], title }));
  };

  const handleRemoveTodoClick = (id: string): void => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="container__todoList">
      <h2>Todo List</h2>
      <AddTodo onTodoAddClick={handleAddTodoClick} />
      <div className="todoList">
        {todos.map((todo: any) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onActiveTodoClick={handleActiveTodoClick}
            onEditTodoClick={handleEditTodoClick}
            onRemoveTodoClick={handleRemoveTodoClick}
          />
        ))}
      </div>
    </div>
  );
}
