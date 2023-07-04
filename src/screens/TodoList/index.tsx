import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles.css';
import { AddTodo, TodoItem } from './components';
import { TodoType } from '../../models';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleAddTodoClick = useCallback((newTitle: string): void => {
    const storedTodos = localStorage.getItem('todos');
    const todosFromLocalStorage = storedTodos ? JSON.parse(storedTodos) : [];

    const newTodoItem: TodoType = {
      id: todosFromLocalStorage.length + 1,
      title: newTitle,
      isCompleted: false,
    };
    const newTodos = [...todosFromLocalStorage, newTodoItem];
    localStorage.setItem('todos', JSON.stringify(newTodos));

    setTodos(newTodos);
  }, []);

  const handleActiveTodoClick = (id: number): void => {
    const newTodos = [...todos];
    const todoIdx = todos.findIndex((todo) => todo.id === id);

    newTodos[todoIdx] = {
      ...newTodos[todoIdx],
      isCompleted: !newTodos[todoIdx].isCompleted,
    };

    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleEditTodoClick = (id: number, title: string): void => {
    const newTodos = [...todos];
    const todoIdx = todos.findIndex((todo) => todo.id === id);

    newTodos[todoIdx] = {
      ...newTodos[todoIdx],
      title: title,
    };

    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleRemoveTodoClick = (id: number): void => {
    const newTodos = [...todos];
    const removeTodo = newTodos.filter((todo) => todo.id !== id);

    localStorage.setItem('todos', JSON.stringify(removeTodo));
    setTodos(removeTodo);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const todosFromLocalStorage = storedTodos ? JSON.parse(storedTodos) : [];
    setTodos(todosFromLocalStorage);
  }, []);

  return (
    <div className="container__todolist">
      <h2>Todo List</h2>
      <AddTodo onTodoAddClick={handleAddTodoClick} />
      <div className="todo__list">
        {todos.map((todo) => (
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
