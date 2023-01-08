import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/isologo-g-free.png";
import "./Header.scss";
import { Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";

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

  const history = useNavigate();

  return (
    <div className="header">
      <nav>
        <LeftOutlined className="back" onClick={() => history(-1)} />
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
