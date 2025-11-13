import React from "react";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://task-manager-system-h48a.onrender.com/api/v1";

export default function TaskItem({ task, refresh, onEdit, onDelete }) {
  const { _id, name, completed } = task;

  const toggleCompleted = async () => {
    await axios.patch(`${baseURL}/tasks/${_id}`, {
      completed: !completed,
    });
    refresh();
  };

  return (
    <div className={`single-task ${completed ? "task-completed" : ""}`}>
      <h5>
        <i className="far fa-check-circle"></i> {name}
      </h5>

      <div className="task-links" style={{ display: "flex", gap: "15px" }}>

        {/* Completed Checkbox */}
        <input
          type="checkbox"
          checked={completed}
          onChange={toggleCompleted}
          style={{ width: "18px", height: "18px" }}
        />

        <button className="edit-link" onClick={() => onEdit(_id, name, completed)}>
          <i className="fas fa-edit"></i>
        </button>

        <button className="delete-btn" onClick={() => onDelete(_id, name)}>
          <i className="fas fa-trash"></i>
        </button>

      </div>
    </div>
  );
}
