import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodosFromLocalStorage } from '../../../../constants';
import { TodoType } from './../../../../types/index.d';

interface TodoState {
  todos: TodoType[];
}

const getInitialState = () => {
  const todosFromLocalStorage = getTodosFromLocalStorage('todos');
  return todosFromLocalStorage;
};

const initialState: TodoState = {
  todos: getInitialState(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push({ ...action.payload });
      const todosFromLocalStorage = getTodosFromLocalStorage('todos');
      todosFromLocalStorage.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(todosFromLocalStorage));
    },
    editTodo: (state, action: PayloadAction<TodoType>) => {
      const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload.id);
      const edittedTodo = { ...state.todos[todoIdx], title: action.payload.title };
      state.todos.splice(todoIdx, 1, edittedTodo);

      const todosFromLocalStorage = getTodosFromLocalStorage('todos');
      todosFromLocalStorage.splice(todoIdx, 1, edittedTodo);
      localStorage.setItem('todos', JSON.stringify(todosFromLocalStorage));
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(todoIdx, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
