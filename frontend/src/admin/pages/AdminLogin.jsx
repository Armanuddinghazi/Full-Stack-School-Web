import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";
import confetti from "canvas-confetti";
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function conFettiLogin() {
    confetti({
      particleCount: 880,
      spread: 150,
      origin: { y: 0 },
    });
  }

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Enter valid email");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await apiClient.post("/auth/login", {
        email,
        password,
      });

      toast.success("Login successfully");

      localStorage.setItem("token", res.data.token);
      conFettiLogin();
      setTimeout(() => {
        navigate("/admin");
      }, 2000);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-area py-80">
        <div className="container">
          <div className="col-lg-5 col-md-8 col-sm-10 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <p>Login with your admin account</p>
              </div>
              <form action="#" onSubmit={handleSubmit}>
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
                  <button type="submit" className="theme-btn"
                    disabled={loading}><i className="far fa-sign-in"></i>
                    {loading ? "Logging in..." : "Login"}
                  </button>
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