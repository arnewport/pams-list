import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";

function Home() {

  // context
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="container-fluid">
        <h1 className="display-3 mt-3">Pam's List</h1>
        <h3 className="display-5 mt-3">Welcome {user?.email}!</h3>
        <div className="d-flex flex-grow-1 justify-content-end">
          <Link to="/" className="btn btn-info btn-lg" onClick={logout}>
            Log Out
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
