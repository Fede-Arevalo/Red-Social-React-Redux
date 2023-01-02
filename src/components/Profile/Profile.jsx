import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
console.log(user)
  return (
    <>
      <h1>Profile</h1>
      <p>{user.user.name}</p>
      <p>{user.user.email}</p>
    </>
  );
};

export default Profile;
