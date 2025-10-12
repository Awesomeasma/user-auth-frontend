import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setToken, setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('https://user-auth-backend-qstb.onrender.com/signup', { name, email, password });
      alert('Signup successful! Please login.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
