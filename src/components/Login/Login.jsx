import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { notification, Button, Form, Input } from "antd";
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: "Login Success!", description: message });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isError, isSuccess, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const onSubmit = (e) => {
  //   console.log(e);
  //   e.preventDefault();
  //   dispatch(login(formData));
  // };

  const onFinish = () => {
    dispatch(login(formData))
  };

  return (
    <div className="login">
      {/* <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form> */}

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <p>
          You don't have an account? <a href="/register">Sign up!</a>
        </p>
      </Form>
    </div>
  );
};

export default Login;
