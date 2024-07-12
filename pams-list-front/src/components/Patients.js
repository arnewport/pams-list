import React, { useState, lazy, Suspense, useContext } from 'react';
import usePatients from '../hooks/usePatients';
import NavBar from "./NavBar/NavBar";
import AuthContext from "../contexts/AuthContext";

const calculateLengthOfStay = (dateOfHospitalAdmission) => {
  const today = new Date();
  const admissionDate = new Date(dateOfHospitalAdmission);
  const differenceInTime = today - admissionDate;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  return differenceInDays;
};

// Lazy load the PatientModal component
const PatientModal = lazy(() => import('./PatientModal'));
const AddPatientModal = lazy(() => import('./AddPatientModal'));

const Patients = () => {
  const { patients, loading, error, setPatients } = usePatients();
  const { user, handleLogout } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const patientsPerPage = 20;

  const currentUserRole = user?.authorities[0];
  const currentUserId = user?.userId;

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

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const handleArchivePatient = (patientId) => {
    setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId));
  };

  const handleUpdatePatient = (updatedPatient) => {
    setPatients(prevPatients =>
      prevPatients.map(patient => (patient.id === updatedPatient.id ? updatedPatient : patient))
    );
  };

  const handleAddPatient = (newPatient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
    setShowAddModal(false);
  };

  const onOpenAddModal = () => {
    setShowAddModal(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching patients: {error.message}</p>;
  }

  return (
    <>
      <NavBar onOpenAddModal={onOpenAddModal} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
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
                  <th>Actions</th>
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
                    <td>
                      <button className="btn btn-primary" onClick={() => handleViewPatient(patient)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between mb-3">
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
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-info btn-lg" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
        {selectedPatient && (
          <Suspense fallback={<div>Loading...</div>}>
            <PatientModal
              show={showModal}
              handleClose={handleCloseModal}
              patient={selectedPatient}
              onArchive={handleArchivePatient}
              onUpdate={handleUpdatePatient}
              userRole={currentUserRole}
              userId={currentUserId}
            />
          </Suspense>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <AddPatientModal
            show={showAddModal}
            handleClose={() => setShowAddModal(false)}
            onAdd={handleAddPatient}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Patients;
