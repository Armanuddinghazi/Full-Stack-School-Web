import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HeroAdmin from './HeroAdmin'
import CourseAdmin from './CourseAdmin'
import ContactAdmin from './ContactAdmin'
import TeamAdmin from './TeamAdmin'
import GalleryAdmin from './GallreyAdmin'

const AdminDashboard = () => {
  return (
    <>
       <h1>Admin Panel</h1>
       <Routes>
        <Route path="/" element={<HeroAdmin />} />
        <Route path="/course-admin" element={<CourseAdmin />} />
        <Route path="/contact-admin" element={<ContactAdmin />} />
        <Route path="/team-admin" element={<TeamAdmin />} />
        <Route path="/gallery-admin" element={<GalleryAdmin />} />
       </Routes>
    </>
  )
}

export default AdminDashboard