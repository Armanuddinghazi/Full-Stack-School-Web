import react, {useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Index from './components/main/Index'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/about/About'
import CourseOne from './pages/courses/CourseOne'
import CourseTwo from './pages/courses/CourseTwo'
import HowToApply from './pages/apply/HowToApply'
import AdmissionForm from './pages/appform/AdmissionForm';
import TuitionFee from './pages/tutionfee/TuitionFee'
import Alumni from './pages/alumni/Alumni'
import Scholarship from './pages/scholarshipform/Scholarship'
import Blog from './pages/blog/Blog'
import BlogSingle from './pages/blog/BlogSingle'
import Contact from './pages/contact/Contact'
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import ForgotPassword from './pages/authentication/ForgotPassword';
import AOS from "aos";
import "aos/dist/aos.css";
import AdminLogin from './admin/pages/AdminLogin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroAdmin from './admin/pages/HeroAdmin';
import CourseAdmin from './admin/pages/CourseAdmin';
import ContactAdmin from './admin/pages/ContactAdmin';
import TeamAdmin from './admin/pages/TeamAdmin';
import GalleryAdmin from './admin/pages/GallreyAdmin';
import AdminLayout from './admin/AdminLayout';
import AboutAdmin from './admin/pages/AboutAdmin';
import CounterAdmin from './admin/pages/CounterAdmin';
import BlogAdmin from './admin/pages/BlogAdmin';
import NoticeAdmin from './admin/pages/NoticeAdmin';
import FeatureAdmin from './admin/pages/FeatureAdmin';
import HeaderTopAdmin from './admin/pages/HeaderTopAdmin';
import ChooseAdmin from './admin/pages/ChooseAdmin';
import RedirectToLatestBlog from './pages/blog/RedirectToLatestBlog';
import MandatoryDisclosure from './pages/mandatory/MandatoryDisclosure';
import ThemeAdmin from './admin/pages/ThemeAdmin';
import useThemeLoader from './hooks/useThemeLoader';
import DepartmentAdmin from './admin/pages/DepartmentAdmin';
import SectionAdmin from './admin/pages/SectionAdmin';
import DisclosureAdmin from './admin/pages/DisclosureAdmin';
import AdminApplyPage from './admin/pages/ApplyPageAdmin';
import PreLoader from './components/ui/PreLoader';
import Infrastructure from './pages/infrastructure/Infrastructure';
import InfraAdmin from './admin/pages/InfraAdmin';
import ScholarShipAdmin from './admin/pages/ScholarShipAdmin';
import Careers from './pages/careers/Career';
import FreeStructure from './pages/infrastructure/FreeStructure';
import FooterAdmin from './admin/pages/FooterAdmin';
import HeaderAdmin from './admin/pages/HeaderAdmin';


const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token")
    ? children
    : <Navigate to="/admin/login" />;
};

function App() {

  useThemeLoader();
  
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      // offset: 120,          
      // delay: 0,
      mirror: false,
    });
  }, []);


  return (
    <>
       {/* <PreLoader /> */}
      {!isAdminRoute && <Header />}
      <main className="main">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/course-one" element={<CourseOne />} />
          <Route path="/course-two" element={<CourseTwo />} />
          <Route path="/how-to-apply" element={<HowToApply />} />
          <Route path="/admission-form" element={<AdmissionForm />} />
          <Route path="/tuition-fee" element={<TuitionFee />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-latest" element={<RedirectToLatestBlog />} />
          <Route path="/blog/:id" element={<BlogSingle />} />
          <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/free-structure" element={<FreeStructure/>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <ScrollToTop />
      <Routes>

        {/* ===== ADMIN LOGIN (NO SIDEBAR) ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ===== ADMIN PANEL (WITH SIDEBAR) ===== */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HeroAdmin />} />
          <Route path="header-admin" element={<HeaderAdmin />} />
          <Route path="headertop-admin" element={<HeaderTopAdmin />} />
          <Route path="about-admin" element={<AboutAdmin />} />
          <Route path="course-admin" element={<CourseAdmin />} />
          <Route path="contact-admin" element={<ContactAdmin />} />
          <Route path="team-admin" element={<TeamAdmin />} />
          <Route path="gallery-admin" element={<GalleryAdmin />} />
          <Route path="counter-admin" element={<CounterAdmin />} />
          <Route path="blog-admin" element={<BlogAdmin />} />
          <Route path="notice-admin" element={<NoticeAdmin />} />
          <Route path="feature-admin" element={<FeatureAdmin />} />
          <Route path="choose-admin" element={<ChooseAdmin />} />
          <Route path="department-admin" element={<DepartmentAdmin />} />
          <Route path="section-admin" element={<SectionAdmin />} />
          <Route path="mandatory-admin" element={<DisclosureAdmin />} />
          <Route path="applypage-admin" element={<AdminApplyPage />} />
          <Route path="infra-admin" element={<InfraAdmin />} />
          <Route path="scholarship-admin" element={<ScholarShipAdmin />} />
          <Route path="footer-admin" element={<FooterAdmin />} />
          <Route path="theme-admin" element={<ThemeAdmin />} />
        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

    </>
  )
}

export default App
