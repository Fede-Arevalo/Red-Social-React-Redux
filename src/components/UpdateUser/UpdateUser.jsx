import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, updateUserById } from "../../features/auth/authSlice";
import "./UpdateUser.scss";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { _id } = useParams();

  const initialState = {
    name: `${user.user.name}`,
    email: `${user.user.email}`,
    password: "",
    age: `${user.user.age}`,
    imageUser: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { name, email, password, age, imageUser } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedData = new FormData();
    if (e.target.imageUser.files[0])
      editedData.set("imageUser", e.target.imageUser.files[0]);
    editedData.set("name", e.target.name.value);
    editedData.set("email", e.target.email.value);
    editedData.set("password", e.target.password.value);
    editedData.set("age", e.target.age.value);
    const myObj = { editedData, _id };
    dispatch(updateUserById(myObj));
    navigate("/profile");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setFormData(user);
    dispatch(resetPassword());
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="register">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={onChange}
        />
        <br />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={onChange}
        />
        <br />
        <input type="number" name="age" value={age} onChange={onChange} />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
          required
        />
        <br />
        <input
          type="file"
          name="imageUser"
          value={imageUser || ""}
          onChange={onChange}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
