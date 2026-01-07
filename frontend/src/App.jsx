import react, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Index from './components/main/Index'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/about/About'
import CourseOne from './pages/courses/CourseOne'
import CourseTwo from './pages/courses/CourseTwo'
import HowToApply from './pages/apply/HowToApply'
import ApplicationForm from './pages/appform/ApplicationForm'
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


const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token")
    ? children
    : <Navigate to="/admin/login" />;
};

function App() {

  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  // const adminRoutes = ["/admin/login", "/admin", "/course-admin", "/contact-admin", "/team-admin", "/gallery-admin"];
  // const isAdminRoute = adminRoutes.some(route =>
  //   location.pathname.startsWith(route)
  // );


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
          <Route path="/application-form" element={<ApplicationForm />} />
          <Route path="/tuition-fee" element={<TuitionFee />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-single" element={<BlogSingle />} />
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
          <Route path="about-admin" element={<AboutAdmin />} />
          <Route path="course-admin" element={<CourseAdmin />} />
          <Route path="contact-admin" element={<ContactAdmin />} />
          <Route path="team-admin" element={<TeamAdmin />} />
          <Route path="gallery-admin" element={<GalleryAdmin />} />
          <Route path="counter-admin" element={<CounterAdmin />} />
          <Route path="blog-admin" element={<BlogAdmin />} />
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
