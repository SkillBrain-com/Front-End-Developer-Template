import React from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = (props) => {

  const handleRemove = (event) => {
    props.isRemoved(event.target.id);

  }

  const handleEdit = (event) => {
    props.isEdited(event.target.id);
    console.log("id to b edited as in ToDoItem: ", event.target.id);
   
  }

  const handleCheckboxChange = (event) => {
    
  };

  return (
    <div className={`todo-item ${props.completed && "todo-completed"}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox
            checked={!!props.completed}
            onChange={handleCheckboxChange}
            id={props.id}
            isChecked={props.isChecked}          
          />

          <h4>{props.title}</h4>
        </div>
        <div>
          <i className="fa fa-pencil" aria-hidden="true" onClick={handleEdit}  id={props.id} ></i>
          <i className="fa fa-trash" aria-hidden="true" onClick={handleRemove} id={props.id} ></i>
        </div>
      </div>

      <div className="separator"></div>

      <p>
       {props.description}
      </p>
    </div>
  );
};

export default TodoItem;
