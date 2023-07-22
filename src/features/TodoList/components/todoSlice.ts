import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../../../types';
import axios from 'axios';

interface TodoState {
  todos: TodoType[];
  status: 'idle' | 'loading' | 'failed';
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:5000/todos');

  return response.data;
});

const initialState: TodoState = {
  todos: [],
  status: 'idle',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);

      axios.post('http://localhost:5000/todos', action.payload);
    },
    editTodo: (state, action: PayloadAction<TodoType>) => {
      const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload.id);
      const edittedTodo = { ...state.todos[todoIdx], title: action.payload.title };
      state.todos.splice(todoIdx, 1, edittedTodo);

      axios.patch(`http://localhost:5000/todos/${action.payload.id}`, action.payload.title);
    },
    activeTodo: (state, action: PayloadAction<TodoType>) => {
      const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[todoIdx] = { ...state.todos[todoIdx], isCompleted: !action.payload.isCompleted };

      axios.patch(`http://localhost:5000/todos/${action.payload.id}`, { isCompleted: !action.payload.isCompleted });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(todoIdx, 1);

      axios.delete(`http://localhost:5000/todos/${id}`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'idle';
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, editTodo, deleteTodo, activeTodo } = todoSlice.actions;

export default todoSlice.reducer;
