const url = process.env.REACT_APP_API_URL;

export const checkMarketerInterest = async (marketerId, patientId) => {
  try {
      const response = await fetch(`${url}api/marketer-interest/check-interest?marketerId=${marketerId}&patientId=${patientId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          if (response.status === 404) {
              return null;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { status: response.status, data };
  } catch (error) {
      console.error('Error checking marketer interest:', error);
      throw error;
  }
};

export const createMarketerInterest = async (marketerInterest) => {
    try {
      const response = await fetch(`${url}api/marketer-interest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marketerInterest),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      console.error('Error creating marketer interest:', error);
      throw error;
    }
  };

export const acceptMarketerInterest = async (marketerId, patientId, marketerInterest) => {
  try {
    const response = await fetch(`${url}api/marketer-interest/${marketerId}/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...marketerInterest,
        status: 'accepted',
        dateAccepted: new Date(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { status: response.status };
  } catch (error) {
    console.error('Error accepting marketer interest:', error);
    throw error;
  }
};
  
export const rejectMarketerInterest = async (marketerId, patientId, marketerInterest) => {
  try {
    const response = await fetch(`${url}api/marketer-interest/${marketerId}/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...marketerInterest,
        status: 'rejected',
        dateRejected: new Date(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { status: response.status };
  } catch (error) {
    console.error('Error rejecting marketer interest:', error);
    throw error;
  }
};
  