import classes from "./post.module.css";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { format } from "date-fns";
function Post({ title, summary, createdAt, username, user, _id, image }) {
  let path = String(image);
  path = path.split("\\")[1];
  const date = format(new Date(createdAt), "d/MM/yy, h:mm a");
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div
        className={classes.image}
        onClick={(_Id) => {
          navigate(`/post/${_id}`);
        }}
      >
        <img alt="alt" src={`http://localhost:4000/images/${path}`} />
      </div>
      <div className={classes.txtContainer}>
        <h3
          className={classes.title}
          onClick={(_Id) => {
            navigate(`/post/${_id}`);
          }}
        >
          {title}
        </h3>
        <div className={classes.details}>
          <Link to={`/${user}`} className={classes.author}>
            {username}
          </Link>
          <time>{date}</time>
        </div>
        <p
          className={classes.summary}
          onClick={(_Id) => {
            navigate(`/post/${_id}`);
          }}
        >
          {summary}
        </p>
      </div>
    </div>
  );
}

export default Post;
