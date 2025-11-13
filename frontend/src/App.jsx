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

  // delete modal states
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

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

    // close modal
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("deleteModal")
    );
    modal.hide();

    window.location.reload();
  };

  return (
    <>
      {editId ? (
        <EditTask id={editId} back={() => setEditId(null)} />
      ) : (
        <TaskList onEdit={setEditId} onDelete={openDeleteModal} />
      )}

      {/* DELETE MODAL */}
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
