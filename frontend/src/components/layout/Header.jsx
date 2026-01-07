import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    const [isSticky, setIsSticky] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // ESC key close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setSearchOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 120) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`header ${isSticky ? "sticky-header" : ""}`}>
                <div className={`header-top ${isSticky ? "hide-top" : ""}`}>
                    <div className="container">
                        <div className="header-top-wrap">
                            <div className="header-top-left">
                                <div className="header-top-social">
                                    <span>Follow Us: </span>
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                    <a href="#"><i className="fab fa-youtube"></i></a>
                                    <a href="#"><i className="fab fa-whatsapp"></i></a>
                                </div>
                            </div>
                            <div className="header-top-right">
                                <div className="header-top-contact">
                                    <ul>
                                        <li>
                                            <a href="#"><i className="far fa-location-dot"></i> 25/B Lal Qila, New Delhi, India</a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="far fa-envelopes"></i> <span className="__cf_email__" >xyz@gmail.com</span></a>
                                        </li>
                                        <li>
                                            <a href="tel:+91 123 456 7898"><i className="far fa-phone-volume"></i> +91 123 456 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-navigation">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container position-relative">
                            <Link to="/" className="navbar-brand">
                                <h2 className='text-dark mb-0'>Logo</h2>
                                {/* <img src="assets/img/logo/logo.png" alt="logo"/> */}
                            </Link>
                            <div className="mobile-menu-right">
                                <div className="search-btn">
                                    <button type="button" className="nav-right-link search-box-outer"
                                        onClick={() => setSearchOpen(true)}>
                                        <i className="far fa-search"></i></button>
                                </div>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-mobile-icon"><i className="far fa-bars"></i></span>
                                </button>
                            </div>
                            <div className="collapse navbar-collapse" id="main_nav">
                                <ul className="navbar-nav">
                                    <li className="nav-item ">
                                        <Link to="/" className="nav-link " >Home</Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Courses</a>
                                        <ul className="dropdown-menu fade-down">
                                            <li><Link to="/course-one" className="dropdown-item">Courses One</Link></li>
                                            <li><Link to="/course-two" className="dropdown-item">Courses Two</Link></li>
                                        </ul>
                                    </li>


                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Admissions</a>
                                        <ul className="dropdown-menu fade-down">
                                            <li><Link to="/how-to-apply" className="dropdown-item" >How To Apply</Link></li>
                                            <li><Link to="/application-form" className="dropdown-item" >Application Form</Link></li>
                                            <li><Link to="/tuition-fee" className="dropdown-item" >Tuition Fees</Link></li>
                                            <li><Link to="/alumni" className="dropdown-item">Alumni</Link></li>
                                            <li><Link to="/scholarship" className="dropdown-item">Scholarships</Link></li>
                                        </ul>
                                    </li>
                                                                     
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Pages</a>
                                        <ul className="dropdown-menu fade-down">
                                            <li><Link to="/about" className="dropdown-item ">About Us</Link></li>
                                            <li><Link to="/login" className="dropdown-item" >Login</Link></li>
                                            <li><Link to="/register" className="dropdown-item">Register</Link></li>
                                            <li><Link to="/forgot-password" className="dropdown-item">Forgot Password</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Blog</a>
                                        <ul className="dropdown-menu fade-down">
                                            <li><Link to="/blog" className="dropdown-item" >Blog</Link></li>
                                            <li><Link to="/blog-single" className="dropdown-item">Blog Single</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item"><Link to="/contact" className="nav-link" >Contact</Link></li>
                                </ul>
                                <div className="nav-right">
                                    <div className="search-btn">
                                        <button type="button"
                                            onClick={() => setSearchOpen(true)} className="nav-right-link search-box-outer"><i
                                                className="far fa-search"></i></button>
                                    </div>
                                    <div className="nav-right-btn mt-2">
                                        <Link to="/application-form" className="theme-btn"><span
                                            className="fal fa-pencil"></span>Apply Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* popup search  */}
            <div className={`search-popup ${searchOpen ? "search-active" : ""}`}>
                <button className="close-search" onClick={() => setSearchOpen(false)}><span className="far fa-times"></span></button>
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input type="search" name="search-field" placeholder="Search Here..." required />
                        <button type="submit"><i className="far fa-search"></i></button>
                    </div>
                </form>
            </div>
            {/* popup search end  */}
        </>
    )
}

export default Header