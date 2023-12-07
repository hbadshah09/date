// src/components/MatchList.js
import React from 'react';
import Profile from './Profile';

const MatchList = ({ matches }) => {
  return (
    <div className="match-list">
      {matches.map((user) => (
        <Profile key={user.id} user={user} />
      ))}
    </div>
  );
};

export default MatchList;
