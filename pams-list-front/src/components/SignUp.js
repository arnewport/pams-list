import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/AuthAPI";

import ValidationSummary from "./ValidationSummary";

function SignUp() {
  const [errors, setErrors] = useState([]);
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    faxNumber: "",
    organizationId: "",
    password: "",
    confirmPassword: "",
    roleId: "", // New field for role ID
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (evt) => {
    const nextCredentials = { ...credentials };
    nextCredentials[evt.target.name] = evt.target.value;
    setCredentials(nextCredentials);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setErrors([]);
    if (!validateForm()) {
      setErrors(["Passwords do not match!"]);
      return;
    }

    register(credentials).then((data) => {
      if (data && data.errors) {
        setErrors(data.errors);
      } else {
        setSuccess(true);
      }
    });
  };

  const validateForm = () => {
    return credentials.password === credentials.confirmPassword;
  };

  return (
    <div>
      <ValidationSummary errors={errors} />
      {success ? (
        <div className="alert alert-success">
          Congratulations {credentials.firstName}, you have been registered.
          Login <Link to="/login">here</Link>.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control align-left"
                id="firstName"
                name="firstName"
                value={credentials.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control align-left"
                id="lastName"
                name="lastName"
                value={credentials.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control align-left"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control align-left"
                id="phoneNumber"
                name="phoneNumber"
                value={credentials.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="faxNumber">Fax Number</label>
              <input
                type="text"
                className="form-control align-left"
                id="faxNumber"
                name="faxNumber"
                value={credentials.faxNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="organizationId">Organization ID</label>
              <input
                type="text"
                className="form-control align-left"
                id="organizationId"
                name="organizationId"
                value={credentials.organizationId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="roleId">Role ID</label>
              <input
                type="text"
                className="form-control align-left"
                id="roleId"
                name="roleId"
                value={credentials.roleId} // New input for role ID
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control align-left"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group align-left">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary btn-lg">
                Sign up
              </button>
              <Link to="/" className="btn btn-warning btn-lg">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUp;
