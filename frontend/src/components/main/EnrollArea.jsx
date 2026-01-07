import { useState } from "react";
import { Link } from "react-router-dom";

const EnrollArea = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enroll Data:", formData);
    // API call here if needed
  };

  return (
    <div className="enroll-area pt-80 pb-80">
      <div className="container">
        <div className="row g-5 align-items-center">

          {/* LEFT FORM */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="enroll-left">
              <div className="enroll-form">
                <div className="enroll-form-header">
                  <h3>Start Your Enrollment</h3>
                  <p>We are variations of passages the have suffered.</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <select
                      className="form-select"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose Course</option>
                      <option value="Art And Design">Art And Design</option>
                      <option value="Acting And Drama">Acting And Drama</option>
                      <option value="Accounting And Finance">Accounting And Finance</option>
                      <option value="Biology And Conservation">Biology And Conservation</option>
                      <option value="Science And Engineering">Science And Engineering</option>
                      <option value="Health Administration">Health Administration</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      className="form-control"
                      placeholder="Type Message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="theme-btn">
                    Enroll Now <i className="fas fa-arrow-right-long"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="enroll-right">
              <div className="skill-content">
                <div className="site-heading mb-3">
                  <span className="site-title-tagline">
                    <i className="far fa-book-open-reader"></i> Our Skills
                  </span>
                  <h2 className="site-title text-white">
                    Explore Your <span>Creativity And Talent</span> With Us
                  </h2>
                </div>

                <p className="text-white">
                  There are many variations of passages available but the majority have suffered
                  alteration in some form by injected humour randomised words which don't look even
                  slightly believable.
                </p>

                {/* SKILLS */}
                <div className="skills-section">
                  <SkillBar title="Our Students" value={85} />
                  <SkillBar title="Our Teachers" value={65} />
                  <SkillBar title="Our Courses" value={75} />
                </div>

                <Link to="/contact" className="theme-btn mt-5">
                  Learn More <i className="fas fa-arrow-right-long"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EnrollArea;

/* Skill Bar Component */
const SkillBar = ({ title, value }) => (
  <div className="progress-box">
    <h5>
      {title} <span className="pull-right">{value}%</span>
    </h5>
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);
