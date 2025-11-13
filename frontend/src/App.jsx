import React, { useState } from "react";
import TaskList from "./components/TaskList";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://task-manager-system-h48a.onrender.com/api/v1";

export default function App() {
  // EDIT MODAL STATE
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);

  // DELETE MODAL STATE
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  // 🔵 OPEN EDIT MODAL
  const openEditModal = (id, name, completed) => {
    setEditId(id);
    setEditName(name);
    setEditCompleted(completed);

    const modal = new window.bootstrap.Modal(
      document.getElementById("editModal")
    );
    modal.show();
  };

  // SAVE EDITED TASK
  const saveEdit = async () => {
    if (!editId) return;

    try {
      await axios.patch(`${baseURL}/tasks/${editId}`, {
        name: editName,
        completed: editCompleted,
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔴 OPEN DELETE MODAL
  const openDeleteModal = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);

    const modal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );
    modal.show();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await axios.delete(`${baseURL}/tasks/${deleteId}`);
    window.location.reload();
  };

  return (
    <>
      <TaskList onEdit={openEditModal} onDelete={openDeleteModal} />

      {/* EDIT MODAL */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <label>Task Name</label>
              <input
                className="form-control mb-3"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <label style={{ marginRight: "10px" }}>Completed</label>
              <input
                type="checkbox"
                checked={editCompleted}
                onChange={(e) => setEditCompleted(e.target.checked)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveEdit}>
                Save
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Delete Task</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              Delete this task?
              <br />
              <strong>{deleteName}</strong>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
