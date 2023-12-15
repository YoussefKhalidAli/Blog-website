import React, { useState, useEffect } from "react";

//imported tools
import { useParams } from "react-router";

//imported components
import Post from "../Post/post";

export default function AuthorPosts({ token }) {
  const { author_id } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`/post/${author_id}`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, [author_id, token]);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
}
