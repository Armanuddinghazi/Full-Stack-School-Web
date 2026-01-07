import React, { useState, useEffect } from "react";
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import apiClient from "../../api/apiClient";



const CourseOne = () => {

    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedCourses = courses.slice(startIndex, endIndex);

    const fetchCourses = async () => {
        try {
            const res = await apiClient.get("/courses");
            setCourses(res.data);
        } catch (err) {
            console.error("Course fetch error", err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <>
            <Breadcrumb
                title="Our Courses"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Our Courses", active: true }
                ]}
            />
            <div className="course-area py-120">
                <div className="container">

                    {/* Heading */}
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center" data-aos="fade-up">
                                <span className="site-title-tagline">
                                    <i className="far fa-book-open-reader"></i> Our Courses
                                </span>
                                <h2 className="site-title">
                                    Let's Check Our <span>Courses</span>
                                </h2>
                                <p>
                                    It is a long established fact that a reader will be distracted by
                                    the readable content of a page when looking at its layout.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Courses */}
                    <div className="row">
                        <div className="row">
                            {paginatedCourses.map((course, index) => (
                                <div
                                    key={course._id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    className="col-md-6 col-lg-4"
                                >
                                    <div className="course-item">

                                        <div className="course-img">
                                            <span className="course-tag">
                                                <i className="far fa-bookmark"></i> {course.tag}
                                            </span>
                                            <img
                                                src={`http://localhost:5000${course.image}`}
                                                alt={course.title}
                                                className="img-fluid"
                                            />
                                            <Link to="/course-one" className="btn">
                                                <i className="far fa-link"></i>
                                            </Link>

                                        </div>

                                        <div className="course-content">
                                            <div className="course-meta">
                                                <span className="course-meta-left">
                                                    <i className="far fa-book"></i> {course.lessons} Lessons
                                                </span>

                                                <div className="course-rating">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i
                                                            key={i}
                                                            className={
                                                                i < Math.round(course.rating)
                                                                    ? "fas fa-star"
                                                                    : "far fa-star"
                                                            }
                                                        ></i>
                                                    ))}
                                                    <span>({course.rating})</span>
                                                </div>
                                            </div>

                                            <h4 className="course-title">{course.title}</h4>

                                            <p className="course-text">
                                                {course.description?.slice(0, 150)}...
                                            </p>

                                            <div className="course-bottom">
                                                <div className="course-bottom-left">
                                                    <span>
                                                        <i className="far fa-users"></i> {course.seats} Seats
                                                    </span>
                                                    <span>
                                                        <i className="far fa-clock"></i> {course.duration}
                                                    </span>
                                                </div>

                                                <span className="course-price">{course.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* pagination  */}
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            current={currentPage}
                            total={courses.length}
                            pageSize={pageSize}
                            onChange={(page) => setCurrentPage(page)}
                            showLessItems
                        />
                    </div>
                  
                    {/* pagination end  */}

                </div>
            </div>
        </>

    );
};

export default CourseOne;
