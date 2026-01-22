import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const Footer = () => {
    const BASE_URL = import.meta.env.VITE_API_URL_IMG;
    
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {

                const response = await apiClient.get(`/footer`);
                setFooterData(response.data);
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };

        fetchFooterData();
    }, []);

    if (!footerData) {
        return null;
    }

    return (
        <footer className="footer-area">
            <div className="footer-widget">
                <div className="container">
                    <div className="row footer-widget-wrapper pt-50 pb-70">

                        {/* 1. Logo & About Us Section */}
                        <div className="col-md-6 col-lg-5" data-aos="fade-right">
                            <div className="footer-widget-box about-us">
                                <Link to="/" className="footer-logo">
                                    {footerData.logo ? (
                                        <img src={`${BASE_URL}${footerData.logo}`} width={68} alt="logo" />
                                    ) : <h2>Logo</h2>}
                                </Link>


                                <p className="mb-3">
                                    {footerData.aboutContent}
                                </p>

                                <ul className="footer-contact">
                                    {footerData.contact?.phone && (
                                        <li>
                                            <Link to={`tel:${footerData.contact.phone}`}>
                                                <i className="far fa-phone"></i>{footerData.contact.phone}
                                            </Link>
                                        </li>
                                    )}
                                    {footerData.contact?.address && (
                                        <li>
                                            <i className="far fa-map-marker-alt"></i>{footerData.contact.address}
                                        </li>
                                    )}
                                    {footerData.contact?.email && (
                                        <li>
                                            <Link to={`mailto:${footerData.contact.email}`}>
                                                <i className="far fa-envelope"></i>
                                                <span className="__cf_email__">{footerData.contact.email}</span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* 2. Dynamic Menu Columns  */}
                        {footerData.menuColumns?.map((column, index) => (
                            <div
                                key={index}
                                className={`col-md-6 ${column.columnClass || 'col-lg-4'}`}
                                data-aos="fade-right"
                                data-aos-delay={(index + 1) * 100}
                            >
                                <div className="footer-widget-box list">
                                    <h4 className="footer-widget-title">{column.title}</h4>
                                    <ul className="footer-list">
                                        {column.links?.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link to={link.url}>
                                                    <i className={link.icon || "fas fa-caret-right"}></i> {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                        {/* 3. Newsletter Section */}
                        <div className="col-md-6 col-lg-3" data-aos="fade-right" data-aos-delay="300">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">{footerData.newsletter?.title}</h4>
                                <div className="footer-newsletter">
                                    <p>{footerData.newsletter?.text}</p>
                                    <div className="subscribe-form">
                                        <form action="#">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder={footerData.newsletter?.placeholder}
                                            />
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

            {/* Copyright & Social Area */}
            <div className="copyright">
                <div className="container">
                    <div className="copyright-wrapper">
                        <div className="row">
                            <div className="col-md-6 align-self-center">
                                <p className="copyright-text">
                                    &copy; {new Date().getFullYear()} {footerData.copyrightText}
                                </p>
                            </div>
                            <div className="col-md-6 align-self-center">
                                <ul className="footer-social">
                                    {footerData.socialLinks?.map((social, index) => (
                                        <li key={index}>
                                            <Link to={social.url} target="_blank">
                                                <i className={social.icon}></i>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;