import React from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import registerBg from "../../assets/img/breadcrumb/01.jpg";
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <Breadcrumb
        title="Register"
        bgImage={registerBg}
        items={[
          { label: "Home", path: "/" },
          { label: "Register", active: true }
        ]}
      />

      <div className="login-area py-120">
            <div className="container">
                <div className="col-md-5 mx-auto">
                    <div className="login-form">
                        <div className="login-header">
                            {/* <img src="assets/img/logo/logo.png" alt=""> */}
                            <p>Create your college account</p>
                        </div>
                        <form action="#">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" className="form-control" placeholder="Your Name"/>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="form-control" placeholder="Your Email"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Your Password"/>
                            </div>
                            <div className="form-check form-group">
                                <input className="form-check-input" type="checkbox" value="" id="agree"/>
                                <label className="form-check-label" for="agree">
                                   I agree with the <a href="#">Terms Of Service.</a>
                                </label>
                            </div>
                            <div className="d-flex align-items-center">
                                <button type="submit" className="theme-btn"><i className="far fa-paper-plane"></i> Register</button>
                            </div>
                        </form>
                        <div className="login-footer">
                            <p>Already have an account? <Link to="/login">Login.</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register