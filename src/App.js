import './App.css';
import React, { useState } from 'react';
import AddTodos from './components/AddTodos';

function App() {
   const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      {/* Heading */}
      <h1>Todo App</h1>

      {/* component for adding the todo */}
      <AddTodos setOpen={setOpen} open={open} />

    </React.Fragment>
  );
}

export default App;
