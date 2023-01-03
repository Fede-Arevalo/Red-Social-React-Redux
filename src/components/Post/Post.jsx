import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { like, dislike } from "../../features/posts/postsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import "./Post.scss";
import { CommentOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

 

  const dispatch = useDispatch();

  const post = posts?.map((post) => {
    const isAlreadyLiked = post.likes_post?.includes(user?.user._id);
    console.log(post)
    return (
      <div key={post._id}>
        <Card
          hoverable
          style={{ width: 340 }}
          cover={
            <Link to={"/post/" + post._id}>
              <img
                src={"http://localhost:8080/" + post.image}
                alt={post.title}
                width="100%"
              />
            </Link>
          }
          actions={[
            <>
              {isAlreadyLiked ? (
                <HeartFilled onClick={() => dispatch(dislike(post._id))} />
              ) : (
                <HeartOutlined onClick={() => dispatch(like(post._id))} />
              )}
            </>,
            <CommentOutlined />,
          ]}
        >
          <Meta
            avatar={<Avatar src={user.user.image} />}
            title={post.title}
            description=<div className="like">
              {post.likes_post?.length} Grateful people
            </div>
          />
        </Card>
      </div>
    );
  });

  return <div className="post">{post}</div>;
};

export default Post;
