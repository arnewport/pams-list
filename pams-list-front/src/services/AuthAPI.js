const url = process.env.REACT_APP_API_URL;

export async function login(credentials) {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  };

  console.log("Sending login request to:", url + "login");
  console.log("Request body:", init.body);

  try {
    const response = await fetch(url + "login", init);
    console.log("Received response:", response);
    if (response.status === 200) {
      const jwtTokenResponse = await response.json();
      console.log("Received JWT token:", jwtTokenResponse.jwt_token);
      localStorage.setItem("jwt_token", jwtTokenResponse.jwt_token);
      return makeUserFromJwt(jwtTokenResponse.jwt_token);
    } else {
      console.error("Login request failed with status:", response.status);
      return Promise.reject("Unauthorized.");
    }
  } catch (error) {
    console.error("Login request error:", error);
    return Promise.reject("An error occurred.");
  }
}

export async function register(credentials) {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  };

  console.log("Sending register request to:", url + "signup");
  console.log("Request body:", init.body);

  try {
    const response = await fetch(url + "signup", init);
    console.log("Received response:", response);
    if (response.status === 400) {
      const result = await response.json();
      console.log("Registration failed with messages:", result.messages);
      return { errors: result.messages };
    } else if (response.status === 201) {
      console.log("Registration successful.");
      return {};
    } else {
      console.error("Unexpected error:", response.status);
      return Promise.reject("Unexpected error, oops.");
    }
  } catch (error) {
    console.error("Register request error:", error);
    return Promise.reject("An error occurred.");
  }
}

export async function refreshToken() {
  const jwtToken = localStorage.getItem("jwt_token");
  if (!jwtToken) {
    console.error("No JWT token found, unauthorized.");
    return Promise.reject("Unauthorized.");
  }

  const init = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + jwtToken,
    },
  };

  console.log("Sending refresh token request to:", url + "refresh-token");

  try {
    const response = await fetch(url + "refresh-token", init);
    console.log("Received response:", response);
    if (response.status === 200) {
      const jwtTokenResponse = await response.json();
      console.log("Received new JWT token:", jwtTokenResponse.jwt_token);
      localStorage.setItem("jwt_token", jwtTokenResponse.jwt_token);
      return makeUserFromJwt(jwtTokenResponse.jwt_token);
    } else {
      console.error("Refresh token request failed with status:", response.status);
      localStorage.removeItem("jwt_token");
      return Promise.reject("Unauthorized.");
    }
  } catch (error) {
    console.error("Refresh token request error:", error);
    return Promise.reject("An error occurred.");
  }
}

export function logout() {
  console.log("Logging out, removing JWT token from local storage.");
  localStorage.removeItem("jwt_token");
  window.location.reload();
}

function makeUserFromJwt(jwtToken) {
  try {
    const jwtParts = jwtToken.split(".");
    if (jwtParts.length === 3) {
      const payload = JSON.parse(atob(jwtParts[1]));
      console.log("Decoded JWT token:", payload);
      return {
        username: payload.sub,
        authorities: payload.authorities.map(a => a.toLowerCase()), // Ensure authorities are lowercase
        userId: payload.user_id,
      };
    } else {
      console.error("Invalid JWT token format");
      return null;
    }
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}
