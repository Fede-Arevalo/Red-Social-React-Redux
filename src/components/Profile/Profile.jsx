import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <>
      <h1>Profile</h1>
      <center>
        <img
          src={"http://localhost:8080/" + user.user.image}
          alt={user.user.name}
          width="100px"
        />
      </center>

      <p>{user.user.name}</p>
      <p>{user.user.email}</p>
    </>
  );
};

export default Profile;
