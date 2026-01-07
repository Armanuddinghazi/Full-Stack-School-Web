import React from "react";

const AdminHeader = ({toggleSidebar}) => {
    return (
        <>
            {/* <header classNameName="header">
                <nav classNameName="fixed-top">
                        <button classNameName="btn btn-outline-light d-lg-none" onClick={toggleSidebar}>
                            ☰
                        </button>
                        <h5 classNameName="ms-2 mb-0">Admin Dashboard</h5>
                </nav>
            </header> */}

            <div className="admin-header">
                <div className="header-left d-flex justify-content-between align-items-center gap-3">
                    <h2 className="dashboard_bar mb-0 text-dark">
                        Admin
                    </h2>
                    <div className="cursor-menu" onClick={toggleSidebar}><span><i class="fa-duotone fa-solid fa-bars fs-3"></i></span></div>
                </div>
                <div className="header-content">

                    <nav className="navbar-wrapper ">
                        <div className=" d-flex justify-content-between align-items-center">

                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown notification_dropdown">
                                    <a className="nav-link bell dz-theme-mode" href="javascript:void(0);">
                                        {/* <i id="icon-light" className="fas fa-sun"></i> */}
                                        <i id="icon-dark" className="fas fa-moon"></i>
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
