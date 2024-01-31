import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from './components/AdminNavBar'

export default function AdminHome() {

  useEffect(() => {

  }, [])

  return (
    <div>
      <AdminNavBar />

      <div className="admin-home">
        <div className="admin-home-content">
          <h1>Welcome to Admin Dashboard</h1>
          <p>POS Software ...</p>
        </div>
      </div>
    </div>
  )
}
