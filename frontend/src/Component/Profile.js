// src/components/Profile.js
import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <img src={user.profilePicture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <button>Like</button>
      <button>Dislike</button>
    </div>
  );
};

export default Profile;
