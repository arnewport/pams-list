const url = process.env.REACT_APP_API_URL;

export const fetchUnverifiedUsers = async () => {
  try {
    const response = await fetch(`${url}api/v1/user/unverified`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching unverified users:', error);
    throw error;
  }
};

export const verifyUser = async (userId) => {
    try {
        const response = await fetch(`${url}api/v1/user/verify/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${url}api/v1/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };