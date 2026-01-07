import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

const AboutAdmin = () => {
  const [about, setAbout] = useState(null);
  const [form, setForm] = useState({
    tagline: "",
    heading: "",
    description: "",
    quote: "",
    experienceText: "",
    img1: null,
    img2: null,
    img3: null,
  });

  const fetchAbout = async () => {
    try {
      const res = await apiClient.get("/about");
      if (res.data) {
        setAbout(res.data);
        setForm(res.data);
      }
    } catch {
      console.log("No about data found");
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) data.append(key, form[key]);
      });

      let res;

      if (about?._id) {
        res = await apiClient.put(`/about/${about._id}`, data);
        toast.success("Updated successfully");
      } else {
        res = await apiClient.post("/about", data);
        toast.success("Added successfully");
      }
      setAbout(res.data);
      setForm(res.data);

    } catch (err) {
      console.error(err);
      toast.error("failed");
    }
  };


  const handleDelete = async () => {
    try {
      await apiClient.delete(`/about/${about._id}`);
      setAbout(null);

      setForm({
        tagline: "",
        heading: "",
        description: "",
        quote: "",
        experienceText: "",
        img1: null,
        img2: null,
        img3: null,
      });

      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className="container py-4">
        {/* Header */}
         <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
            <h5 className="mb-0">
              <i className="fa-solid fa-images me-2 text-primary"></i>
              About Admin Manager
            </h5>
          </div>

        <div className="row">
          <div className="col-lg-12">
            {/* Form Card */}
            <div className="card custom-card mb-4">
              <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                <i className="fa-solid fa-pen-to-square me-2"></i>
                <h5 className="mb-0">{about ? "Update About" : "Add About"}</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="form-label">Tagline</label>
                    <input name="tagline" className="form-control"
                      value={form.tagline || ""}
                      onChange={handleChange} placeholder="Tagline" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-label">Heading</label>
                    <input name="heading" className="form-control"
                      value={form.heading || ""}
                      onChange={handleChange} placeholder="Heading" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="form-label">Experience Text</label>
                    <input name="experienceText" className="form-control"
                      value={form.experienceText || ""}
                      onChange={handleChange} placeholder="Experience Text" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="form-label">Description </label>
                    <textarea name="description" rows={5} className="form-control"
                      value={form.description || ""}
                      onChange={handleChange} placeholder="Description" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="form-label">Qoute Description</label>
                    <textarea name="quote" rows={5} className="form-control"
                      value={form.quote || ""}
                      onChange={handleChange} placeholder="Description Quote" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-label">Image 1</label>
                    <input type="file" className="form-control" name="img1" onChange={handleImage} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-label">Image 2</label>
                    <input type="file" className="form-control" name="img2" onChange={handleImage} />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="form-label">Image 3</label>
                    <input type="file" className="form-control" name="img3" onChange={handleImage} />
                  </div>
                </div>
              </div>
              <div className="card-footer text-end ">
                <button onClick={handleSubmit} className="btn btn-primary me-2 py-2 btn-radius-8">
                  <i className="fa fa-save"></i> {about ? "Update" : "Save"}
                </button>

                {about && (
                  <button onClick={handleDelete} className="btn btn-danger light py-2 btn-radius-8">
                    <i className="fa fa-trash"></i> Delete
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

export default AboutAdmin;
