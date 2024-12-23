import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import offsetPrintingImage from "../images/offset-printing.png"; // Import the image

interface LoginPageProps {
  onLogin: (userId: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(userId, password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <img
              src={offsetPrintingImage}
              alt="Offset Printing"
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="col-12 col-md-4">
            <div className="card p-4">
              <h2 className="card-title text-center">Login</h2>
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary w-100" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;