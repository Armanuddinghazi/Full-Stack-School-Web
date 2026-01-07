import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import contactImg from '../../assets/img/contact/01.jpg'
import { toast } from "react-toastify";
import apiClient from '../../api/apiClient';

const Contact = () => {

    const [contact, setContact] = useState({
        address: "",
        phone: "",
        email: "",
        openTime: "",
        heading: "",
        description: ""
    });

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        apiClient
            .get("/contact")
            .then(res => {
                if (res.data) {
                    setContact(res.data);
                }
            })
            .catch(err => {
                console.error("Contact fetch error", err);
            });
    }, []);


    const submitForm = async (e) => {
        e.preventDefault();
         await apiClient.post("/contact/submit", form);
        toast.success("Message sent successfully");
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <>
            <Breadcrumb
                title="Contact Us"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Contact Us", active: true }
                ]}
            />

            <div className="contact-area py-120">
                <div className="container">
                    <div className="contact-content">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="contact-info">
                                    <div className="contact-info-icon">
                                        <i className="fal fa-map-location-dot"></i>
                                    </div>
                                    <div className="contact-info-content">
                                        <h5>Office Address</h5>
                                        <p>{contact.address}</p>
                                        
                                        {/* <p>25/B Lal Qila, New Delhi, India</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="contact-info">
                                    <div className="contact-info-icon">
                                        <i className="fal fa-phone-volume"></i>
                                    </div>
                                    <div className="contact-info-content">
                                        <h5>Call Us</h5>
                                        <p>{contact.phone}</p>
                                        {/* <p>+91 123 4567 890</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="contact-info">
                                    <div className="contact-info-icon">
                                        <i className="fal fa-envelopes"></i>
                                    </div>
                                    <div className="contact-info-content">
                                        <h5>Email Us</h5>
                                        <p><a href="#" className="__cf_email__" >{contact.email}</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="contact-info">
                                    <div className="contact-info-icon">
                                        <i className="fal fa-alarm-clock"></i>
                                    </div>
                                    <div className="contact-info-content">
                                        <h5>Open Time</h5>
                                        {/* <p>Mon - Sat (10.00AM - 05.30PM)</p> */}
                                        <p>{contact.openTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-wrapper">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="contact-img">
                                    <img src={contactImg} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-7 align-self-center">
                                <div className="contact-form">
                                    <div className="contact-form-header">
                                        <h2>Get In Touch</h2>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis eius doloremque voluptate, nobis libero dicta, quam fuga obcaecati voluptatibus nam, similique maxime aliquid magnam nisi facere. Ipsa nobis sit dignissimos!</p>
                                       
                                    </div>
                                    <form onSubmit={submitForm} id="contact-form">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="name"
                                                        placeholder="Your Name"
                                                        value={form.name}
                                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="email"
                                                        className="form-control" name="email"
                                                        value={form.email}
                                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                                        required
                                                        placeholder="Your Email" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="text"
                                                className="form-control"
                                                name="subject"
                                                placeholder="Your Subject"
                                                value={form.subject}
                                                onChange={e => setForm({ ...form, subject: e.target.value })}
                                                required />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="message" cols="30" rows="5"
                                                className="form-control"
                                                placeholder="Write Your Message"
                                                value={form.message}
                                                onChange={e => setForm({ ...form, message: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="theme-btn">Send
                                            Message <i className="far fa-paper-plane"></i></button>
                                        <div className="col-md-12 mt-3">
                                            <div className="form-messege text-success"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact