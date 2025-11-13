import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export default function EditTask({ id, back }) {
  const [taskName, setTaskName] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [alert, setAlert] = useState("");

  // Load tasks
  const loadTask = async () => {
    try {
      const res = await axios.get(`${baseURL}/tasks/${id}`);
      const task = res.data.task;

      setTaskName(task.name);
      setTaskCompleted(task.completed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  // Update task
  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${baseURL}/tasks/${id}`, {
        name: taskName,
        completed: taskCompleted,
      });

      setAlert("Task updated successfully!");
    } catch (err) {
      setAlert("Something went wrong, try again.");
    }

    setTimeout(() => setAlert(""), 3000);
  };

  return (
    <div className="container">
      <form className="single-task-form" onSubmit={updateTask}>
        <h4>Edit Task</h4>

        {/* Task Name */}
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            className="task-edit-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        {/* Checkbox */}
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
          Save Changes
        </button>

        {alert && <div className="form-alert text-success">{alert}</div>}
      </form>

      <button className="btn back-link" onClick={back}>
        Back to tasks
      </button>
    </div>
  );
}
