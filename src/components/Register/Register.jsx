import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
    age: 0,
    imageUser: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { name, email, password, password2, age, imageUser } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: `Welcome! ${name}`,
        description: "Successfully registered",
      });
      navigate("/login");
    }
    if (isError) {
      notification.error({ message: "Error register", description: message });
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
      notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
    } else {
      const formData = new FormData();
      if (e.target.imageUser.files[0])
        formData.set("imageUser", e.target.imageUser.files[0]);
      formData.set("name", e.target.name.value);
      formData.set("email", e.target.email.value);
      formData.set("password", e.target.password.value);
      formData.set("age", e.target.age.value);
      dispatch(register(formData));
      setFormData(initialState);
    }
  };

  return (
    <div className="register">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChange}
        />
        <br />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="E-mail"
          onChange={onChange}
        />
        <br />
        <input type="number" name="age" value={age} onChange={onChange} />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
        />
        <br />
        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="Confirm password"
          onChange={onChange}
        />
        <br />
        <input
          type="file"
          name="imageUser"
          value={imageUser}
          onChange={onChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
