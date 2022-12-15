import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    age: 0,
    image: "",
  });

  const { name, email, password, password2, age, image } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: `Welcome! ${name}`,
        description: "Successfully registered",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isSuccess, isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
    } else {
      dispatch(register(formData));
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={onChange}
        />
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
        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="repeat password"
          onChange={onChange}
        />
        <input type="number" name="age" value={age} onChange={onChange} />
        <input type="file" name="image" value={image} onChange={onChange} />

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
