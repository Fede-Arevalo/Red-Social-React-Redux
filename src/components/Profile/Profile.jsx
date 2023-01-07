import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loggedIn, logout } from "../../features/auth/authSlice";
import { dislike, getAllPosts, like } from "../../features/posts/postsSlice";
import {
  FormOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  CommentOutlined,
  HeartTwoTone,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Spin } from "antd";
import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userInfo } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const { Meta } = Card;

  // const posts = userInfo.postIds;
  const comments = userInfo.commentIds;
  const followers = userInfo.followerIds;
  const following = userInfo.followingIds;

  useEffect(() => {
    dispatch(loggedIn());
    dispatch(getAllPosts());
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return (
      <div className="spiner">
        <Spin size="large" />
      </div>
    );
  }

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  //
  const userPost = posts?.map((post) => {
    const isAlreadyLiked = post.likes_post?.includes(user?.user._id);

    if (userInfo?._id === post?.userId) {
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
                  width="340"
                />
              </Link>
            }
            actions={[
              <>
                {isAlreadyLiked ? (
                  <HeartTwoTone
                    twoToneColor="#eb2f96"
                    onClick={() => dispatch(dislike(post._id))}
                  />
                ) : (
                  <HeartOutlined onClick={() => dispatch(like(post._id))} />
                )}
              </>,
              <CommentOutlined
                onClick={() => navigate(`/addComment/${post._id}`)}
              />,
            ]}
          >
            <Meta
              avatar={
                <Avatar
                  size={40}
                  src={"http://localhost:8080/" + userInfo?.imageUser}
                  alt={userInfo.name}
                />
              }
              title={post.title}
              description=<div className="like">
                <strong>{post.likes_post?.length} Grateful people</strong>
                <span> | {post.commentIds?.length} Comments</span>
              </div>
            />
          </Card>
        </div>
      );
    }
    return <div key={post._id}></div>;
  });

  return (
    <div className="profile">
      <div className="user">
        <Link to={"/UpdateUser/" + userInfo._id}>
          <Avatar
            size={80}
            src={"http://localhost:8080/" + userInfo?.imageUser}
            alt={userInfo.name}
          />
        </Link>
        <p>{userInfo.name}</p>
        <p>{userInfo.age}</p>
        <p>{userInfo.email}</p>
        <p>
          <UsergroupAddOutlined /> {followers?.length}
        </p>
        <p>
          <TeamOutlined /> {following?.length}
        </p>
        <p>
          <FormOutlined /> {posts?.length}
        </p>
        <p>
          <CommentOutlined /> {comments?.length}
        </p>
        <Link to="/" onClick={onLogout}>
          <Button type="primary" block className="logout-profile">
            Log out
          </Button>
        </Link>
      </div>
      {userPost}
    </div>
  );
};

export default Profile;
