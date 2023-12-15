import classes from "./Login.module.css";

//imported tools
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/store";

//imported components
import Alert from "../../UI/errorAlert/Alert";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const changePasswordListener = (event) => {
    setPassword(event.target.value);
  };

  const changeUsernameListener = (event) => {
    setUsername(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(authActions.login({ token: data.token }));
      setPassword("");
      setUsername("");
    } else if (response.status === 400) {
      setErrors(data.erros);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    } else {
      setErrors(data);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };
  return (
    <form className={classes.Form} onSubmit={(e) => submitHandler(e)}>
      <h1>Login</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => changeUsernameListener(e)}
      ></input>
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => changePasswordListener(e)}
      ></input>
      <button type="Submit">Login</button>
      {errors.length > 0 &&
        errors.map((error) => {
          return <Alert key={error.path} message={error.msg} />;
        })}
    </form>
  );
}
