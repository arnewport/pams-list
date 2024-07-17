import React from 'react';

const ManagerNavBar = ({ onOpenAddModal, setViewMode }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button className="nav-link btn" onClick={() => setViewMode('all')}>View Patients</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={() => setViewMode('added')}>My Added Patients</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={onOpenAddModal}>Add Patients</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ManagerNavBar;
