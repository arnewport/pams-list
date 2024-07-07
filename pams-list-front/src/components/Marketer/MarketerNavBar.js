import React from 'react';
import { NavLink } from 'react-router-dom';

const MarketerNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/marketer/view-patients">View Patients</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/marketer/my-selected-patients">My Selected Patients</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/marketer/my-accepted-patients">My Accepted Patients</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MarketerNavBar;
