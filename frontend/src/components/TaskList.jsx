import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

const baseURL = process.env.REACT_APP_API_URL;

export default function TaskList({ onEdit, onDelete }) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [alert, setAlert] = useState("");

  const loadTasks = async () => {
    try {
      const res = await axios.get(`${baseURL}/tasks`);
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      setAlert("Write something first");
      return;
    }

    await axios.post(`${baseURL}/tasks`, { name: taskName });
    setTaskName("");
    loadTasks();
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

        {alert && <div className="form-alert text-danger">{alert}</div>}
      </form>

      <section className="tasks-container">
        <div className="tasks">
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
