import classes from "./Alert.module.css";

import React from "react";

export default function Alert({ message }) {
  return <div className={classes.container}>{message}</div>;
}
