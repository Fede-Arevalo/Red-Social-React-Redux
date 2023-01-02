import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, reset } from "../../features/posts/postsSlice";
import Post from "../Post/Post";
import "./Posts.scss"

const Posts = () => {
  const { isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  // Función para evitar warning en useEffect
  async function getAllPostsAndReset() {
    await dispatch(getAllPosts());
    dispatch(reset());
  }

  useEffect(() => {
    getAllPostsAndReset();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <h1>Posts are loading</h1>;
  }

  return (
    <div className="posts">
      <h1>Posts</h1>
      <Post />
    </div>
  );
};

export default Posts;
