// src/App.jsx
import React, { useState } from "react";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://task-manager-system-h48a.onrender.com/api/v1";

export default function App() {
  const [editId, setEditId] = useState(null);

  // delete modal state
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  // called by TaskItem to open modal
  const openDeleteModal = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);

    // use Bootstrap's Modal API to show the modal
    const modalEl = document.getElementById("deleteModal");
    const modalInstance = new window.bootstrap.Modal(modalEl);
    modalInstance.show();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${baseURL}/tasks/${deleteId}`);
      // hide modal
      const modalEl = document.getElementById("deleteModal");
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      // refresh page data in simplest way: reload (or you can pass a callback)
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      {editId ? (
        <EditTask id={editId} back={() => setEditId(null)} />
      ) : (
        <TaskList onEdit={(id) => setEditId(id)} onDelete={openDeleteModal} />
      )}

      {/* ---------- Bootstrap modal placed once (global) ---------- */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Delete Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              Are you sure you want to delete:
              <br />
              <strong>{deleteName}</strong> ?
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
