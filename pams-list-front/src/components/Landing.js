import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="container-fluid">
      <h1 className="display-3 mt-3">Pam's List</h1>
      <div className="d-flex flex-grow-1 justify-content-end">
        <Link to="/login" className="btn btn-primary btn-lg custom-link me-2">
          Login
        </Link>
        <Link to="/signup" className="btn btn-secondary btn-lg custom-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Landing;
