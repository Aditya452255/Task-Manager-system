export default function TaskItem({ task, refresh, onEdit, onDelete }) {
  const { _id, name, completed } = task;

  return (
    <div className={`single-task ${completed ? "task-completed" : ""}`}>
      <h5>
        <span><i className="far fa-check-circle"></i></span>
        {name}
      </h5>

      <div className="task-links">
        <button className="edit-link" onClick={() => onEdit(_id)}>
          <i className="fas fa-edit"></i>
        </button>

        <button className="delete-btn" onClick={() => onDelete(_id, name)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
