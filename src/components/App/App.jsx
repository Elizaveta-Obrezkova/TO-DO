import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
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
  /* const [tasks, setTasks] = React.useState([]); */
  const [errorLogin, setErrorLogin] = React.useState("");
  const [errorRegister, setErrorRegister] = React.useState("");
  const [statusUpdateInfo, setStatusUpdateInfo] = React.useState("");

  const history = useHistory();
  const location = useLocation();

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

      batch.commit().then((res) => {
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
            {<main></main>}
            <Footer />
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
