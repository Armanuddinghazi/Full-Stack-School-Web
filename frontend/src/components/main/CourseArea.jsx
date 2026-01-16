import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { highlightLastWords } from "../../utils/highlightLastWords";
import useSection from "../../hooks/useSection";
import CourseSkeleton from "../ui/CourseSkeletonItem";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const CourseArea = () => {

  const section = useSection("courses");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchCourses = async () => {
  //   try {
  //     const res = await apiClient.get("/courses");
  //     setCourses(res.data);
  //   } catch (err) {
  //     console.error("Course fetch error", err);
  //   }
  // };

  const fetchCourses = async () => {
    try {
      const res = await apiClient.get("/courses");
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Course fetch error", err);
      setCourses([]);
    } finally {
          setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

    if (loading) return <CourseSkeleton />;

  return (
    <>

      <div className="course-area py-80">
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
            <div className="row">
                {courses.slice(0, 6).map((course, index) => (
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
                          src={`${API_URL}${course.image}`}
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
                ))}
            </div>

          </div>

        </div>
      </div>
    </>

  );
};

export default CourseArea;
