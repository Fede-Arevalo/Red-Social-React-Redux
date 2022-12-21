import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { like, dislike } from "../../features/posts/postsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const post = posts?.map((post) => {
    const isAlreadyLiked = post.likes_post?.includes(user?.user._id);

    return (
      <div className="post" key={post._id}>
        <Link to={"/post/" + post._id}>
          <h2>{post.title}</h2>
          <img src={"http://localhost:8080/" + post.image} alt={post.title} width="290px"/>
        </Link>
        <br/>
        <span className="like">Likes: {post.likes_post?.length} </span>
        {isAlreadyLiked ? (
          <HeartFilled onClick={() => dispatch(dislike(post._id))} />
        ) : (
          <HeartOutlined onClick={() => dispatch(like(post._id))} />
        )}
      </div>
    );
  });
  return <div>{post}</div>;
};

export default Post;
