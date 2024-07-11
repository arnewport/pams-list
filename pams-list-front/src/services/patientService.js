const url = process.env.REACT_APP_API_URL;

export const fetchPatients = async () => {
  try {
    const response = await fetch(url + "patients");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const archivePatient = async (patientId) => {
  try {
    const response = await fetch(`${url}patients/${patientId}/archive`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error archiving patient:', error);
    throw error;
  }
};

export const updatePatient = async (patientId, updatedPatient) => {
  try {
    const response = await fetch(`${url}patients/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPatient),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const addPatient = async (patient) => {
  try {
    const response = await fetch(`${url}patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};