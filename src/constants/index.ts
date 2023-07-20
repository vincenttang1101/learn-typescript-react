export const getTodosFromLocalStorage = (item: string) => {
  const localTodos = localStorage.getItem(item);
  const todosFromLocalStorage = localTodos ? JSON.parse(localTodos) : [];
  return todosFromLocalStorage;
};
