import './App.css';
import React, { useState } from 'react';
import AddTodos from './components/AddTodos';

function App() {
  const [todoList, setTodoList] = useState([]);
  console.log(todoList);
  return (
    <React.Fragment>
      {/* Heading */}
      <h1>Todo App</h1>

      {/* component for adding the todo */}
      <AddTodos
        setTodoList={setTodoList}
        todoList={todoList}
      />
    </React.Fragment>
  );
}

export default App;
