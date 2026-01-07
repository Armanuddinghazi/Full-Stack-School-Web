import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const login = async () => {
    try {
      const res = await apiClient.post("/auth/login", {
        email,
        password
      });
      toast.success('login successfull');

      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";

    } catch (err) {
      console.log(err.response?.data || "Login failed");
    }
  };

  return (
    <>
      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <p>Login with your admin account</p>
              </div>
              <form action="#">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" 
                  className="form-control" 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control password-form" 
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password" />
                  <span className="eye-btn"
                   onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fa-light ${showPassword ? "fa-eye" : "fa-eye-slash "}`}></i>
                  </span>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <button onClick={login} className="theme-btn"><i className="far fa-sign-in"></i> Login</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;