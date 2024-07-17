import { useState, useEffect } from 'react';
import { fetchPatients as fetchPatientsData } from '../services/patientService';

const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await fetchPatientsData();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error, setPatients, fetchPatients };
};

export default usePatients;
