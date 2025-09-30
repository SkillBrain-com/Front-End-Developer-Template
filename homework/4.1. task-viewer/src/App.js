import "./App.css";
import TaskViewer from "./components/task-viewer/TaskViewer";
import Header from "./components/task-viewer/header/Header";

function App() {
  const data = [
    {
      id: "T-1",
      name: "Create a Design System for Enum Workspace.",
      status: "Todo",
      dueDate: new Date(2022, 5, 23),
    },
    {
      id: "T-2",
      name: "12 Create a Design System for Enum Workspace.",
      status: "In Progress",
      dueDate: new Date(2022, 7, 24),
    },
  ];

  return (
    <div className="app-container">
      <Header />
      <TaskViewer tasks={data} />
    </div>
  );
}

export default App;
