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
  const [ todoList, setTodoList ] = useState(TODOS_MOCK);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
 

  const handleInputChange = (event) => {
      setTodoTitle(event.target.value);
  }  
  const handleTextareaChange = (event) => {
      setTodoDescription(event.target.value);
  }





  const resetForm = () => {
    setTodoTitle("");
    setTodoDescription("");
  }


  const handleSubmit = (event) => {
      event.preventDefault();

      const newTask = {
        id: "1",
        title: todoTitle,
        description: todoDescription,
        completed: false,
      }

      setTodoList((prevState) => [
        ...prevState, 
        {
          ...newTask,
          id: `${prevState.length + 1}`
        }
      ]);
      resetForm();
      closeModal();
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="App">
      <div className="app-container">
        {/* 
          My Todos
        */}
        <Card>
          <h1>My todos</h1>
          <Button onClick={openModal}>Add +</Button>
          <div className="list-container">
           
            {
              todoList
              .filter((item) => item.completed === false )
              .map((item) => (
                <TodoItem 
                key={item.id} 
                id={item.id} 
                title={item.title} 
                description={item.description} 
                completed={item.completed}
                />
              ))
            }

          </div>

          <div className="separator"></div>

          <h2>Completed</h2>
          <div className="list-container">
          {
              todoList
              .filter((item) => item.completed === true )
              .map((item) => (
                <TodoItem 
                key={item.id} 
                id={item.id} 
                title={item.title} 
                description={item.description} 
                completed={item.completed} 
                />
              ))
            }
          </div>
        </Card>
        <Modal isOpen={isOpen} onClose={closeModal} >
        <Card>
          <h2>Create Todo</h2>
          <form onSubmit={handleSubmit}>
            <Input onChange={handleInputChange} placeholder="Title" type="text" value={todoTitle} />
            <TextArea onChange={handleTextareaChange} placeholder="Description" value={todoDescription} > </TextArea>
            <Button type="submit">Create</Button>
          </form>
        </Card>
        </Modal>
      </div>
    </div>
  );
}

export default App;
