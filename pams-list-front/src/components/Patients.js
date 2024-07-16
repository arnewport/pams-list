import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import usePatients from '../hooks/usePatients';
import useUserData from '../hooks/useUserData';
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
const VerifyUsersModal = lazy(() => import('./VerifyUsersModal'));

const Patients = () => {
  const { patients, loading, error, setPatients } = usePatients();
  const { users, organizations } = useUserData(patients);
  const { user, handleLogout } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVerifyUsersModal, setShowVerifyUsersModal] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const patientsPerPage = 20;

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortFieldChange = (e) => setSortField(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleFilterStatusChange = (e) => setFilterStatus(e.target.value);

  const currentUserRole = user?.authorities[0];
  const currentUserId = user?.userId;

  useEffect(() => {
    if (!loading && patients.length > 0 && users.length > 0 && organizations.length > 0) {
      const newFilteredPatients = patients.filter(patient => {
        const manager = users.find(user => user.id === patient.managerId);
        const organization = organizations.find(org => org.id === patient.managerOrganizationId);

        const searchFilter =
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (manager && (manager.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       manager.lastName.toLowerCase().includes(searchTerm.toLowerCase()))) ||
          (organization && organization.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const statusFilter =
          filterStatus === 'all' ||
          (filterStatus === 'available' && patient.patientStatus === 'available') ||
          (filterStatus === 'accepted' && patient.patientStatus === 'accepted');

        return searchFilter && statusFilter;
      });

      const newSortedPatients = newFilteredPatients.sort((a, b) => {
        if (sortField === 'id') {
          return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        }
        if (sortField === 'name') {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        }
        if (sortField === 'dateOfAdmission') {
          const dateA = new Date(a.dateOfHospitalAdmission);
          const dateB = new Date(b.dateOfHospitalAdmission);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        if (sortField === 'dateAdded') {
          const dateA = new Date(a.dateAddedToPamList);
          const dateB = new Date(b.dateAddedToPamList);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });

      setFilteredPatients(newSortedPatients);
    }
  }, [patients, users, organizations, searchTerm, sortField, sortOrder, filterStatus, loading]);

  // Calculate the current patients to display
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Navigation arrow handlers
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPatients.length / patientsPerPage)) {
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

  const onOpenVerifyUsersModal = () => {
    setShowVerifyUsersModal(true);
  };

  return (
    <>
      <NavBar onOpenAddModal={onOpenAddModal} onOpenVerifyUsersModal={onOpenVerifyUsersModal} />
      <div>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by name, manager, or organization" />
        <select value={sortField} onChange={handleSortFieldChange}>
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
          <option value="dateOfAdmission">Sort by Date of Admission</option>
          <option value="dateAdded">Sort by Date Added to Pam's List</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select value={filterStatus} onChange={handleFilterStatusChange}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>
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
                disabled={currentPage >= Math.ceil(filteredPatients.length / patientsPerPage)}
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
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyUsersModal
            show={showVerifyUsersModal}
            handleClose={() => setShowVerifyUsersModal(false)}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Patients;
