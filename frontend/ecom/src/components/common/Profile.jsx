import React, { Fragment } from "react";

const Profile = ({ user }) => {
  const name = user ? user.name : "";
  const email = user ? user.email : "";

  return (
    <Fragment>
      <h1> User Profile Page </h1>

      <ul className="list-group">
        <li className="list-group-item">Name : {name} </li>
        <li className="list-group-item">Email : {email} </li>
      </ul>
    </Fragment>
  );
};

export default Profile;

