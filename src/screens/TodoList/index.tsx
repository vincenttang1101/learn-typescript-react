import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { AddTodo, TodoItem } from './components';
import { TodoType } from '../../types';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './components/AddTodo/addTodoSlice';
import { getTodosFromLocalStorage } from '../../constants';

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodoClick = (newTitle: string): void => {
    const newTodoItem: TodoType = {
      id: todos.length + 1,
      title: newTitle,
      isCompleted: false,
    };
    dispatch(addTodo(newTodoItem));
  };

  const handleActiveTodoClick = (id: number): void => {
    // const newTodos = [...todos];
    // const todoIdx = todos.findIndex((todo) => todo.id === id);
    // newTodos[todoIdx] = {
    //   ...newTodos[todoIdx],
    //   isCompleted: !newTodos[todoIdx].isCompleted,
    // };
    // localStorage.setItem('todos', JSON.stringify(newTodos));
    // setTodos(newTodos);
  };

  const handleEditTodoClick = (id: number, title: string): void => {
    const todo = todos.filter((todo) => todo.id === id);
    dispatch(editTodo({ ...todo[0], title }));
  };

  const handleRemoveTodoClick = (id: number): void => {
    dispatch(deleteTodo(id));
  };

  useEffect(() => {
    const todosFromLocalStorage = getTodosFromLocalStorage('todos');
  }, []);
  console.log('re-render');
  return (
    <div className="container__todolist">
      <h2>Todo List</h2>
      <AddTodo onTodoAddClick={handleAddTodoClick} />
      <div className="todo__list">
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
