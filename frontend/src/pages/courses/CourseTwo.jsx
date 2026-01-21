import React, { useState, useEffect } from "react";
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import apiClient from "../../api/apiClient";
import useSection from "../../hooks/useSection";
import { highlightLastWords } from "../../utils/highlightLastWords";


const CourseTwo = () => {

    const section = useSection('courses')
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const pageSize = 4;

    const [selectedCategory, setSelectedCategory] = useState("All");


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


    const categories = ["All", ...new Set(courses.map(c => c.tag).filter(tag => tag))];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || course.tag === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    return (
        <>
            <Breadcrumb
                title="Our Courses Two"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Our Courses Two", active: true }
                ]}
            />
            <div className="course-area py-120">
                <div className="container">

                    {/* Heading */}
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center" data-aos="fade-up">
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

                    {/* Courses */}
                    <div className="row">
                        <div className="col-xl-8 col-lg-8">
                            <div className="row">
                                {paginatedCourses.length > 0 ? (
                                    paginatedCourses.map((course, index) => (
                                        <div
                                            key={course._id}
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                            className="col-md-6"
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

                                                        <span className="course-price">₹ {course.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12 text-center">
                                        <p className="text-muted mt-4">
                                            <i className="fa-duotone fa-solid fa-face-frown me-1"></i>
                                            No courses found in <span className="text-clr">"{selectedCategory}"</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* pagination  */}
                            {filteredCourses.length > pageSize && (
                                <div className="d-flex justify-content-center mt-4">
                                    <Pagination
                                        current={currentPage}
                                        total={filteredCourses.length}
                                        pageSize={pageSize}
                                        onChange={(page) => setCurrentPage(page)}
                                        showLessItems
                                    />
                                </div>
                            )}
                            {/* pagination end  */}
                        </div>
                        <div className="col-xl-4 col-lg-4">
                            <div className="course-sidebar">
                                <div className="widget search" data-aos="fade-left">
                                    <h5 className="widget-title">Search</h5>
                                    <form className="search-form"
                                    onSubmit={(e) => e.preventDefault()}>
                                        <input type="text"
                                            className="form-control"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            placeholder="Search Here..." />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (searchTerm) {
                                                    setSearchTerm(""); 
                                                    setCurrentPage(1); 
                                                }
                                            }}
                                        >
                                            <i className={`far ${searchTerm ? "fa-xmark" : "fa-search"}`}></i>
                                        </button>
                                    </form>
                                </div>
                                <div className="widget category" data-aos="fade-left" data-aos-delay="100">
                                    <h4 className="widget-title">Course Category</h4>

                                    <div className="category-list">
                                        {categories.map((cat, index) => (
                                            <span
                                                key={index}
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setCurrentPage(1);
                                                }}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: selectedCategory === cat ? 'var(--theme-color2)' : '',
                                                    fontWeight: selectedCategory === cat ? 'bold' : ''
                                                }}
                                            >
                                                <i className={`far ${selectedCategory === cat ? 'fa-check' : 'fa-long-arrow-right'}`}></i>
                                                {cat}
                                            </span>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>

    );
};

export default CourseTwo;
