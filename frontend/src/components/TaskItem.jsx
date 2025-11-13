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

    {/* RIGHT SIDE ICONS + CHECKBOX */}
    <div className="task-actions">

      {/* Completed Label + Checkbox */}
      <label className="completed-label">
        Completed
        <input
          type="checkbox"
          checked={completed}
          onChange={() => refresh()} // optional refresh (or handle toggle)
        />
      </label>

      {/* Edit Button */}
      <button className="edit-link" onClick={() => onEdit(_id)}>
        <i className="fas fa-edit"></i>
      </button>

      {/* Delete Button */}
      <button className="delete-btn" onClick={() => onDelete(_id, name)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  </div>
);
}
