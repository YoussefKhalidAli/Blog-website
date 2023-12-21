import classes from "./addPost.module.css";
import "react-quill/dist/quill.snow.css";

//imported tools
import React, { useState } from "react";
import ReactQuill from "react-quill";
import Alert from "../../UI/errorAlert/Alert";
import { useNavigate } from "react-router";

export default function AddPost() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.set("title", title);
    formdata.set("content", content);
    formdata.set("summary", summary);
    formdata.set("token", token);
    formdata.set("image", image);
    const response = await fetch("/post", {
      method: "POST",
      headers: {
        "x-auth-token": token,
      },
      body: formdata,
    });

    const data = await response.json();
    if (!response.ok) {
      setErrors(data.errors);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={(e) => submitHandler(e)} className={classes.container}>
      <label>title</label>
      <input
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={classes.title}
      ></input>
      <label>summary</label>
      <input
        name="summary"
        onChange={(e) => setSummary(e.target.value)}
        value={summary}
        className={classes.summary}
      ></input>
      <label>image</label>
      <input
        type="file"
        className={classes.image}
        name="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label>content</label>
      <div className={classes.content}>
        <ReactQuill
          name="content"
          style={{ height: "100%" }}
          onChange={(e) => setContent(e)}
          value={content}
          modules={{
            toolbar: [
              [{ header: [] }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["clean"],
              [{ color: [] }, { background: [] }],
              [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" },
              ],
            ],
          }}
        ></ReactQuill>
      </div>
      <button type="Submit">Post</button>
      {errors.length > 0 &&
        errors.map((error) => {
          return <Alert key={error.path} message={error.msg} />;
        })}
    </form>
  );
}
