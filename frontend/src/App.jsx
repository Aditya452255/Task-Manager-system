import React, { useState } from "react";
import TaskList from "./components/TaskList";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export default function App() {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  //  OPEN EDIT MODAL
  const openEditModal = (id, name) => {
    setEditId(id);
    setEditName(name);

    const modal = new window.bootstrap.Modal(
      document.getElementById("editModal")
    );
    modal.show();
  };

  //  SAVE EDIT
  const saveEdit = async () => {
    if (!editId) return;

    try {
      await axios.patch(`${baseURL}/tasks/${editId}`, {
        name: editName,
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //  OPEN DELETE MODAL
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

      {/*  EDIT MODAL */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <label>Task Name:</label>
              <input
                type="text"
                className="form-control"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
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

      {/*  DELETE MODAL */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Delete Task</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              Are you sure you want to delete:
              <br />
              <strong>{deleteName}</strong> ?
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
