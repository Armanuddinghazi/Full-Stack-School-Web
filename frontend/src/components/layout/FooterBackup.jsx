import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../api/apiClient';

const BASE_URL = import.meta.env.VITE_API_URL_IMG;

const Footer = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        apiClient.get("/headertop")
            .then(res => setData(res.data))
            .catch(err => console.error(err));

    }, []);
      if (!data || !data.socialLinks) return null;
    return (
        <>
            <footer className="footer-area">
                <div className="footer-widget">
                    <div className="container">
                        <div className="row footer-widget-wrapper pt-100 pb-70">
                            <div className="col-md-6 col-lg-4" data-aos="fade-right">
                                <div className="footer-widget-box about-us">
                                    <Link to="/" className="footer-logo" >
                                        <img src={`${BASE_URL}${data.footerLogo}`} width={100} alt="logo"/>
                                    </Link>
                                    
                                    <p className="mb-3">
                                        {data.footerContent}
                                    </p>
                                    <ul className="footer-contact">
                                        <li><Link to="/el:+91 123 456 7898"><i className="far fa-phone"></i>{data.phone}</Link></li>
                                        <li><i className="far fa-map-marker-alt"></i>{data.address}</li>
                                        <li><Link to="/"><i
                                            className="far fa-envelope"></i><span className="__cf_email__" >{data.email}</span></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-2" data-aos="fade-right" data-aos-delay="100">
                                <div className="footer-widget-box list">
                                    <h4 className="footer-widget-title">Quick Links</h4>
                                    <ul className="footer-list">
                                        <li><Link to="/"><i className="fas fa-caret-right"></i> Home</Link></li>
                                        <li><Link to="/about"><i className="fas fa-caret-right"></i> About Us</Link></li>
                                        <li><Link to="/course-one"><i className="fas fa-caret-right"></i> Course One</Link></li>
                                        <li><Link to="/course-two"><i className="fas fa-caret-right"></i> Course Two</Link></li>
                                        <li><Link to="/blog"><i className="fas fa-caret-right"></i> Our Blog</Link></li>
                                        <li><Link to="/blog-single"><i className="fas fa-caret-right"></i> Blog Single</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3" data-aos="fade-right" data-aos-delay="200">
                                <div className="footer-widget-box list">
                                    <h4 className="footer-widget-title">Our Campus</h4>
                                    <ul className="footer-list">
                                        <li><Link to="/how-to-apply"><i className="fas fa-caret-right"></i> How To Apply</Link></li>
                                        <li><Link to="/application-form"><i className="fas fa-caret-right"></i> Application Form</Link></li>
                                        <li><Link to="/tuition-fee"><i className="fas fa-caret-right"></i> Tuition Fee</Link></li>
                                        <li><Link to="/alumni"><i className="fas fa-caret-right"></i> Alumni</Link></li>
                                        <li><Link to="/scholarship"><i className="fas fa-caret-right"></i> Scholarships</Link></li>
                                        <li><Link to="/contact"><i className="fas fa-caret-right"></i> Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3" data-aos="fade-right" data-aos-delay="300">
                                <div className="footer-widget-box list">
                                    <h4 className="footer-widget-title">Newsletter</h4>
                                    <div className="footer-newsletter">
                                        <p>Subscribe Our Newsletter To Get Latest Update And News</p>
                                        <div className="subscribe-form">
                                            <form action="#">
                                                <input type="email" className="form-control" placeholder="Your Email" />
                                                <button className="theme-btn" type="submit">
                                                    Subscribe Now <i className="far fa-paper-plane"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <div className="container">
                        <div className="copyright-wrapper">
                            <div className="row">
                                <div className="col-md-6 align-self-center">
                                    <p className="copyright-text">
                                        &copy; 25-2026 Copyright <span id="date"></span> <Link to="/"> Xyz </Link> All Rights Reserved.
                                    </p>
                                </div>
                                <div className="col-md-6 align-self-center">
                                    <ul className="footer-social">
                                        <li><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                        <li><Link to="/"><i className="fab fa-linkedin-in"></i></Link></li>
                                        <li><Link to="/"><i className="fab fa-whatsapp"></i></Link></li>
                                        <li><Link to="/"><i className="fab fa-youtube"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer