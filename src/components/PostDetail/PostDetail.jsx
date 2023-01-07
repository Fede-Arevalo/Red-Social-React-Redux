import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../features/posts/postsSlice";
import "./PostDetail.scss"

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
      <img
        src={"http://localhost:8080/" + post.image}
        alt={post.title}
        width="100%"
      />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={() => navigate(`/addComment/${_id}`)}>
        Add Comment
      </button>
      {comments}
    </div>
  );
};

export default PostDetail;
