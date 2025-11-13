import React from "react";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://task-manager-system-h48a.onrender.com/api/v1";

export default function TaskItem({ task, refresh, onEdit, onDelete }) {
  const { _id, name, completed } = task;

  // When checkbox is clicked → update completed status
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
    <div className="single-task d-flex justify-content-between align-items-center p-3">
      {/* LEFT SIDE */}
      <div className="d-flex align-items-center gap-3">
        <span>
          <i className="far fa-check-circle"></i>
        </span>
        <span>{name}</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="d-flex align-items-center gap-3">

        {/* Completed Label + Checkbox */}
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: "14px", color: "#444" }}>Completed</span>
          <input
            type="checkbox"
            checked={completed}
            onChange={toggleCompleted}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
        </div>

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
