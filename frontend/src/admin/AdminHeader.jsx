import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/admin/login');
  }
    
    return (
        <>
            <div className="admin-header">
                <div className="header-left d-flex justify-content-between align-items-center gap-3">
                    {/* <h2 className="dashboard_bar mb-0 ">
                        School <span>Admin</span>
                    </h2> */}
                    <div className="cursor-menu" onClick={toggleSidebar}><span><i className="fa-duotone fa-solid fa-bars fs-3"></i></span></div>
                </div>
                <div className="header-content">

                    <nav className="navbar-wrapper ">
                        <div className=" d-flex justify-content-between align-items-center">

                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown notification_dropdown">
                                    <a className="nav-link bell dz-theme-mode" href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLogout();
                                        }}
                                        title="Logout">
                                        <i className="fa-regular fa-arrow-right-from-bracket"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default AdminHeader;
