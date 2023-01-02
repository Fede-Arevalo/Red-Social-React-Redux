import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import "./Header.scss"

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate("/search/" + text);
    }
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="header">
      <nav>
        <Link to="/">Home</Link>
        <br />
        <input onKeyUp={handleChange} placeholder="search post" name="text" />
        <div>
          {user ? (
            <>
              <Link to="/addPost">Add Post</Link>
              <br />
              <Link to="/profile">{user.user.name}</Link>
              <br />
              <Link to="/" onClick={onLogout}>
                Logout
              </Link>
              <br />
              {user.user.role === "admin" ? <Link to="/admin">Admin</Link> : ""}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <br />
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
