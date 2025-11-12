import React from "react";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL || process.env.REACT_APP_API_URL || "https://task-manager-system-h48a.onrender.com/api/v1";


export default function TaskItem({ task, refresh, onEdit }) {
  const { _id, name, completed } = task;

  const deleteTask = async () => {
    try {
      await axios.delete(`${baseURL}/tasks/${_id}`);
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

      <div className="task-links">
        <button className="edit-link" onClick={() => onEdit(_id)}>
          <i className="fas fa-edit"></i>
        </button>

        <button className="delete-btn" onClick={deleteTask}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
