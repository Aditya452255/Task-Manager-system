import React, { useState } from "react";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||process.env.REACT_APP_API_URL ||"https://task-manager-system-h48a.onrender.com/api/v1";

export default function TaskItem({ task, refresh, onEdit }) {
  const { _id, name, completed } = task;
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = async () => {
    try {
      await axios.delete(`${baseURL}/tasks/${_id}`);
      setShowModal(false);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* task card */}
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

          {/* open modal */}
          <button className="delete-btn" onClick={() => setShowModal(true)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Delete Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this task?</p>
                <p><strong>{name}</strong></p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
