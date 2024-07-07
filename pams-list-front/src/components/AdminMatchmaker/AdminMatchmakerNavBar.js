import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMatchmakerNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/view">View</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/add-patients">Add Patients</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/confirm-acceptances">Confirm Acceptances</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/patient-archive">Patient Archive</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/verify-users">Verify Users</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminMatchmakerNavBar;
