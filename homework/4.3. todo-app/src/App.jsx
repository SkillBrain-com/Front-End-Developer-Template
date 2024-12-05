import React, { useState } from "react";
import Card from "./components/card/Card";
import Input from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";
import TextArea from "./components/input/TextArea";
import Button from "./components/button/Button";
import Modal from "./components/modal/Modal";
import "./App.css";

const TODOS_MOCK = [
  {
    id: "1",
    title: "Todo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!",
    completed: false,
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
  {
    id: "4",
    title: "Todo 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
];

function App() {
  const [todos, setTodos] = useState(TODOS_MOCK);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", completed: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();
    const updatedTodos = [...todos, { ...newTodo, id: Date.now().toString() }];
    setTodos(updatedTodos);
    setNewTodo({ title: "", description: "", completed: false });
  };

  const handleToggleCompleted = (id, completed) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };
  const handleUpdateTodo = (id, title, description) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title, description } : todo
    );
    setTodos(updatedTodos);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Card>
          <h2>Create Todo</h2>
          <form onSubmit={handleCreateTodo}>
            <Input
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
              placeholder="Title"
              type="text"
            />
            <TextArea
              name="description"
              value={newTodo.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <Button disabled={!newTodo.title + !newTodo.description} type="submit">Create</Button>
          </form>
        </Card>

        <Card>
          <h1>My todos</h1>
          <Modal isOpen={open} onClose={handleClose}>
          </Modal>
          < Button onClick={handleOpen}>Add +</Button>
          <div className="list-container">
            {todos.filter(todo => !todo.completed).map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                completed={todo.completed}
                title={todo.title}
                description={todo.description}
                onToggleCompleted={handleToggleCompleted}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </div>
          <div className="separator"></div>
          <h2>Completed</h2>
          <div className="list-container">
            {todos.filter(todo => todo.completed).map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                completed={todo.completed}
                title={todo.title}
                description={todo.description}
                onToggleCompleted={handleToggleCompleted}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
