import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    image: "",
  });

  const { name, email, password, age, image } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={name} placeholder="name" onChange={onChange} />
      <input type="email" name="email" value={email} placeholder="email" onChange={onChange} />
      <input type="password" name="password" value={password} placeholder="password" onChange={onChange} />
      <input type="number" name="age" value={age} onChange={onChange} />
      <input type="file" name="image" value={image} onChange={onChange} />
    </form>
  );
};

export default Register;
