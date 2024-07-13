import { useState, useEffect } from 'react';
import { fetchUserById, fetchOrganizationById } from '../services/dataService';

const useUserData = (patientList) => {
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const userIds = [...new Set(patientList.map(patient => patient.managerId))];
    const organizationIds = [...new Set(patientList.map(patient => patient.managerOrganizationId))];

    const fetchUsers = async () => {
      try {
        const userPromises = userIds.map(id => fetchUserById(id));
        const users = await Promise.all(userPromises);
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchOrganizations = async () => {
      try {
        const organizationPromises = organizationIds.map(id => fetchOrganizationById(id));
        const organizations = await Promise.all(organizationPromises);
        setOrganizations(organizations);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchUsers();
    fetchOrganizations();
  }, [patientList]);

  return { users, organizations };
};

export default useUserData;
