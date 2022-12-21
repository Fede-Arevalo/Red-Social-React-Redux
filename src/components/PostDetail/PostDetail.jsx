import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../features/posts/postsSlice";

const PostDetail = () => {
  const { _id } = useParams();
  const { post } = useSelector((state) => state.posts);

  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(_id));
    // eslint-disable-next-line
  }, []);

  
  return (
    <div>
      <h1>PostDetail</h1>      
      <img src={"http://localhost:8080/" + post.image} alt={post.title} width="490px"/>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetail;
