import React, { useState } from "react";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";

export default function App() {
  const [editId, setEditId] = useState(null);

  return (
    <>
      {editId ? (
        <EditTask id={editId} back={() => setEditId(null)} />
      ) : (
        <TaskList onEdit={(id) => setEditId(id)} />
      )}
    </>
  );
}
