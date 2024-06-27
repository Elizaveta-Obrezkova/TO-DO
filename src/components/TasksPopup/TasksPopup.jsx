import React from "react";
import "./TasksPopup.css";
import Task from "../Task/Task"

function TasksPopup(props) {
  const [task, setTask] = React.useState("");

  function handleChangeTask(e) {
    setTask(e.target.value);
  }

  function handleAddTaskSubmit(e) {
    e.preventDefault();

    props.onAddTask({
      task: task,
      checked: false,
      date: props.card.id,
    })

    setTask("")
  }

  return (
    <div className={props.card.id||props.isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть."
          onClick={props.onClose}
        ></button>
        {props.card.id && <h2 className="photo-card__title">{props.card.id}</h2>
        }
        {props.card.id && <form
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
          <button type="submit" className="popup__button_add">
            <span className="visually-hidden">Добавить задачу</span>
          </button>
        </form>}
        <h3 className="tasks__header">{props.card.id ? "Задачи дня:" : "Все задачи"}</h3>
        <div className="tasks">
          {props.card.id ? props.tasksOfDay.map((item) =>
                    (<Task task={item} key={item.id} onTaskDelete={props.onTaskDelete} onTaskDone={props.onTaskDone}/>)
                ): props.tasks.map((item) =>
                  (<Task task={item} key={item.id} onTaskDelete={props.onTaskDelete} onTaskDone={props.onTaskDone}/>)
              )}
        </div>
      </div>
    </div>
  );
}

export default TasksPopup;
