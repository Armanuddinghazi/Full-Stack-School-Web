import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    apiClient.get("/blogs").then(res => setBlogs(res.data));
  }, []);

  return (
    <>
      <div className="blog-area py-120">
        <div className="container">
          {/* Heading */}
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center" data-aos="fade-up">
                <span className="site-title-tagline">
                  <i className="far fa-book-open-reader"></i> Our Blog
                </span>
                <h2 className="site-title">
                  Latest News & <span>Blog</span>
                </h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div>
            </div>
          </div>

          {/* Blog Cards */}
          <div className="row">
            {blogs.slice(0, 3).map((item, index) => (
              <div className="col-md-6 col-lg-4"
                key={item._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}>
                <div className="blog-item">
                  <div className="blog-date">
                    <i className="fal fa-calendar-alt"></i> {item.date}
                  </div>

                  <div className="blog-item-img">
                    <img src={`${API_URL}${item.image}`} alt="Blog" />
                  </div>

                  <div className="blog-item-info">
                    <div className="blog-item-meta">
                      <ul>
                        <li><i className="far fa-user-circle"></i> {item.author}</li>
                        <li><i className="far fa-comments"></i> {item.comments} Comments</li>
                      </ul>
                    </div>

                    <h4 className="blog-title">
                      <Link to={`/blog-single`}>{item.title}</Link>
                    </h4>

                    <Link className="theme-btn" to={`/blog-single}`}>
                      Read More <i className="fas fa-arrow-right-long"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
