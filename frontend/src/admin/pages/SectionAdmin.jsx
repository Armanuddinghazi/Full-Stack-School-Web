import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const SectionAdmin = () => {

  const [sectionKey, setSectionKey] = useState("courses");
  const [form, setForm] = useState({
    tagline: "",
    heading: "",
    paragraph: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const fetchSection = async (key) => {
    try {
      const res = await apiClient.get(`/sections/${key}`);
      if (res.data) {
        setForm({
          tagline: res.data.tagline || "",
          heading: res.data.heading || "",
          paragraph: res.data.paragraph || "",
        });
        setIsEdit(true);
      } else {
        // setForm({ tagline: "", heading: "", paragraph: "" });
        resetForm();
      }
    } catch (error) {
      resetForm();
    }
  };

  useEffect(() => {
    fetchSection(sectionKey);
  }, [sectionKey]);

  const save = async () => {
    try {
      await apiClient.post("/sections", {
        sectionKey,
        ...form,
      });

      toast.success(
        isEdit ? "Section updated successfully" : "Section added successfully"
      );

      setIsEdit(true);
    } catch (err) {
      toast.error("Failed to save section");
    }
  };

  const resetForm = () => {
    setForm({
      tagline: "",
      heading: "",
      paragraph: "",
    });
    setIsEdit(false);
  };


  return (
    <>
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
          <h5 className="mb-0">
            <i className="fa-solid fa-images me-2 text-primary"></i>
            Section Admin CMS ({sectionKey.toUpperCase()})
          </h5>
        </div>
        <div className="row">
          <div className="col-lg-9 m-auto">
            {/* Form Card */}
            <div className="card custom-card mb-4">
              <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                <i className="fa-solid fa-pen-to-square me-2"></i>
                <h5 className="mb-0">{isEdit ? `Update ${sectionKey}` : `Add ${sectionKey}`}</h5>
              </div>

              <div className="card-body">
                <div className="row g-3">
                  <div className="col-lg-6">
                    <label htmlFor="">Select Section</label>
                    <select className="form-select" value={sectionKey} onChange={e => setSectionKey(e.target.value)}>
                      <option value="courses">Courses</option>
                      <option value="team">Team</option>
                      <option value="gallery">Gallery</option>
                      <option value="department">Department</option>
                      <option value="blogs">Blog</option>
                      <option value="features">Feature</option>
                      <option value="applypage">How To Apply</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="testimonials">Testimonial</option>
                    </select>
                   
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="">Tagline</label>
                    <input
                      className="form-control"
                      placeholder="Tagline"
                      value={form.tagline}
                      onChange={e => setForm({ ...form, tagline: e.target.value })}
                    />
                  </div>

                  <div className="col-lg-12">
                    <label htmlFor="">Heading</label>
                    <input
                      className="form-control"
                      placeholder="Heading"
                      value={form.heading}
                      onChange={e => setForm({ ...form, heading: e.target.value })}
                    />
                  </div>

                  <div className="col-lg-12">
                    <label htmlFor="">Description</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Paragraph"
                      value={form.paragraph}
                      onChange={e => setForm({ ...form, paragraph: e.target.value })}
                    />
                  </div>


                </div>
              </div>
              <div className="card-footer text-center">
                {/* <button onClick={save}>Save</button> */}
                <button className={`btn me-2 py-2 btn-radius-8 ${isEdit ? "btn-success light" : "btn-primary"}`} onClick={save}>
                  {isEdit ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                  {isEdit ? "Update" : "Add"}
                </button>

                {isEdit && (
                  <button className="btn btn-danger light py-2 btn-radius-8" onClick={resetForm}>
                    <i className="fa-solid fa-xmark me-1"></i>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionAdmin;
