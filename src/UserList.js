import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://user-auth-backend-qstb.onrender.com/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      setMessage('Failed to fetch users');
    }
  };

  fetchUsers();
}, [token]);


  const deleteUser = async id => {
    try {
      await axios.delete(`https://user-auth-backend-qstb.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setMessage('Failed to delete user');
    }
  };

  return (
    <div>
      <h3>User List</h3>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Action</th></tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{email}</td>
              <td><button className="delete-btn" onClick={() => deleteUser(id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
