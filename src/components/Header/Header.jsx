import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate("/search/" + text)
    }
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav>
      <span>
        <Link to="/">Home</Link>
      </span>
      <br />
      <input onKeyUp={handleChange} placeholder="search post" name="text" />
      <div>
        {user ? (
          <>
            <span>
              <Link to="/profile">{user.user.name}</Link>
            </span>
            <br />
            <span>
              <Link to="/" onClick={onLogout}>
                Logout
              </Link>
            </span>
            <br />
          </>
        ) : (
          <>
            <span>
              <Link to="/login">Login</Link>
            </span>
            <br />
            <span>
              <Link to="/register">Register</Link>
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
