import classes from "../Login/Login.module.css";

//imported tools
import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const changePasswordListener = (event) => {
    setPassword(event.target.value);
  };

  const changeUsernameListener = (event) => {
    setUsername(event.target.value);
  };

  const changeEmailListener = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    localStorage.setItem("token", data.token);

    setPassword("");
    setUsername("");
    setEmail("");
  };

  return (
    <form className={classes.Form} onSubmit={(event) => submitHandler(event)}>
      <h1>Register</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(event) => changeUsernameListener(event)}
      ></input>
      <input
        placeholder="email"
        value={email}
        onChange={(event) => changeEmailListener(event)}
      ></input>
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(event) => changePasswordListener(event)}
      ></input>
      <button type="Submit">Register</button>
    </form>
  );
}
