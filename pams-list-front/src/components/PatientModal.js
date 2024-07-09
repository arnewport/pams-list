import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { archivePatient } from '../services/patientService';

const PatientModal = ({ show, handleClose, patient, onArchive }) => {
  const calculateLengthOfStay = (dateOfHospitalAdmission) => {
    const today = new Date();
    const admissionDate = new Date(dateOfHospitalAdmission);
    const differenceInTime = today - admissionDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  const handleArchive = async () => {
    try {
      await archivePatient(patient.id);
      onArchive(patient.id);
      handleClose();
    } catch (error) {
      console.error('Error archiving the patient:', error);
      alert('Error archiving the patient: ' + error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Patient Details: {patient.firstName} {patient.lastName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {patient.id}</p>
        <p><strong>First Name:</strong> {patient.firstName}</p>
        <p><strong>Last Name:</strong> {patient.lastName}</p>
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
        <p><strong>Date Placed or Withdrawn:</strong> {new Date(patient.datePlacedOrWithdrawn).toLocaleDateString()}</p>
        <p><strong>Total Interested:</strong> {patient.totalInterested}</p>
        <p><strong>Total Rejected:</strong> {patient.totalRejected}</p>
        <p><strong>Manager ID:</strong> {patient.managerId}</p>
        <p><strong>Manager Organization ID:</strong> {patient.managerOrganizationId}</p>
        <p><strong>Marketer ID:</strong> {patient.marketerId}</p>
        <p><strong>Marketer Organization ID:</strong> {patient.marketerOrganizationId}</p>
        <p><strong>Patient Status:</strong> {patient.patientStatus}</p>
        <p><strong>Tracking Status:</strong> {patient.trackingStatus}</p>
        <p><strong>Expected SNF Discharge Type:</strong> {patient.expectedSnfDischargeType}</p>
        <p><strong>Archived:</strong> {patient.archived ? 'Yes' : 'No'}</p>
        <p><strong>Length of Stay (days):</strong> {calculateLengthOfStay(patient.dateOfHospitalAdmission)}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="warning">Edit Patient</Button> {/* Placeholder for Edit Patient functionality */}
        <Button variant="danger" onClick={handleArchive}>Remove Patient</Button> {/* Placeholder for Remove Patient functionality */}
      </Modal.Footer>
    </Modal>
  );
};

export default PatientModal;
