import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Calendar from "../Calendar/Calendar";
import TasksPopup from "../TasksPopup/TasksPopup";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzgmnyjTOVfd33UNRn4xR0ry77R2I5TFE",
  authDomain: "to-do-889cf.firebaseapp.com",
  projectId: "to-do-889cf",
  storageBucket: "to-do-889cf.appspot.com",
  messagingSenderId: "745513848938",
  appId: "1:745513848938:web:cc2f942b7898eecb51ba13",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [tasksOfDay, setTasksOfDay] = React.useState([]);
  const [errorLogin, setErrorLogin] = React.useState("");
  const [errorRegister, setErrorRegister] = React.useState("");
  const [statusUpdateInfo, setStatusUpdateInfo] = React.useState("");
  const [year, setYear] = React.useState("");
  const [monthNumber, setMonthNumber] = React.useState("");
  const [month, setMonht] = React.useState("");
  const [previousMonth, setPreviousMonht] = React.useState("");
  const [nextMonth, setNextMonht] = React.useState("");
  const date = new Date();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const history = useHistory();
  const location = useLocation();
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  function getDates(y, m) {
    const firstDayOfMonths = new Date(y, m, 1).getDay();
    const lastDateOfMonth = new Date(y, m + 1, 0).getDay();
    const numberOfDaysInMonths = new Date(y, m + 1, 0).getDate();

    const arr = [];
    if (firstDayOfMonths === 0) {
      for (let i = 0; i < 6; i++) {
        const item = new Date(y, m, -i).getDate();
        arr.unshift({
          day: item,
          thisMonth: false,
          id: `${item} ${previousMonth} ${year}`,
        });
      }
    }
    if (firstDayOfMonths !== 1 || 0) {
      for (let i = 0; i < firstDayOfMonths - 1; i++) {
        const item = new Date(y, m, -i).getDate();
        arr.unshift({
          day: item,
          thisMonth: false,
          id: `${item} ${previousMonth} ${year}`,
        });
      }
    }
    for (let i = 1; i <= numberOfDaysInMonths; i++) {
      arr.push({ day: i, thisMonth: true, id: `${i} ${month} ${year}` });
    }

    if (lastDateOfMonth !== 0) {
      for (let i = 1; i <= 7 - lastDateOfMonth; i++) {
        const item = new Date(y, m + 1, i).getDate();
        arr.push({
          day: item,
          thisMonth: false,
          id: `${item} ${nextMonth} ${year}`,
        });
      }
    }
    return arr;
  }

  useEffect(() => {
    setYear(dateYear);
    setMonthNumber(dateMonth);
    setMonht(months[dateMonth]);
    if (monthNumber === 11) {
      setNextMonht(months[0]);
      setPreviousMonht(months[monthNumber - 1]);
    }
    if (monthNumber === 0) {
      setNextMonht(months[monthNumber + 1]);
      setPreviousMonht(months[11]);
    } else {
      setNextMonht(months[monthNumber + 1]);
      setPreviousMonht(months[monthNumber - 1]);
    }
    const newArr = getDates(dateYear, dateMonth);
    setCards(newArr);
  }, []);

  useEffect(() => {
    setMonht(months[monthNumber]);
    if (monthNumber === 11) {
      setNextMonht(months[0]);
      setPreviousMonht(months[monthNumber - 1]);
    }
    if (monthNumber === 0) {
      setNextMonht(months[monthNumber + 1]);
      setPreviousMonht(months[11]);
    } else {
      setNextMonht(months[monthNumber + 1]);
      setPreviousMonht(months[monthNumber - 1]);
    }
  }, [monthNumber]);

  useEffect(() => {
    const newArr = getDates(year, monthNumber);
    setCards(newArr);
  }, [month]);

  function handleLogin(email, password) {
    return db
      .collection("users")
      .where("userEmail", "==", email)
      .where("userPassword", "==", password)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (!doc) return;
          const data = doc.data();
          const user = {
            id: doc.id,
            name: data["userName"],
            email: data["userEmail"],
            password: data["userPassword"],
          };
          setCurrentUser(user);
          setLoggedIn(true);
          localStorage.setItem("userID", doc.id);
          history.push("/calendar");
        });
      })
      .catch((err) => {
        setErrorLogin(err);
        return false;
      });
  }

  function handleRegister(name, email, password) {
    return db
      .collection("users")
      .where("userEmail", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc) {
            setErrorRegister("Пользователь с таким Email зарегистрирован");
            return;
          }
        });
      })
      .then(() => {
        return db
          .collection("users")
          .add({
            userName: name,
            userEmail: email,
            userPassword: password,
          })
          .then((res) => {
            if (!res) return;
            handleLogin(email, password);
            console.log("Document written with ID: ", res.id);
            return true;
          })
          .catch((err) => {
            setErrorRegister(err);
            return false;
          });
      });
  }

  useEffect(() => {
    function tokenCheck() {
      if (!localStorage.getItem("userID")) return;

      const userID = localStorage.getItem("userID");

      db.collection("users")
        .doc(userID)
        .get()
        .then((res) => {
          if (!res) return;
          const data = res.data();
          const user = {
            id: res.id,
            name: data["userName"],
            email: data["userEmail"],
            password: data["userPassword"],
          };
          setCurrentUser(user);
          setLoggedIn(true);
          history.push("/calendar");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    tokenCheck();
  }, []);

  useEffect(() => {
    getTasks();
  }, [currentUser]);

  useEffect(() => {
    if (location.pathname !== "/profile") {
      setStatusUpdateInfo("");
      return;
    }
    if (location.pathname !== "/signup") {
      setErrorRegister("");
      return;
    }
    if (location.pathname !== "/signin") {
      setErrorLogin("");
      return;
    } else return;
  }, [location]);

  function handleEditUserInfo(name, email) {
    var batch = db.batch();
    var newData = db.collection("users").doc(currentUser.id);
    batch.update(newData, { userName: name, userEmail: email });

    batch
      .commit()
      .then((res) => {
        if (!res) return;
        const data = res.data();
        const user = {
          id: res.id,
          name: data["userName"],
          email: data["userEmail"],
          password: data["userPassword"],
        };
        setCurrentUser(user);
        setStatusUpdateInfo("Данные успешно обновлены");
      })
      .catch((err) => {
        setStatusUpdateInfo(err);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    setCurrentUser({});
    history.push("/");
  }

  function handleNextMonth() {
    setCards([]);
    if (monthNumber === 11) {
      setMonthNumber(0);
      setYear(year + 1);
    } else {
      setMonthNumber(monthNumber + 1);
    }
  }

  function handlePreviousMonth() {
    setCards([]);
    if (monthNumber === 0) {
      setMonthNumber(11);
      setYear(year - 1);
    } else {
      setMonthNumber(monthNumber - 1);
    }
  }

  function closePopup() {
    setSelectedCard({});
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function handleAddTask(info) {
    const arr = tasks;
    db.collection("users")
      .doc(currentUser.id)
      .collection("tasks")
      .add(info)
      .then((doc) => {
        db.collection("users")
          .doc(currentUser.id)
          .collection("tasks")
          .doc(doc.id)
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.data();
            const newTask = {
              id: querySnapshot.id,
              task: data["task"],
              checked: data["checked"],
              date: data["date"],
            };
            arr.push(newTask);
          })
          .then(() => {
            setTasks(arr);
            getTasksOfDay();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTasks() {
    const arr = [];

    db.collection("users")
      .doc(currentUser.id)
      .collection("tasks")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const newTask = {
            id: doc.id,
            task: data["task"],
            checked: data["checked"],
            date: data["date"],
          };
          arr.push(newTask);
        });
      })
      .then(() => {
        setTasks(arr);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  function getTasksOfDay() {
    const arr = tasks.filter(function (item) {
      return item.date === selectedCard.id;
    });

    setTasksOfDay(arr);
  }

  useEffect(() => {
    getTasksOfDay();
  }, [selectedCard, tasks]);

  useEffect(() => {
    function tokenCheck() {
      if (!localStorage.getItem("userID")) return;

      const userID = localStorage.getItem("userID");

      db.collection("users")
        .doc(userID)
        .get()
        .then((res) => {
          if (!res) return;
          const data = res.data();
          const user = {
            id: res.id,
            name: data["userName"],
            email: data["userEmail"],
            password: data["userPassword"],
          };
          setCurrentUser(user);
          setLoggedIn(true);
          history.push("/calendar");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    tokenCheck();
  }, []);

  function handleTaskDelete(task) {
    db.collection("users")
      .doc(currentUser.id)
      .collection("tasks")
      .doc(task.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
      })
      .catch((error) => {
        console.log("Error removing document: ", error);
      });
  }

  function handleTaskDone(task) {
    if (!task.checked) {
      db.collection("users")
        .doc(currentUser.id)
        .collection("tasks")
        .doc(task.id)
        .update({
          checked: true,
        })
        .then(() => {
          console.log("Document successfully updated!");
          const newTask = {
            id: task.id,
            task: task.task,
            checked: true,
            date: task.date,
          };
          setTasks((tasks) =>
            tasks.map((t) => (t.id === task.id ? newTask : t))
          );
        })
        .catch((error) => {
          console.log("Error updating document: ", error);
        });
    } else {
      db.collection("users")
        .doc(currentUser.id)
        .collection("tasks")
        .doc(task.id)
        .update({
          checked: false,
        })
        .then(() => {
          console.log("Document successfully updated!");
          const newTask = {
            id: task.id,
            task: task.task,
            checked: false,
            date: task.date,
          };
          setTasks((tasks) =>
            tasks.map((t) => (t.id === task.id ? newTask : t))
          );
        })
        .catch((error) => {
          console.log("Error updating document: ", error);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute path="/calendar" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <main>
              <Calendar
                onSelectedCard={handleCardClick}
                cards={cards}
                month={month}
                year={year}
                onNextMonth={handleNextMonth}
                onPreviousMonth={handlePreviousMonth}
              />
            </main>
            <Footer />
            <TasksPopup
              card={selectedCard}
              onClose={closePopup}
              onAddTask={handleAddTask}
              tasks={tasksOfDay}
              onTaskDelete={handleTaskDelete}
              onTaskDone={handleTaskDone}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <main>
              <Profile
                onLogout={handleLogout}
                onEditInfo={handleEditUserInfo}
                message={statusUpdateInfo}
              />
            </main>
          </ProtectedRoute>

          <Route path="/signup">
            <Register onRegister={handleRegister} error={errorRegister} />
          </Route>
          {
            <Route path="/signin">
              <Login onLogin={handleLogin} error={errorLogin} />
            </Route>
          }

          <Route path="*">
            <NotFound loggedIn={loggedIn} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
