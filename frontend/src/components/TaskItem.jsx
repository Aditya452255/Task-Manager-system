import React from "react";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://task-manager-system-h48a.onrender.com/api/v1";

export default function TaskItem({ task, refresh, onEdit, onDelete }) {
  const { _id, name, completed } = task;

  const toggleCompleted = async () => {
    try {
      await axios.patch(`${baseURL}/tasks/${_id}`, {
        completed: !completed,
      });
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`single-task ${completed ? "task-completed" : ""}`}>
      <h5>
        <span>
          <i className="far fa-check-circle"></i>
        </span>
        {name}
      </h5>

      <div className="task-links" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        
        {/* Completed Checkbox */}
        <input
          type="checkbox"
          checked={completed}
          onChange={toggleCompleted}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />

        {/* Edit */}
        <button className="edit-link" onClick={() => onEdit(_id)}>
          <i className="fas fa-edit"></i>
        </button>

        {/* Delete */}
        <button className="delete-btn" onClick={() => onDelete(_id, name)}>
          <i className="fas fa-trash"></i>
        </button>

      </div>
    </div>
  );
}
