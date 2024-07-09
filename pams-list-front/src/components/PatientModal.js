import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PatientModal = ({ show, handleClose, patient }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Patient Details: {patient.firstName} {patient.lastName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Sex:</strong> {patient.sex}</p>
        <p><strong>Ready for Discharge:</strong> {patient.readyForDischarge ? 'Yes' : 'No'}</p>
        <p><strong>Medicare:</strong> {patient.medicare ? 'Yes' : 'No'}</p>
        <p><strong>MediCal:</strong> {patient.mediCal ? 'Yes' : 'No'}</p>
        <p><strong>Medicare Plan:</strong> {patient.medicarePlan}</p>
        <p><strong>MediCal Plan:</strong> {patient.mediCalPlan}</p>
        <p><strong>HMO:</strong> {patient.hmo ? 'Yes' : 'No'}</p>
        <p><strong>PPO:</strong> {patient.ppo ? 'Yes' : 'No'}</p>
        <p><strong>VA:</strong> {patient.va ? 'Yes' : 'No'}</p>
        <p><strong>LOA Available:</strong> {patient.loaAvailable ? 'Yes' : 'No'}</p>
        <p><strong>ALW:</strong> {patient.alw ? 'Yes' : 'No'}</p>
        <p><strong>Subacute:</strong> {patient.subacute ? 'Yes' : 'No'}</p>
        <p><strong>ISO:</strong> {patient.iso ? 'Yes' : 'No'}</p>
        <p><strong>Requires Locked:</strong> {patient.requiresLocked ? 'Yes' : 'No'}</p>
        <p><strong>Patient Notes:</strong> {patient.patientNotes}</p>
        <p><strong>Date of Hospital Admission:</strong> {new Date(patient.dateOfHospitalAdmission).toLocaleDateString()}</p>
        <p><strong>Date Added to Pam List:</strong> {new Date(patient.dateAddedToPamList).toLocaleDateString()}</p>
        {/* Add more fields as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Send Email</Button> {/* Placeholder for future functionality */}
        <Button variant="primary">Send Fax</Button> {/* Placeholder for future functionality */}
      </Modal.Footer>
    </Modal>
  );
};

export default PatientModal;
