import React, { useState, useEffect } from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = ({ id, completed, title, description, onToggleCompleted, onDelete, onUpdate }) => {
  const [isChecked, setIsChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  useEffect(() => {
    setIsChecked(completed);
  }, [completed]);

  const handleCheckboxChange = (value) => {
    setIsChecked(value);
    onToggleCompleted(id, value);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${isChecked ? "todo-completed" : ""}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {isEditing ? (
            <input id="input-title"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h4>{title}</h4>
          )}
        </div>
        <div>
          {isEditing ? (
            <>
              <button id="btn-save" onClick={handleSaveClick}>Save</button>
              <button id="btn-cancel" onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <i className="fa fa-pencil" aria-hidden="true" onClick={handleEditClick}></i>
              <i className="fa fa-trash" aria-hidden="true" onClick={() => onDelete(id)}></i>
            </>
          )}
        </div>
      </div>

      <div className="separator"></div>

      {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
};

export default TodoItem;