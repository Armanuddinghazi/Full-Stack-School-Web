import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { highlightLastWords } from '../../utils/highlightLastWords';
import useSection from '../../hooks/useSection';
import apiClient from '../../api/apiClient';


const TestimonialPage = () => {
    const section = useSection("testimonials");
    const [testimonials, setTestimonials] = useState([]);

    const IMG_URL = import.meta.env.VITE_API_URL_IMG;

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await apiClient.get('/testimonials');
                setTestimonials(res.data);
            } catch (error) {
                console.error("Error fetching testimonials", error);
            }
        };
        fetchTestimonials();
    }, []);

    // Helper to render stars dynamically
    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star ${i < count ? '' : 'text-muted'}`}></i>
        ));
    };

    return (
        <section className="testimonial-area bg  py-80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="site-heading text-center " data-aos="fade-up">
                            {section && (
                                <>
                                    <span className="site-title-tagline">
                                        <i className="far fa-book-open-reader"></i> {section.tagline}
                                    </span>
                                    <h2 className="site-title">
                                        {highlightLastWords(section.heading, 1)}
                                    </h2>
                                    <p>
                                        {section.paragraph}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <Swiper
                    modules={[ Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    // pagination={{ clickable: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="testimonial-slider"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className="testimonial-item ">
                                {/* Rating */}
                                <div className="testimonial-rate ">
                                    {renderStars(item.rating)}
                                </div>

                                {/* Quote Text */}
                                <div className="testimonial-quote">
                                    <p className="text-muted">
                                        {item.quote}
                                    </p>
                                </div>

                                {/* User Content */}
                                <div className="testimonial-content ">
                                    <div className="testimonial-author-img me-1">
                                        <img
                                            src={`${IMG_URL}${item.image}`}
                                            alt={item.name}
                                            className="rounded-circle"
                                        />
                                    </div>
                                    <div className="testimonial-author-info">
                                        <h4>{item.name}</h4>
                                        <p>{item.role}</p>
                                    </div>
                                </div>

                                {/* Quote Icon */}
                                <span className="testimonial-quote-icon  ">
                                    <i className="fas fa-quote-right "></i>
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialPage;