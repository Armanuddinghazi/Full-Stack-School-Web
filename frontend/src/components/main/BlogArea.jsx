import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";
import { highlightLastWords } from "../../utils/highlightLastWords";
import useSection from "../../hooks/useSection";
import BlogSkeleton from "../ui/BlogSkeleton";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const Blog = () => {
  const section = useSection('blogs')
  const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await apiClient.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("blogs fetch error", err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (loading) return <BlogSkeleton />;

  return (
    <>
      <div className="blog-area  bg  py-120">
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
                      <Link to={`/blog/${item._id}`}>{item.title}</Link>
                    </h4>

                    <Link className="theme-btn" to={`/blog/${item._id}`}>
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
