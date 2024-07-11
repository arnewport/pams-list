import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import NavBar from "./NavBar/NavBar";

function Home() {
  const { user, handleLogout } = useContext(AuthContext);

  console.log("Home component user:", user); // Log the user state in Home component

  const onLogout = () => {
    console.log("User clicked logout"); // Log the logout click action
    handleLogout(); // Call handleLogout to update context and refresh page
  };

  return (
    <>
    <NavBar />
      <div className="container-fluid">
        <h1 className="display-3 mt-3">Pam's List</h1>
        <h3 className="display-5 mt-3">Welcome {user?.email}!</h3>
        <div className="d-flex flex-grow-1 justify-content-end">
          <button to="/" className="btn btn-info btn-lg" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
