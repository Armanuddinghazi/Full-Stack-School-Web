
import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../admin/sidebar.css'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openMenus, setOpenMenus] = useState({
    dashboard: false,
    gallery: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <>
      <aside className={`sidebar-container ${sidebarOpen ? "active" : ""}`}>
        {/* Logo Area */}
        <div className="sidebar-header">
          <div className="logo-text">Admin <span> Panel</span></div>
          <button className="close-btn-sidebar d-md-none" onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="sidebar-scroll">
          <ul className="nav-list">

            {/* Single Link Item */}
            <li className="nav-item">
              <NavLink to="/admin" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                <i className="fa-sharp fa-solid fa-gauge nav-icon"></i>
                <span className="nav-text">Dashboard</span>
              </NavLink>
            </li>

            {/* Dropdown: Info */}
            <li className={`nav-item has-submenu ${openMenus.dashboard ? "open" : ""}`}>
              <div className="nav-link d-flex align-items-center justify-content-between" onClick={() => toggleMenu("dashboard")}>
                <div className="d-flex  ">
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-circle-info nav-icon"></i>
                    <span className="nav-text">Info Setup</span>
                  </div>
                </div>
                <div><i className="fa-solid fa-chevron-right arrow-icon "></i></div>
              </div>

              {/* Smooth Dropdown Content */}
              <ul className="submenu">
                <li><NavLink to="/admin/section-admin">Section Admin</NavLink></li>
                <li><NavLink to="/admin/header-admin">Header Admin</NavLink></li>
                <li><NavLink to="/admin/feature-admin">Home Features</NavLink></li>
                <li><NavLink to="/admin/choose-admin">Why Choose Us</NavLink></li>
                <li><NavLink to="/admin/department-admin">Department</NavLink></li>
                <li><NavLink to="/admin/mandatory-admin">Mandatory</NavLink></li>
                <li><NavLink to="/admin/applypage-admin">How To Apply</NavLink></li>
                <li><NavLink to="/admin/infra-admin">Infrastructure</NavLink></li>
                <li><NavLink to="/admin/scholarship-admin">Scholarship</NavLink></li>
                <li><NavLink to="/admin/theme-admin">Theme</NavLink></li>
              </ul>
            </li>

            {/* Dropdown: Gallery */}
            <li className={`nav-item has-submenu ${openMenus.gallery ? "open" : ""}`}>
              <div className="nav-link d-flex align-items-center justify-content-between" onClick={() => toggleMenu("gallery")}>
                <div className="d-flex align-items-center">
                  <i className="fa-sharp fa-solid fa-images nav-icon"></i>
                  <span className="nav-text">Gallery</span>
                </div>
                <i className="fa-solid fa-chevron-right arrow-icon"></i>
              </div>

              <ul className="submenu">
                <li><NavLink to="/admin/gallery-admin">Photo Gallery</NavLink></li>
                <li><NavLink to="/admin/video-admin">Video Gallery</NavLink></li>
              </ul>
            </li>

            <li className={`nav-item has-submenu ${openMenus.about ? "open" : ""}`}>
              <div className="nav-link d-flex align-items-center justify-content-between" onClick={() => toggleMenu("about")}>
                <div className="d-flex align-items-center">
                  <i className="fa-sharp fa-solid fa-images nav-icon"></i>
                  <span className="nav-text">About Us</span>
                </div>
                <i className="fa-solid fa-chevron-right arrow-icon"></i>
              </div>

              <ul className="submenu">
                <li><NavLink to="/admin/about-admin">About Us Admin</NavLink></li>
                <li><NavLink to="/admin/mission-vision-admin">Mission/Vision</NavLink></li>
              </ul>
            </li>
            {/* Other Single Links */}

            <li className="nav-item">
              <NavLink to="/admin/course-admin" className="nav-link">
                <i className="fa-solid fa-book-open nav-icon"></i>
                <span className="nav-text">Course</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/contact-admin" className="nav-link">
                <i className="fa-solid fa-address-book nav-icon"></i>
                <span className="nav-text">Contact</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/team-admin" className="nav-link">
                <i className="fa-solid fa-users nav-icon"></i>
                <span className="nav-text">Team</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/counter-admin" className="nav-link">
                <i className="fa-solid fa-chart-simple nav-icon"></i>
                <span className="nav-text">Counters</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/testimonial-admin" className="nav-link">
                <i className="fa-sharp fa-solid fa-people-group nav-icon"></i>
                <span className="nav-text">Testimonial</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/blog-admin" className="nav-link">
                <i className="fa-solid fa-blog nav-icon"></i>
                <span className="nav-text">Blogs</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/notice-admin" className="nav-link">
                <i className="fa-solid fa-bullhorn nav-icon"></i>
                <span className="nav-text">Notice</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/footer-admin" className="nav-link">
                <i className="fa-solid fa-circle-location-arrow nav-icon"></i>
                <span className="nav-text">Footer</span>
              </NavLink>
            </li>

          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default Sidebar;