import classes from "./App.module.css";

// imported tools
import { Route, Routes, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// imported Components
import Layout from "./Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AddPost from "./Components/addPost/post";
import PostPage from "./Components/Postpage/PostPage";
import AuthorPosts from "./Components/AuthorPosts/AuthorPosts";
import Content from "./Components/Content/Content";
import { useEffect } from "react";
import { authActions } from "./store/store";
import EditPost from "./Components/editPost/editPost";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      fetch("/login/validate", {
        method: "POST",
        headers: { token: token },
      }).then((response) => {
        if (response.status === 200) {
          dispatch(authActions.login({ token }));
        } else {
          dispatch(authActions.logout());
        }
        response.json().then((data) => {
          if (isLoggedIn === true) {
            dispatch(authActions.setInfo({ data }));
          }
        });
      });
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch, token, isLoggedIn]);
  return (
    <div className={classes.background}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={!isLoggedIn ? <Navigate to="/login" /> : <PostPage />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/post"
            element={!isLoggedIn ? <Navigate to="/login" /> : <AddPost />}
          />
          <Route
            path="/post/edit/:post_id"
            element={!isLoggedIn ? <Navigate to="/login" /> : <EditPost />}
          />
          <Route
            path="/:author_id"
            element={
              !isLoggedIn ? (
                <Navigate to="/login" />
              ) : (
                <AuthorPosts token={token} />
              )
            }
          />
          <Route
            path="/post/:post_id"
            element={
              !isLoggedIn ? <Navigate to="/login" /> : <Content token={token} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
