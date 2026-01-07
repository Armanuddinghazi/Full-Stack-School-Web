import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
    <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
     <div className="admin-wrapper">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
          <main className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
            <Outlet />
          </main>
        </div>

    </>
  );
};

export default AdminLayout;
