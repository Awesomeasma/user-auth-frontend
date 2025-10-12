import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';
import UserList from './UserList';
import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [token, user]);

  if (!token) {
    return (
      <div className="container">
        <div className="card">
          <h2>Signup</h2>
          <Signup setToken={setToken} setUser={setUser} />
        </div>
        <div className="card">
          <h2>Login</h2>
          <Login setToken={setToken} setUser={setUser} />
        </div>
      </div>
    );
  }

  return (
    <div className="logged-in-container">
      <button onClick={logout} className="logout-btn">Logout</button>
      <h2>Welcome, {user.name}</h2>
      <UserList token={token} />
    </div>
  );
}

export default App;
