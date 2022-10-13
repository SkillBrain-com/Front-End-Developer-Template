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
  const [todoId, setTodoId] = useState();
  const [todoCompleted, setTodoCompleted]=useState();

  const [isOpen, setIsOpen] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [findId, setFindId] = useState();

  const [isEditMode, setIsEditMode] = useState(false);
  


 
  const handleInputChange = (event) => {
      setTodoTitle(event.target.value);
  }  
  const handleTextareaChange = (event) => {
      setTodoDescription(event.target.value);
  }

  const changeTheList = (id) => {
    removeItem(id);
    moveItem(id);
  }

  const moveTodo = (todoList) => {
   
console.log("findId as in App:", findId);
  }



  const resetForm = () => {
    setTodoTitle("");
    setTodoDescription("");
  }


  const handleSubmit = (event) => {
      event.preventDefault();
     
     //trying to fix completed-edit-is-put-in-todo bug, not successful
      console.log("Edit mode:", isEditMode);
      let decidedIfChecked = false;
      if((isChecked === true)&&(isEditMode === true)){
        decidedIfChecked = true;
      }

      const newTask = {
        id: "1",
        title: todoTitle,
        description: todoDescription,
        completed: decidedIfChecked,
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
      if(isEditMode === true) {
        setIsEditMode(false);
        console.log("Edit mode:", isEditMode);
      }
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const removeItem = (removableId) => {
    console.log("id to b removed as in App: ", removableId);
     const shorterList = todoList
    .filter((item) => item.id !== removableId);
    console.log(shorterList);
    setTodoList(shorterList);
  }

  const moveItem = (movableId) => {
    console.log("id to b moved as in App: ", movableId);
    const changedList = todoList
    .filter((item) => item.id === movableId);

    switch(changedList[0].completed ){
      case false:
        changedList[0].completed = true;
        setIsChecked(true);
        break;
      case true:
        changedList[0].completed = false;
        setIsChecked(false);
        break;
    }

    const itemToMove = {
      key: movableId,
      id: movableId,
      title: changedList[0].title,
      description: changedList[0].description,
      completed: changedList[0].completed,
    }

    console.log(itemToMove);

     setTodoList((prevState) => [
      ...prevState, 
      {
        ...itemToMove
      }
    ]);
  }

  const editItem = (editableId) => {
    console.log(editableId);
    setIsEditMode(true);

    setIsOpen(true);
   // event.preventDefault();

   const selectItem = todoList
   .filter((item) => item.id === editableId);
   
    //remove when not edited deletes the post
   removeItem(editableId);
   
   setTodoTitle(selectItem[0].title);
   setTodoDescription(selectItem[0].description);
 
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
                isChecked={changeTheList}
                isRemoved={removeItem}
                isEdited={editItem}
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
                isChecked={changeTheList}
                isRemoved={removeItem}
                isEdited={editItem}
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
