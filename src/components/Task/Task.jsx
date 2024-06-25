import React from "react";
import "./Task.css";

function Task(props) {
  return (
    <div className="task">
      <button
        type="button"
        className={props.task.checked ? "button-done button-done_active" : "button-done"}
        aria-label="Сделано"
        /* onClick={handleTaskDone} */
      ><span className="visually-hidden">Изменить статус выполнения задачи</span></button>
      <p className="task__text">{props.task.task}</p>
      <button
        type="button"
        className="button-delete"
        aria-label="Удалить."
        /* onClick={handleCardDelete} */
      ><span className="visually-hidden">Удалить задачу</span></button>
    </div>
  );
}

export default Task;
