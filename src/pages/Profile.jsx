import React, { useContext } from "react";
import { Context } from "..";

const Profile = () => {
  const { isAuthenticated, user } = useContext(Context);
  return isAuthenticated ? (
    <div>
      <h1>{`Welcome Back - ${user?.name} 😊`}</h1>
      <h1>{`Name - ${user?.name}`}</h1>
      <h3>{`Email - ${user?.email}`}</h3>
    </div>
  ) : (
    <h1>Please Login To See Profile</h1>
  );
};

export default Profile;
