import React, { useState } from 'react';
import usePatients from '../hooks/usePatients';

const Patients = () => {
  const { patients, loading, error } = usePatients();
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 20;

  // Calculate the current patients to display
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Navigation arrow handlers
  const handleNextPage = () => {
    if (currentPage < Math.ceil(patients.length / patientsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching patients: {error.message}</p>;
  }

  const calculateLengthOfStay = (dateOfHospitalAdmission) => {
    const today = new Date();
    const admissionDate = new Date(dateOfHospitalAdmission);
    const differenceInTime = today - admissionDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Ready for Discharge</th>
            <th>Medicare</th>
            <th>MediCal</th>
            <th>Medicare Plan</th>
            <th>MediCal Plan</th>
            <th>HMO</th>
            <th>PPO</th>
            <th>VA</th>
            <th>LOA Available</th>
            <th>ALW</th>
            <th>Subacute</th>
            <th>ISO</th>
            <th>Requires Locked</th>
            <th>Patient Notes</th>
            <th>Date of Hospital Admission</th>
            <th>Length of Stay (days)</th>
            <th>Date Added to Pam List</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.age}</td>
              <td>{patient.sex}</td>
              <td>{patient.readyForDischarge ? 'Yes' : 'No'}</td>
              <td>{patient.medicare ? 'Yes' : 'No'}</td>
              <td>{patient.mediCal ? 'Yes' : 'No'}</td>
              <td>{patient.medicarePlan}</td>
              <td>{patient.mediCalPlan}</td>
              <td>{patient.hmo ? 'Yes' : 'No'}</td>
              <td>{patient.ppo ? 'Yes' : 'No'}</td>
              <td>{patient.va ? 'Yes' : 'No'}</td>
              <td>{patient.loaAvailable ? 'Yes' : 'No'}</td>
              <td>{patient.alw ? 'Yes' : 'No'}</td>
              <td>{patient.subacute ? 'Yes' : 'No'}</td>
              <td>{patient.iso ? 'Yes' : 'No'}</td>
              <td>{patient.requiresLocked ? 'Yes' : 'No'}</td>
              <td>{patient.patientNotes}</td>
              <td>{new Date(patient.dateOfHospitalAdmission).toLocaleDateString()}</td>
              <td>{calculateLengthOfStay(patient.dateOfHospitalAdmission)}</td>
              <td>{new Date(patient.dateAddedToPamList).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(patients.length / patientsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Patients;
