import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, removeTodo, editTodo }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(todo.text)

  const startEdit = () => {
    setValue(todo.text)
    setEdit(true)
  }

  const stopEdit = () => {
    editTodo(index, value)
    setEdit(false)
  }

  return (
    <div
      className="todo"
     
    >
      {!edit ? <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }} onClick={startEdit}>{todo.text}</span>  : <input onBlur={stopEdit} value={value} onChange={(event) => setValue(event.target.value)}  />}
      <div>
        <input type={'checkbox'} onChange={() => completeTodo(index)}/>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    <button type="submit">submit</button>
    </form>
  );
  
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "l",
      isCompleted: false
    },
    {
      text: "u",
      isCompleted: false
    },
    {
      text: "a",
      isCompleted: false
    }
  ]);
  

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const removeTodo= index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
             key={index}
           index={index} 
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            editTodo={editTodo}
           
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
