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
