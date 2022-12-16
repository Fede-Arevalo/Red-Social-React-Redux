import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAdmin } from "../../../features/posts/postsSlice";

const PostAdmin = () => {
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const post = posts.map((post) => {
    return (
      <div className="post" key={post._id}>
        <p>{post.title}</p>
        <button onClick={() => dispatch(deletePostAdmin(post._id))}>X</button>
      </div>
    );
  });

  return <div>{post}</div>;
};

export default PostAdmin;
