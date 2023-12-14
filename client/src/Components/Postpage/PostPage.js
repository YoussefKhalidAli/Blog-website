import React, { useState, useEffect } from "react";
import Post from "../Post/post";
import Footer from "../footer/footer";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/post/all", {
      headers: { "x-auth-token": token },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post {...post} key={post._id} />)}
      {posts.length > 0 && <Footer />}
    </>
  );
}
