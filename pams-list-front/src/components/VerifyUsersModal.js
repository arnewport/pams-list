import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { fetchUnverifiedUsers, verifyUser, deleteUser } from '../services/userService';

const VerifyUsersModal = ({ show, handleClose }) => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);

  useEffect(() => {
    if (show) {
      fetchUnverifiedUsers().then(users => setUnverifiedUsers(users));
    }
  }, [show]);

  const handleVerifyUser = async (userId) => {
    try {
      await verifyUser(userId);
      setUnverifiedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      alert('Failed to verify user.');
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUnverifiedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      alert('Failed to remove user.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" fullscreen>
      <Modal.Header>
        <Modal.Title>Verify Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {unverifiedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <Button variant="success" className="me-2" onClick={() => handleVerifyUser(user.id)}>Verify</Button>
                  <Button variant="danger" className="me-2" onClick={() => handleRemoveUser(user.id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="me-2" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerifyUsersModal;
