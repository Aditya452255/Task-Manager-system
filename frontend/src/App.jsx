import React, { useState } from "react";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||process.env.REACT_APP_API_URL ||"https://task-manager-system-h48a.onrender.com/api/v1";

export default function App() {
  const [editId, setEditId] = useState(null);

  // FOR DELETE MODAL
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/tasks/${deleteId}`);
      window.location.reload(); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {editId ? (
        <EditTask id={editId} back={() => setEditId(null)} />
      ) : (
        <TaskList
          onEdit={(id) => setEditId(id)}
          onDelete={(id, name) => {
            setDeleteId(id);
            setDeleteName(name);
          }}
        />
      )}

      {/* GLOBAL BOOTSTRAP MODAL */}
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
              <h5 className="modal-title" id="deleteModalLabel">
                Delete Task
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              Are you sure you want to delete this task?
              <br />
              <strong>{deleteName}</strong>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

