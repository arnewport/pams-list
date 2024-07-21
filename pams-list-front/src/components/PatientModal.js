import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { archivePatient, updatePatient } from '../services/patientService';
import { checkMarketerInterest, createMarketerInterest, acceptMarketerInterest, rejectMarketerInterest } from '../services/marketerInterestService';
import { fetchUserById } from '../services/dataService';
import { composeAndSendInterestEmail, composeAndSendAcceptEmail } from '../services/emailService';

const url = process.env.REACT_APP_API_URL;

const PatientModal = ({ show, handleClose, patient, onArchive, onUpdate, userRole, userId }) => {
  const [editablePatient, setEditablePatient] = useState({ ...patient });
  const [isEditing, setIsEditing] = useState(false);
  const [marketerInterest, setMarketerInterest] = useState(null);
  const [marketerInterests, setMarketerInterests] = useState([]);
  const [isAcceptedByAnother, setIsAcceptedByAnother] = useState(false);


  useEffect(() => {
      if (userRole === 'marketer') {
          checkMarketerInterest(userId, patient.id).then(response => {
              if (response) {
                  setMarketerInterest(response.data);
              } else {
                  console.log("No marketer interest found for this patient.");
                  setMarketerInterest(null);
              }
          }).catch(error => {
              console.error("Error checking marketer interest:", error);
          });
      }
  }, [userId, patient.id, userRole]);

  useEffect(() => {
    if (userRole === 'marketer' && marketerInterest) {
      const fetchMarketerInterests = async () => {
        try {
          const response = await fetch(`${url}api/marketer-interest/patient/${patient.id}/status`);
          if (response.ok) {
            const data = await response.json();
            setMarketerInterests(data);
  
            const acceptedInterest = data.find(interest => interest.status === 'accepted' && interest.marketerId !== userId);
            if (acceptedInterest) {
              setIsAcceptedByAnother(true);
              alert("This patient was accepted by another user. You cannot accept the patient at this time. If the patient is placed, this patient will be removed from your list. If the placement does not occur, then you will be able to accept the patient again.");
            } else if (data.some(interest => interest.status === 'accepted' && interest.marketerId === userId)) {
              alert("You have accepted this patient. Let Pam will remove this patient from your list once their placement has been confirmed.");
            }
  
          } else {
            setMarketerInterests([]);
          }
        } catch (error) {
          console.error('Error fetching marketer interests:', error);
        }
      };
  
      fetchMarketerInterests();
    }
  }, [userRole, marketerInterest, patient.id, userId]);


  const calculateLengthOfStay = (dateOfHospitalAdmission) => {
    const today = new Date();
    const admissionDate = new Date(dateOfHospitalAdmission);
    const differenceInTime = today - admissionDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  const handleArchive = async () => {
    if (isEditing) {
      try {
        const updatedPatient = await updatePatient(patient.id, editablePatient);
        onUpdate(updatedPatient);
      } catch (error) {
        console.error('Error updating the patient:', error);
        alert('Failed to update the patient. Please try again.');
        return;
      }
    }
    try {
      await archivePatient(patient.id);
      onArchive(patient.id);
      handleClose();
    } catch (error) {
      console.error('Error archiving the patient:', error);
      alert('Error archiving the patient: ' + error);
    }
  };
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedPatient = await updatePatient(patient.id, editablePatient);
      onUpdate(updatedPatient);
      setIsEditing(false);
      handleClose();
    } catch (error) {
      console.error('Error updating the patient:', error);
      alert('Failed to update the patient. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditablePatient((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value === '' ? null : value,
    }));
  };

  const handleInterested = async () => {
    const marketerInterest = {
      marketerId: userId, 
      patientId: patient.id,
      dateInterested: new Date(),
      dateAccepted: null,
      dateRejected: null,
      rejectionReason: '',
      status: 'interested'
    };
  
    try {
      const response = await createMarketerInterest(marketerInterest);
      if (response.status === 201) {
        const marketerInfo = await fetchUserById(userId);

        // Compose and send the email
        await composeAndSendInterestEmail(marketerInfo, patient)

        setMarketerInterest((prev) => ({ ...prev, status: 'interested', dateInterested: new Date() })); // Update state immediately
        onUpdate({ ...patient, patientStatus: 'interested' });
        alert('Interest registered successfully');
      } else {
        alert('Failed to register interest');
      }
    } catch (error) {
      console.error('Error registering interest:', error);
      alert('Error registering interest: ' + error);
    }
  };

  const handleAccept = async () => {
    try {
      const marketerInfo = await fetchUserById(userId);
      const managerInfo = await fetchUserById(patient.managerId);

      // Update the MarketerInterest status to 'accepted'
      await acceptMarketerInterest(userId, patient.id, marketerInterest);
  
      // Update the Patient status to 'accepted'
      const updatedPatient = { ...patient, patientStatus: 'accepted' };
      await updatePatient(patient.id, updatedPatient);

      // Compose and send the email
      await composeAndSendAcceptEmail(managerInfo, marketerInfo, updatedPatient)
  
      // Update the local state for the modal
      setMarketerInterest((prev) => ({ ...prev, status: 'accepted', dateAccepted: new Date() }));
      onUpdate(updatedPatient); // This updates the patient in the list
    } catch (error) {
      console.error('Error accepting the patient:', error);
      alert('Failed to accept the patient. Please try again.');
    }
  };

  const handleReject = async () => {
    try {
      // Update the MarketerInterest status to 'rejected'
      await rejectMarketerInterest(userId, patient.id, marketerInterest);

      // Update the local state for the modal
      setMarketerInterest((prev) => ({ ...prev, status: 'rejected', dateRejected: new Date() }));
    } catch (error) {
      console.error('Error rejecting the patient:', error);
      alert('Failed to reject the patient. Please try again.');
    }
  };

  const handleConfirmPlacement = async () => {
    try {
      const updatedPatient = await updatePatient(patient.id, { ...patient, patientStatus: 'placed' });
      // Update the patient status locally
      onUpdate({ ...patient, patientStatus: 'placed' });
      handleArchive();
      alert('The placement has been confirmed.');
    } catch (error) {
      console.error('Error confirming patient placement:', error);
      alert('Failed to confirm patient placement. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Patient Details: {patient.firstName} {patient.lastName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>ID:</Form.Label>
            <Form.Control type="text" value={editablePatient.id || ''} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={editablePatient.firstName || ''}
              maxLength="100"
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={editablePatient.lastName || ''}
              maxLength="100"
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age:</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={editablePatient.age || ''}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sex:</Form.Label>
            <Form.Control
              as="select"
              name="sex"
              value={editablePatient.sex || ''}
              readOnly={!isEditing}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ready for Discharge:</Form.Label>
            <Form.Check
              type="checkbox"
              name="readyForDischarge"
              checked={editablePatient.readyForDischarge || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Medicare:</Form.Label>
            <Form.Check
              type="checkbox"
              name="medicare"
              checked={editablePatient.medicare || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>MediCal:</Form.Label>
            <Form.Check
              type="checkbox"
              name="mediCal"
              checked={editablePatient.mediCal || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Medicare Plan:</Form.Label>
            <Form.Control
              type="text"
              name="medicarePlan"
              value={editablePatient.medicarePlan || ''}
              maxLength="255"
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>MediCal Plan:</Form.Label>
            <Form.Control
              type="text"
              name="mediCalPlan"
              value={editablePatient.mediCalPlan || ''}
              maxLength="255"
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>HMO:</Form.Label>
            <Form.Check
              type="checkbox"
              name="hmo"
              checked={editablePatient.hmo || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PPO:</Form.Label>
            <Form.Check
              type="checkbox"
              name="ppo"
              checked={editablePatient.ppo || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>VA:</Form.Label>
            <Form.Check
              type="checkbox"
              name="va"
              checked={editablePatient.va || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>LOA Available:</Form.Label>
            <Form.Check
              type="checkbox"
              name="loaAvailable"
              checked={editablePatient.loaAvailable || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ALW:</Form.Label>
            <Form.Check
              type="checkbox"
              name="alw"
              checked={editablePatient.alw || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subacute:</Form.Label>
            <Form.Check
              type="checkbox"
              name="subacute"
              checked={editablePatient.subacute || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ISO:</Form.Label>
            <Form.Check
              type="checkbox"
              name="iso"
              checked={editablePatient.iso || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Requires Locked:</Form.Label>
            <Form.Check
              type="checkbox"
              name="requiresLocked"
              checked={editablePatient.requiresLocked || false}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Patient Notes:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="patientNotes"
              value={editablePatient.patientNotes || ''}
              maxLength="1000"
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Hospital Admission:</Form.Label>
            <Form.Control
              type="date"
              name="dateOfHospitalAdmission"
              value={editablePatient.dateOfHospitalAdmission ? new Date(editablePatient.dateOfHospitalAdmission).toISOString().split('T')[0] : ''}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Expected SNF Discharge Type:</Form.Label>
            <Form.Control
              as="select"
              name="expectedSnfDischargeType"
              value={editablePatient.expectedSnfDischargeType || ''}
              readOnly={!isEditing}
              onChange={handleChange}
            >
              <option value="unknown">Unknown</option>
              <option value="alw">ALW</option>
              <option value="pp">PP</option>
              <option value="home">Home</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Length of Stay (days):</Form.Label>
            <Form.Control
              type="text"
              value={calculateLengthOfStay(editablePatient.dateOfHospitalAdmission)}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Interested:</Form.Label>
            <Form.Control
              type="number"
              value={editablePatient.totalInterested || 0}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Rejected:</Form.Label>
            <Form.Control
              type="number"
              value={editablePatient.totalRejected || 0}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Manager ID:</Form.Label>
            <Form.Control
              type="number"
              value={editablePatient.managerId || ''}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Manager Organization ID:</Form.Label>
            <Form.Control
              type="number"
              value={editablePatient.managerOrganizationId || ''}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Marketer ID:</Form.Label>
            <Form.Control
              type="number"
              value={editablePatient.marketerId || ''}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Marketer Organization ID:</Form.Label>
            <Form.Control
              type="number"
              value={editablePatient.marketerOrganizationId || ''}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Patient Status:</Form.Label>
            <Form.Control
              type="text"
              value={editablePatient.patientStatus || ''}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tracking Status:</Form.Label>
            <Form.Control
              type="text"
              value={editablePatient.trackingStatus || ''}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Archived:</Form.Label>
            <Form.Control
              type="text"
              value={editablePatient.archived ? 'Yes' : 'No'}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        {userRole === 'admin' || userRole === 'matchmaker' || (userRole === 'manager' && userId === patient.managerId) ? (
          <>
            {isEditing ? (
              <Button variant="success" onClick={handleSave}>Save</Button>
            ) : (
              <Button variant="warning" onClick={handleEdit}>Edit Patient</Button>
            )}
            <Button variant="danger" onClick={handleArchive}>Remove Patient</Button>
          </>
        ) : null}
        {userRole === 'marketer' && (
          marketerInterest ? (
            marketerInterest.status === 'interested' ? (
              <>
                <Button variant="success" onClick={handleAccept} disabled={isAcceptedByAnother}>Accept Patient</Button>
                <Button variant="danger" onClick={handleReject} disabled={isAcceptedByAnother}>Reject Patient</Button>
              </>
            ) : null
          ) : (
            <Button variant="info" onClick={handleInterested}>I'm Interested</Button>
          )
        )}
        {(userRole === 'admin' || userRole === 'matchmaker') && patient.patientStatus === 'accepted' && (
          <Button variant="primary" onClick={handleConfirmPlacement}>Confirm Placement</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default PatientModal;
