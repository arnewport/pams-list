import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addPatient } from '../services/patientService';

const AddPatientModal = ({ show, handleClose, onAdd }) => {
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    age: '',
    sex: 'male',
    readyForDischarge: false,
    medicare: false,
    mediCal: false,
    medicarePlan: '',
    mediCalPlan: '',
    hmo: false,
    ppo: false,
    va: false,
    loaAvailable: false,
    alw: false,
    subacute: false,
    iso: false,
    requiresLocked: false,
    patientNotes: '',
    dateOfHospitalAdmission: '',
    managerId: '',
    managerOrganizationId: '',
    marketerId: null,
    marketerOrganizationId: null,
    expectedSnfDischargeType: 'unknown',
    patientStatus: 'available',
    trackingStatus: 'hospital',
    archived: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value === '' ? null : value,
    }));
  };

  const handleSave = async () => {
    try {
      const addedPatient = await addPatient({
        ...newPatient,
        dateAddedToPamList: new Date().toISOString().split('T')[0], // Set dateAddedToPamList to today
        datePlacedOrWithdrawn: null // Set datePlacedOrWithdrawn to null
      });
      onAdd(addedPatient);
      handleClose();
    } catch (error) {
      console.error('Error adding the patient:', error);
      alert('Failed to add the patient. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Add New Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={newPatient.firstName}
              maxLength="100"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={newPatient.lastName}
              maxLength="100"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age:</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={newPatient.age}
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sex:</Form.Label>
            <Form.Control
              as="select"
              name="sex"
              value={newPatient.sex}
              required
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
              checked={newPatient.readyForDischarge}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Medicare:</Form.Label>
            <Form.Check
              type="checkbox"
              name="medicare"
              checked={newPatient.medicare}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>MediCal:</Form.Label>
            <Form.Check
              type="checkbox"
              name="mediCal"
              checked={newPatient.mediCal}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Medicare Plan:</Form.Label>
            <Form.Control
              type="text"
              name="medicarePlan"
              value={newPatient.medicarePlan}
              maxLength="255"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>MediCal Plan:</Form.Label>
            <Form.Control
              type="text"
              name="mediCalPlan"
              value={newPatient.mediCalPlan}
              maxLength="255"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>HMO:</Form.Label>
            <Form.Check
              type="checkbox"
              name="hmo"
              checked={newPatient.hmo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PPO:</Form.Label>
            <Form.Check
              type="checkbox"
              name="ppo"
              checked={newPatient.ppo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>VA:</Form.Label>
            <Form.Check
              type="checkbox"
              name="va"
              checked={newPatient.va}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>LOA Available:</Form.Label>
            <Form.Check
              type="checkbox"
              name="loaAvailable"
              checked={newPatient.loaAvailable}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ALW:</Form.Label>
            <Form.Check
              type="checkbox"
              name="alw"
              checked={newPatient.alw}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subacute:</Form.Label>
            <Form.Check
              type="checkbox"
              name="subacute"
              checked={newPatient.subacute}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ISO:</Form.Label>
            <Form.Check
              type="checkbox"
              name="iso"
              checked={newPatient.iso}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Requires Locked:</Form.Label>
            <Form.Check
              type="checkbox"
              name="requiresLocked"
              checked={newPatient.requiresLocked}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Patient Notes:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="patientNotes"
              value={newPatient.patientNotes}
              maxLength="1000"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Hospital Admission:</Form.Label>
            <Form.Control
              type="date"
              name="dateOfHospitalAdmission"
              value={newPatient.dateOfHospitalAdmission}
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Manager ID:</Form.Label>
            <Form.Control
              type="number"
              name="managerId"
              value={newPatient.managerId}
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Manager Organization ID:</Form.Label>
            <Form.Control
              type="number"
              name="managerOrganizationId"
              value={newPatient.managerOrganizationId}
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-2" variant="secondary" onClick={handleClose}>Close</Button>
        <Button className="me-2" variant="success" onClick={handleSave}>Add Patient</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPatientModal;
