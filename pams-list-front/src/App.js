import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Error from "./components/Error";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Patients from "./components/Patients";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AuthContext from "./contexts/AuthContext";

import { refreshToken, logout } from "./services/AuthAPI";
import NavBar from "./components/NavBar/NavBar";
import PlaceholderComponent from "./components/PlaceholderComponent";

const TIMEOUT_MILLISECONDS = 14 * 60 * 1000;

function App() {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const resetUser = useCallback(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
      console.log("No JWT token found, skipping refresh.");
      setInitialized(true);
      return;
    }

    refreshToken()
      .then((user) => {
        console.log("User after token refresh:", user);
        setUser(user);
        setTimeout(resetUser, TIMEOUT_MILLISECONDS);
      })
      .catch((err) => {
        console.error("Token refresh failed:", err);
        logout();
        setUser(null);
      })
      .finally(() => setInitialized(true));
  }, []);

  useEffect(() => {
    resetUser();
  }, [resetUser]);

  const auth = {
    user: user,
    handleLoggedIn(user) {
      console.log("User logged in:", user);
      setUser(user);
      setTimeout(resetUser, TIMEOUT_MILLISECONDS);
    },
    hasAuthority(authority) {
      if (!user) {
        console.log("No user logged in, cannot check authority.");
        return false;
      }
      const hasAuth = user.authorities.includes(authority.toLowerCase());
      console.log(`Checking authority: ${authority}, has authority: ${hasAuth}`);
      return hasAuth;
    },
    handleLogout() { // Renamed to handleLogout for consistency
      logout();
      setUser(null);
      window.location.replace("/"); // Ensure the page refreshes and redirects to the landing page
    },
  };

  if (!initialized) {
    return null;
  }

  const renderWithAuthority = (Component, ...authorities) => {
    console.log("User roles:", auth.user?.authorities);
    for (let authority of authorities) {
      if (auth.hasAuthority(authority.toLowerCase())) {
        return <Component />;
      }
    }
    return <Error />;
  };

  return (
    <main className="container">
      <AuthContext.Provider value={auth}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/home" element={renderWithAuthority(Home, "admin", "matchmaker", "manager", "marketer")} />
            <Route path="/admin/view" element={renderWithAuthority(PlaceholderComponent, "admin", "matchmaker")} />
            <Route path="/admin/add-patients" element={renderWithAuthority(PlaceholderComponent, "admin", "matchmaker", "manager")} />
            <Route path="/admin/confirm-acceptances" element={renderWithAuthority(PlaceholderComponent, "admin", "matchmaker")} />
            <Route path="/admin/patient-archive" element={renderWithAuthority(PlaceholderComponent, "admin", "matchmaker")} />
            <Route path="/admin/verify-users" element={renderWithAuthority(PlaceholderComponent, "admin", "matchmaker")} />
            <Route path="/manager/view-patients" element={renderWithAuthority(PlaceholderComponent, "manager")} />
            <Route path="/manager/add-patients" element={renderWithAuthority(PlaceholderComponent, "manager")} />
            <Route path="/manager/my-added-patients" element={renderWithAuthority(PlaceholderComponent, "manager")} />
            <Route path="/marketer/view-patients" element={renderWithAuthority(PlaceholderComponent, "marketer")} />
            <Route path="/marketer/my-selected-patients" element={renderWithAuthority(PlaceholderComponent, "marketer")} />
            <Route path="/marketer/my-accepted-patients" element={renderWithAuthority(PlaceholderComponent, "marketer")} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </main>
  );
}

export default App;
