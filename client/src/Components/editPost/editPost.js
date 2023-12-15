import classes from "./editPost.module.css";

//imported tools
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router";

export default function EditPost() {
  const token = localStorage.getItem("token");
  const { post_id } = useParams("");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    fetch(`/post/inner/${post_id}`, { headers: { "x-auth-token": token } })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setSummary(data.summary);
      });
  }, [post_id, token]);

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.set("title", title);
    formdata.set("content", content);
    formdata.set("summary", summary);
    formdata.set("token", token);
    if (image) {
      formdata.set("image", image);
    }
    const response = await fetch(`/post/${post_id}`, {
      method: "POST",
      headers: {
        "x-auth-token": token,
      },
      body: formdata,
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data);
    } else {
      navigate(`/post/${post_id}`);
    }
  };
  return (
    <form onSubmit={(e) => submitHandler(e)} className={classes.container}>
      <label>title</label>
      <input
        name="title"
        onChange={(e) => titleChange(e)}
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
      <label>
        image
        <br></br> (please insert new image if you wish to change it)
      </label>
      <input
        type="file"
        className={classes.image}
        name="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label>content</label>
      <ReactQuill
        name="content"
        onChange={(e) => setContent(e)}
        className={classes.content}
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
      <br></br>
      <button type="Submit">Post</button>
    </form>
  );
}
