import classes from "./Content.module.css";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { authActions } from "../../store/store";

export default function Content() {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.auth.info);
  const isAuthor = useSelector((state) => state.auth.isAuthor);
  const token = localStorage.getItem("token");
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  useEffect(() => {
    fetch(`/post/inner/${post_id}`, { headers: { "x-auth-token": token } })
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        if (info.id === data.user) {
          dispatch(authActions.checkAuthour(true));
        } else {
          dispatch(authActions.checkAuthour(false));
        }
      });
  }, [post_id, setPost, token, info, dispatch]);
  const deletePost = async () => {
    const response = await fetch(`/post/${post_id}`, {
      method: "DELETE",
      headers: { "x-auth-token": token },
    });
    if (response.status === 200) {
      navigate("/");
    }
  };
  return (
    <>
      {post && (
        <div className={classes.page}>
          <div className={classes.title}>{post.title}</div>
          <div className={classes.image}>
            {post && (
              <img
                className={classes.img}
                alt="alt"
                src={`http://localhost:4000/images/${
                  String(post.image).split("\\")[1]
                }`}
              />
            )}
          </div>
          {isAuthor && (
            <>
              <div className={classes.actions}>
                <Link to={`/post/edit/${post_id}`} className={classes.edit}>
                  edit
                </Link>
                <button onClick={deletePost}>delete</button>
              </div>
            </>
          )}
          {post && (
            <ReactQuill
              modules={{ toolbar: false }}
              className={classes.content}
              value={post.content}
              readOnly={true}
            />
          )}
        </div>
      )}
    </>
  );
}
