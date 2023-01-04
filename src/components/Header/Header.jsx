import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logotipo-g-free.png";
import "./Header.scss";
import { Input } from "antd";

const { Search } = Input;

const Header = () => {

  const navigate = useNavigate();

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate("/search/" + text);
    }
  };

  return (
    <div className="header">
      <nav>
      <Link to="/">
        <img src={Logo} alt="Logo-G-free" className="logo" />
        </Link>
        <Search
          placeholder="search post"
          onKeyUp={handleChange}
          style={{
            width: 200,
          }}
        />
      </nav>
    </div>
  );
};

export default Header;
