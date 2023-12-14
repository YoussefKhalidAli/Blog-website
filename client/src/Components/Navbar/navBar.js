import classes from "./navBar.module.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/store";

export default function NavBar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <div className={classes.navBar}>
      <Link className={classes.mainLink} to={isLoggedIn ? "/" : "/login"}>
        MyBlog
      </Link>
      <div>
        {isLoggedIn ? (
          <div className={classes.links}>
            <Link
              href="/login"
              onClick={() => {
                dispatch(authActions.logout());
              }}
              className={classes.secondary}
            >
              logout
            </Link>
            <Link className={classes.secondary} to="/post">
              post
            </Link>
          </div>
        ) : (
          <>
            <Link className={classes.secondary} to={"/login"}>
              Login
            </Link>
            <Link className={classes.secondary} to={"/register"}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
