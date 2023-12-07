import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [token, setToken] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', {
        username,
        password,
        bio,
        profilePicture,
      });
      alert('Registration successful');
    } catch (error) {
      alert(`Registration failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setToken(response.data.token);
      alert('Login successful');
    } catch (error) {
      alert(`Login failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  const handleLoadProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(response.data);
    } catch (error) {
      alert(`Failed to load profile: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  useEffect(() => {
    if (token) {
      handleLoadProfile();
    }
  }, [token]);

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>

      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      {token && (
        <>
          <h2>Profile</h2>
          {userProfile ? (
            <>
              <p>Username: {userProfile.username}</p>
              <p>Bio: {userProfile.bio}</p>
              <img src={userProfile.profilePicture} alt="Profile" />
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
