import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

const baseURL = process.env.REACT_APP_API_URL;

export default function TaskList({ onEdit, onDelete }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [alert, setAlert] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/tasks`);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/tasks`, { name: taskName });
      setTaskName("");
      setAlert("success, task added");
      loadTasks();
    } catch {
      setAlert("You have not written anything to add");
    }

    setTimeout(() => setAlert(""), 3000);
  };

  return (
    <>
      <form className="task-form" onSubmit={createTask}>
        <h4>task manager</h4>

        <div className="form-control">
          <input
            type="text"
            className="task-input"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="e.g. wash dishes"
          />
          <button type="submit" className="btn submit-btn">
            submit
          </button>
        </div>

        {alert && <div className="form-alert text-success">{alert}</div>}
      </form>

      <section className="tasks-container">
        <p
          className="loading-text"
          style={{ visibility: loading ? "visible" : "hidden" }}
        >
          Loading...
        </p>

        <div className="tasks">
          {tasks.length === 0 && !loading && (
            <h5 className="empty-list">No tasks in your list</h5>
          )}

          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              refresh={loadTasks}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </section>
    </>
  );
}
