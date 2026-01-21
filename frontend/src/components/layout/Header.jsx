import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const Header = () => {
    const [data, setData] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [notices, setNotices] = useState([]);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const BASE_URL = import.meta.env.VITE_API_URL_IMG;

    useEffect(() => {
        apiClient.get("/notices")
            .then(res => setNotices(res.data))
            .catch(err => console.error(err));
    }, []);

    // 1. Fetch Data
    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const res = await apiClient.get('/header');
                setData(res.data);
            } catch (error) {
                console.error("Header load failed", error);
            }
        };
        fetchHeader();

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


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSubMenu = (index) => {
        if (activeSubMenu === index) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(index);
        }
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
        setActiveSubMenu(null);
    };

    if (!data) return null;

    return (
        <>
            <header className={`header ${isSticky ? "sticky-header" : ""}`}>
                {/* TOP BAR */}
                <div className={`header-top ${isSticky ? "hide-top" : ""}`}>
                    <div className="container">
                        <div className="header-top-wrap">
                            <div className="header-top-left">
                                <div className="header-top-social">
                                    <span className='me-2'>Follow Us: </span>
                                    {/* DYNAMIC SOCIAL ICONS */}
                                    {data.socialLinks?.map((social, index) => (
                                        <a key={index} href={social.url} target="_blank" rel="noreferrer">
                                            <i className={social.icon}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="header-top-right">
                                <div className="header-top-contact">
                                    <ul>
                                        {data.contact?.address && (
                                            <li><a href="#"><i className="far fa-location-dot"></i>{data.contact.address}</a></li>
                                        )}
                                        {data.contact?.email && (
                                            <li><a href={`mailto:${data.contact.email}`}><i className="far fa-envelopes"></i> {data.contact.email}</a></li>
                                        )}
                                        {data.contact?.phone && (
                                            <li><a href={`tel:${data.contact.phone}`}><i className="far fa-phone-volume"></i> {data.contact.phone}</a></li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN NAVIGATION */}
                <div className="main-navigation">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container position-relative">
                            <Link to="/" className="navbar-brand">
                                {data.logo ? (
                                    <img src={`${BASE_URL}${data.logo}`} width={68} alt="logo" />
                                ) : <h2>Logo</h2>}
                            </Link>

                            <div className="mobile-menu-right">
                                <button className="navbar-toggler" type="button" onClick={toggleMobileMenu}>
                                    <span className="navbar-toggler-mobile-icon"><i className="fa-jelly fa-regular fa-bars"></i></span>
                                </button>
                            </div>

                            <div className="collapse navbar-collapse" id='main_nav'>
                                <ul className="navbar-nav">
                                    {/* DYNAMIC MENUS LOOP */}
                                    {data.menuItems?.map((menu, index) => {
                                        const hasDropdown = menu.children && menu.children.length > 0;

                                        return (
                                            <li key={index} className={`nav-item ${hasDropdown ? "dropdown" : ""}`}>
                                                {hasDropdown ? (
                                                    <>
                                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">{menu.label}</a>
                                                        <ul className="dropdown-menu fade-down">
                                                            {menu.children.map((child, cIndex) => (
                                                                <li key={cIndex}>
                                                                    <Link to={child.path} className="dropdown-item">{child.label}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <Link to={menu.path} className="nav-link">{menu.label}</Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* RIGHT SIDE BUTTON */}
                                <div className="nav-right">
                                    <div className="nav-right-btn mt-2">
                                        <Link to={data.actionButton?.url || '#'} className="theme-btn">
                                            <span className="fal fa-pencil"></span> {data.actionButton?.text}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="notice-bar">
                    <div className="notice-track">
                        {notices.map((item) => (
                            <span key={item._id}> {item.text} |</span>
                        ))}
                    </div>
                </div>
            </header>


            {/* 1. OVERLAY */}

            <div
                className={`mobile-nav-overlay ${isMobileMenuOpen ? "active" : ""}`}
                onClick={closeMenu}
            ></div>

            <div className={`mobile-nav-wrap ${isMobileMenuOpen ? "active" : ""}`}>
                <div className="sidebar-logo d-flex  justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand">
                        {data.logo ? (
                            <img src={`${BASE_URL}${data.logo}`} width={60} alt="logo" />
                        ) : <h2>Logo</h2>}
                    </Link>
                    <span className="close-btn-mobile" onClick={closeMenu}><i className="fa-regular fa-x"></i></span>
                </div>
                <ul className="mobile-menu-list">
                    {/* DYNAMIC MENUS LOOP */}
                    {data.menuItems?.map((menu, index) => {
                        const hasDropdown = menu.children && menu.children.length > 0;
                        const isActive = activeSubMenu === index;
                        return (
                            <li key={index} className="mobile-menu-item">
                                {hasDropdown ? (
                                    <>
                                        <div
                                            className={`mobile-nav-link ${isActive ? "active-menu" : ""}`}
                                            onClick={() => toggleSubMenu(index)}>{menu.label}
                                            <span className="dropdown-arrow">
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </span></div>
                                        <ul 
                                        className="mobile-sub-menu"
                                            style={{ maxHeight: isActive ? "500px" : "0px" }}>
                                            {menu.children.map((child, cIndex) => (
                                                <li key={cIndex} className="mobile-sub-item">
                                                    <Link to={child.path} onClick={closeMenu}>{child.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link to={menu.path} className="mobile-nav-link" onClick={closeMenu}>{menu.label}</Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>

    );
};

export default Header;


