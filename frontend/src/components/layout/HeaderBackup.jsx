


import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../api/apiClient';

const BASE_URL = import.meta.env.VITE_API_URL_IMG;

const Header = () => {

    const [isSticky, setIsSticky] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [data, setData] = useState(null);

    const [notices, setNotices] = useState([]);


    useEffect(() => {
        apiClient.get("/notices")
            .then(res => setNotices(res.data))
            .catch(err => console.error(err));
        apiClient.get("/headertop")
            .then(res => {
                setData(res.data)
                console.log('response header', res);
            })
            .catch(err => console.error(err));

    }, []);



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

    if (!data || !data.socialLinks) return null;

    return (
        <>
            <header className={`header ${isSticky ? "sticky-header" : ""}`}>
                <div className={`header-top ${isSticky ? "hide-top" : ""}`}>
                    <div className="container">
                        <div className="header-top-wrap">
                            <div className="header-top-left">
                                <div className="header-top-social">
                                    <span className='me-2'>Follow Us: </span>
                                    <a href={data.socialLinks.facebook || "#"} target="_blank">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                    <a href={data.socialLinks.instagram || "#"} target="_blank">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href={data.socialLinks.twitter || "#"} target="_blank">
                                        <i className="fa-brands fa-x-twitter"></i>
                                    </a>
                                    <a href={data.socialLinks.whatsapp ? `https://wa.me/${data.socialLinks.whatsapp}` : "#"} target="_blank">
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>

                                </div>
                            </div>
                            <div className="header-top-right">
                                <div className="header-top-contact">
                                    <ul>
                                        <li>
                                            <a href="#"><i className="far fa-location-dot"></i>{data.address}</a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="far fa-envelopes"></i> <span className="__cf_email__" >{data.email}</span></a>
                                        </li>
                                        <li>
                                            <a href="tel:+91 123 456 7898"><i className="far fa-phone-volume"></i> {data.phone}</a>
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
                                {/* <h2 className='text-dark mb-0'>Logo</h2> */}
                                <img
                                    src={`${BASE_URL}${data.headerLogo}`}
                                    width={80}
                                    alt="logo"
                                />

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
                                    <li className="nav-item ">
                                        <Link to="/about" className="nav-link">About Us</Link>
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
                                            <li><Link to="/admission-form" className="dropdown-item" >Application Form</Link></li>
                                            <li><Link to="/tuition-fee" className="dropdown-item" >Tuition Fees</Link></li>
                                            <li><Link to="/free-structure" className="dropdown-item" >Free Structure</Link></li>
                                            <li><Link to="/infrastructure" className="dropdown-item" >Infrastructure</Link></li>
                                            <li><Link to="/careers" className="dropdown-item">Careers</Link></li>     
                                            <li><Link to="/scholarship" className="dropdown-item">Scholarships</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Blog</a>
                                        <ul className="dropdown-menu fade-down">
                                            <li><Link to="/blog" className="dropdown-item" >Blog</Link></li>
                                            <li><Link to="/blog-latest" className="dropdown-item">Blog Single</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item"><Link to="/mandatory-disclosure" className="nav-link" >Mandatory Disclosure</Link></li>
                                    <li className="nav-item"><Link to="/contact" className="nav-link" >Contact</Link></li>
                                </ul>
                                <div className="nav-right">
                                    <div className="search-btn d-none">
                                        <button type="button"
                                            onClick={() => setSearchOpen(true)} className="nav-right-link search-box-outer"><i
                                                className="far fa-search"></i></button>
                                    </div>
                                    <div className="nav-right-btn mt-2">
                                        <Link to="/admission-form" className="theme-btn"><span
                                            className="fal fa-pencil"></span>Apply Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="notice-bar">
                    <div className="notice-track">
                        {/* <span> Admission Open for Session 2026–27 |</span>
                        <span> Annual Exams start from 10 March |</span>
                        <span> Parent-Teacher Meeting on 5 February |</span>
                        <span> School will remain closed on Sunday |</span>
                        <span> Bus facility available for all routes |</span> */}
                        {notices.map((item) => (
                            <span key={item._id}> {item.text} |</span>
                        ))}
                    </div>
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