import React from "react";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://task-manager-system-h48a.onrender.com/api/v1";

export default function TaskItem({ task, refresh, onEdit, onDelete }) {
  const { _id, name, completed } = task;

  // update completed instantly
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

      {/* RIGHT SIDE BUTTON + COMPLETED CHECKBOX */}
      <div className="task-links" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        
        {/* Completed checkbox */}
        <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.9rem" }}>
          <span style={{ color: "#444" }}>Completed</span>
          <input
            type="checkbox"
            checked={completed}
            onChange={toggleCompleted}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
        </label>

        {/* Edit button */}
        <button className="edit-link" onClick={() => onEdit(_id)}>
          <i className="fas fa-edit"></i>
        </button>

        {/* Delete button */}
        <button className="delete-btn" onClick={() => onDelete(_id, name)}>
          <i className="fas fa-trash"></i>
        </button>

      </div>
    </div>
  );
}
