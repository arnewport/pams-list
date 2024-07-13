const url = process.env.REACT_APP_API_URL;

export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${url}api/v1/user/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const fetchOrganizationById = async (id) => {
  try {
    const response = await fetch(`${url}api/organization/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching organization by ID:', error);
    throw error;
  }
};
