import './App.scss';
import { ToDoPage } from './pages/TodoPage.tsx';

function App() {
  return (
    <>
      <header className="header">
        <h1>ToDo List</h1>
      </header>
      <ToDoPage />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
    </>
  );
}

export default App;
