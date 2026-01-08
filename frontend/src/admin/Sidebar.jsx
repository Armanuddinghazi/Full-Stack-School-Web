import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openDashboard, setOpenDashboard] = useState(false);

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>

        <ul className="nav flex-column admin-sidebar">

          <li>
            <NavLink to="/admin" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-gauge"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <a href="#"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setOpenDashboard(!openDashboard);
              }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i class="fa-solid fa-circle-ellipsis-vertical"></i>
                  <span>Info</span>
                </div>
                <span class="fa-regular fa-chevron-right "></span>
              </div>
            </a>
            {openDashboard && (
              <ul className="submenu">
                <li>
                  <NavLink to="/admin/feature-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    <i className="fa-sharp fa-solid fa-circle-star"></i>
                    <span>Home Features</span>
                  </NavLink>
                </li>
{/* 
                <li>
                    <NavLink to="/admin/headercontact-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                      <i className="fa-sharp fa-solid fa-circle-star"></i>
                      <span>Header Contact</span>
                    </NavLink>
                </li> */}
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/admin/about-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-circle-info"></i>
              <span>About Us</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/course-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-book-open"></i>
              <span>Course</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/contact-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-address-book"></i>
              <span>Contact</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/team-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-users"></i>
              <span>Team</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/gallery-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-image"></i>
              <span>Gallery</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/counter-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-chart-simple"></i>
              <span>Counters</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/blog-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-blog"></i>
              <span>Blogs</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/notice-admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-bullhorn"></i>
              <span>Notice</span>
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
