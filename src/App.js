import './App.css';
import React, { useEffect, useState } from 'react';
import AddTodos from './components/AddTodos';
import TodoTable from './components/TodoTable';
import uuid from 'react-uuid';

function App() {
  const [openModel, setOpenModel] = useState(false);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);
  return (
    <>
      {/* Heading */}
      <h1>Todo App</h1>

      {/* component for adding the todo */}
      <AddTodos
        setTodoList={setTodoList}
        todoList={todoList}
        setOpenModel={setOpenModel}
        openModel={openModel}
      />
      <TodoTable setTodoList={setTodoList} todoList={todoList} />
    </>
  );
}

export default App;
