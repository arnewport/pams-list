import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { fetchUnverifiedUsers, verifyUser, deleteUser } from '../services/userService';
import ToastMessage from './ToastMessage';

const VerifyUsersModal = ({ show, handleClose }) => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (show) {
      fetchUnverifiedUsers().then(users => setUnverifiedUsers(users));
    }
  }, [show]);

  const handleVerifyUser = async (userId) => {
    try {
      await verifyUser(userId);
      setUnverifiedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setToastMessage('User verified successfully!');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Failed to verify user.');
      setShowToast(true);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUnverifiedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setToastMessage('User removed successfully!');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Failed to remove user.');
      setShowToast(true);
    }
  };

  return (
    <>
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
      <ToastMessage show={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    </>
  );
};

export default VerifyUsersModal;
