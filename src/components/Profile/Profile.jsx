import { Avatar, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import "./Profile.scss";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="profile">
      <div className="user">
        <Avatar size={80} src={"http://localhost:8080/" + user.user.image} />
        <p>{user.user.name}</p>
        <p>{user.user.email}</p>
        <Link to="/" onClick={onLogout}>
          <Button type="primary" block className="logout-profile">
            Log out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
