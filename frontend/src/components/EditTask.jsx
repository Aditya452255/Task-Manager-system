import React, { useState } from "react";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||process.env.REACT_APP_API_URL ||"https://task-manager-system-h48a.onrender.com/api/v1";

export default function TaskItem({ task, refresh }) {
  const { _id, name, completed } = task;

  const [editName, setEditName] = useState(name);
  const [editCompleted, setEditCompleted] = useState(completed);

  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setEditName(name);
    setEditCompleted(completed);
    setShowEdit(true);
  };

  const saveEdit = async () => {
    try {
      await axios.patch(`${baseURL}/tasks/${_id}`, {
        name: editName,
        completed: editCompleted,
      });

      setShowEdit(false);
      refresh();
    } catch (err) {
      console.log("Error updating", err);
    }
  };

  return (
    <>
      {/* Task Item */}
      <div className={`single-task ${completed ? "task-completed" : ""}`}>
        <h5>
          <span><i className="far fa-check-circle"></i></span>
          {name}
        </h5>

        <div className="task-links">
          <button className="edit-link" onClick={openEdit}>
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
              </div>

              <div className="modal-body">
                <div className="form-control">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="task-edit-name"
                  />
                </div>

                <div className="form-control" style={{ marginTop: "1rem" }}>
                  <label>Completed</label>
                  <input
                    type="checkbox"
                    checked={editCompleted}
                    onChange={(e) => setEditCompleted(e.target.checked)}
                    className="task-edit-completed"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEdit(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveEdit}>
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

