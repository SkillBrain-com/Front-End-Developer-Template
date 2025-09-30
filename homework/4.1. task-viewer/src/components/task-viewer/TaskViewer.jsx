import React from "react";
import "./TaskViewer.css";
import TaskCard from "../task-card/TaskCard";

function TaskViewer({ tasks }) {
  return (
    <div className="task-viewer">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          name={task.name}
          status={task.status}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
}

export default TaskViewer;
