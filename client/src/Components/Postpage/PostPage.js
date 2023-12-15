//imported tools
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//imported components
import Post from "../Post/post";
import Footer from "../footer/footer";

//redux
import { authActions } from "../../store/store";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const pageNumber = useSelector((state) => state.auth.pageNumber);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`/post/all?page=${pageNumber}`, {
      headers: { "x-auth-token": token },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data[0]);
        dispatch(authActions.setLastPage(Math.ceil(data[1] / 5)));
      });
  }, [dispatch, pageNumber]);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post {...post} key={post._id} />)}
      {posts.length > 0 && <Footer />}
    </>
  );
}
