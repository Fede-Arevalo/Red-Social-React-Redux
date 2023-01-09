import { Avatar, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../features/posts/postsSlice";
import "./PostDetail.scss";

const PostDetail = () => {
  const { _id } = useParams();
  const { post } = useSelector((state) => state.posts);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(_id));
    // eslint-disable-next-line
  }, []);

  if (!post.commentIds) {
    return (
      <div className="spiner">
        <Spin size="large" />
      </div>
    );
  }

  const comments = post.commentIds.map((comment) => {
    return (
      <div key={comment._id}>
        <p>{comment.comment}</p>
      </div>
    );
  });

  return (
    <div className="postDetail">
      <div className="user">
        <Avatar
          size={35}
          src={"http://localhost:8080/" + post.userId?.imageUser}
          alt={post.userId?.name}
        />
        <p>{post.userId?.name}</p>
      </div>
      <div className="imagePost">
        <img
          src={"http://localhost:8080/" + post.image}
          alt={post.title}
          width="100%"
        />
      </div>
      <div className="icons">
        <button onClick={() => navigate(`/addComment/${_id}`)}>
          Add Comment
        </button>
      </div>
      <div className="body">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
      <h2>Comments</h2>
      {comments}
    </div>
  );
};

export default PostDetail;
