import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
    
        <ul className="nav flex-column admin-sidebar">

          <li>
            <NavLink to="/admin" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fas fa-gauge-high"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/about-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fas fa-circle-info"></i>
              <span>About Us</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/course-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fas fa-book-open"></i>
              <span>Course</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/contact-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fas fa-address-book"></i>
              <span>Contact</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/team-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fas fa-users"></i>
              <span>Team</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/gallery-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fas fa-image"></i>
              <span>Gallery</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/counter-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fas fa-chart-simple"></i>
              <span>Counters</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/blog-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fas fa-blog"></i>
              <span>Blogs</span>
            </NavLink>
          </li>

        </ul>

      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default Sidebar;
