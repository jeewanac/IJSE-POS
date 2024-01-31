import React, { useEffect, useState } from 'react'
import AdminNavBar from './components/AdminNavBar'
import { useNavigate } from 'react-router-dom';
import './Admin.css'
import axios from 'axios';


export default function AdminCustomer() {

  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);

    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }


  return (
    <div>
      <AdminNavBar />
      <br />
      <h2>System Users</h2>
      <br />
      {users && users.length > 0 && (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {users.map((user) => (
            <tbody>
              <tr key={user.id}>
                <th >{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><button className='btn btn-danger' onClick={() => (deleteUser(user.id))}>Delete</button></td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  )
}
