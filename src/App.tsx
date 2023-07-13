import './App.css';
import TodoList from './screens/TodoList';
import UserList from './screens/UserList';

function App() {
  return (
    <div className="container__app">
      <UserList />
      <TodoList />
    </div>
  );
}

export default App;
