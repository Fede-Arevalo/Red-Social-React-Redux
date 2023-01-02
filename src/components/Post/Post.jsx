import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { like, dislike } from "../../features/posts/postsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Card } from "antd";
import "./Post.scss";

const { Meta } = Card;

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const post = posts?.map((post) => {
    const isAlreadyLiked = post.likes_post?.includes(user?.user._id);

    const likes = () => {
      return (
        <>
          <span className="like">Likes: {post.likes_post?.length} </span>
          {isAlreadyLiked ? (
            <HeartFilled onClick={() => dispatch(dislike(post._id))} />
          ) : (
            <HeartOutlined onClick={() => dispatch(like(post._id))} />
          )}
        </>
      );
    };

    return (
      <div key={post._id}>
        <Card
          hoverable
          style={{
            width: 340,
          }}
          cover={
            <Link to={"/post/" + post._id}>
              <img
                src={"http://localhost:8080/" + post.image}
                alt={post.title}
                width="100%"
              />
            </Link>
          }
        >
          <Meta title={post.title} description={likes} />
          <span className="like">Likes: {post.likes_post?.length} </span>
          {isAlreadyLiked ? (
            <HeartFilled onClick={() => dispatch(dislike(post._id))} />
          ) : (
            <HeartOutlined onClick={() => dispatch(like(post._id))} />
          )}
        </Card>
      </div>
    );
  });

  return <div className="post">{post}</div>;
};

export default Post;
