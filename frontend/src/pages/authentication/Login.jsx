import React from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import loginBg from "../../assets/img/breadcrumb/01.jpg";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Breadcrumb
        title="Login"
        bgImage={loginBg}
        items={[
          { label: "Home", path: "/" },
          { label: "Login", active: true }
        ]}
      />

      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                {/* <img src="assets/img/logo/logo.png" alt=""/> */}
                  <p>Login with your college account</p>
              </div>
              <form action="#">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" placeholder="Your Email"/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Your Password"/>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="remember"/>
                      <label className="form-check-label" for="remember">
                        Remember Me
                      </label>
                  </div>
                  <Link to="/forgot-password" className="forgot-pass">Forgot Password?</Link>
                </div>
                <div className="d-flex align-items-center">
                  <button type="submit" className="theme-btn"><i className="far fa-sign-in"></i> Login</button>
                </div>
              </form>
              <div className="login-footer">
                <p>Don't have an account? <Link to="/registe">Register.</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login