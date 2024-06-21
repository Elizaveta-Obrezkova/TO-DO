import React from "react";
import "./TasksPopup.css";
import "../Task/Task.css"

function TasksPopup(props) {
  const [task, setTask] = React.useState("");

  function handleChangeTask(e) {
    setTask(e.target.value);
  }

  function handleAddTaskSubmit(e) {
    e.preventDefault();

    props.onAddTask({
      name: task,
    });
  }

  return (
    <div className={props.card.id ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть."
          onClick={props.onClose}
        ></button>
        <h2 className="photo-card__title">{props.card.id}</h2>
        <form
          name="add-task-form"
          className="popup__form"
          onSubmit={handleAddTaskSubmit}
        >
          <div className="input-container">
            <input
              id="task"
              name="add-task"
              type="text"
              className="popup__input"
              placeholder="Введите задачу"
              required
              minLength="2"
              maxLength="50"
              value={task}
              onChange={handleChangeTask}
            />
            <span id="error-title-place" className="error-message"></span>
          </div>
          <button type="submit" className="popup__button">
            <span className="visually-hidden">Добавить задачу</span>
          </button>
        </form>
        <div className="tasks">
          <h3 className="tasks__header">Задачи дня:</h3>
          <div className="task">
            <button
              type="button"
              className={
                props.isDone ? "button-done button-done_active" : "button-done"
              }
              aria-label="Сделано"
              /* onClick={handleTaskDone} */
            ></button>
            <p className="task__text">Задача на сегодня</p>
            <button
              type="button"
              className="button-delete"
              aria-label="Удалить."
              /* onClick={handleCardDelete} */
            ></button>
          </div>
          <div className="task">
            <button
              type="button"
              className={
                props.isDone ? "button-done button-done_active" : "button-done"
              }
              aria-label="Сделано"
              /* onClick={handleTaskDone} */
            ></button>
            <p className="task__text">Еще одна задача на сегодня, которую надо сделать</p>
            <button
              type="button"
              className="button-delete"
              aria-label="Удалить."
              /* onClick={handleCardDelete} */
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksPopup;
