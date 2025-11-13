import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL =
  import.meta.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://task-manager-system-h48a.onrender.com/api/v1";

export default function EditTask({ id, back }) {
  const [taskName, setTaskName] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [tempName, setTempName] = useState("");
  const [alert, setAlert] = useState("");

  const loadTask = async () => {
    try {
      const res = await axios.get(`${baseURL}/tasks/${id}`);
      const task = res.data.task;

      setTaskName(task.name);
      setTempName(task.name);
      setTaskCompleted(task.completed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${baseURL}/tasks/${id}`, {
        name: taskName,
        completed: taskCompleted,
      });
      setAlert("success, edited task");
    } catch (err) {
      setTaskName(tempName);
      setAlert("error, please try again");
    }

    setTimeout(() => setAlert(""), 3000);
  };

  return (
    <div className="container">
      <form className="single-task-form" onSubmit={updateTask}>
        <h4>Edit Task</h4>

        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            className="task-edit-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Completed</label>
          <input
            type="checkbox"
            className="task-edit-completed"
            checked={taskCompleted}
            onChange={(e) => setTaskCompleted(e.target.checked)}
          />
        </div>

        <button type="submit" className="block btn task-edit-btn">
          Edit
        </button>

        {alert && <div className="form-alert text-success">{alert}</div>}
      </form>

      <button className="btn back-link" onClick={back}>
        back to tasks
      </button>
    </div>
  );
}
