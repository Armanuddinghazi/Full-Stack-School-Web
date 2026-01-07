import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const HeroAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: null
  });

  // 🔹 Fetch slides
  const fetchSlides = async () => {
    const res = await apiClient.get("/hero");
    setSlides(res.data);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // 🔹 Reset form
  const resetForm = () => {
    setEditingId(null);
    setData({
      title: "",
      subtitle: "",
      description: "",
      image: null
    });
  };

  // 🔹 Add new banner
 const save = async () => {
  if (
    !data.title?.trim() ||
    !data.subtitle?.trim() ||
    !data.description?.trim() ||
    !data.image
  ) {
    toast.error("All fields are required ");
    return; 
  }

  const form = new FormData();
  form.append("title", data.title);
  form.append("subtitle", data.subtitle);
  form.append("description", data.description);
  form.append("image", data.image);

  try {
    await apiClient.post("/hero", form, {
      headers: { Authorization: localStorage.getItem("token") }
    });

    toast.success(" New Banner Added Successfully");
    resetForm();
    fetchSlides();

  } catch (err) {
    console.log('something went wrong', err);
  }
};


  // 🔹 Update banner
  const update = async () => {
    if (!editingId) return;

    const form = new FormData();
    form.append("title", data.title);
    form.append("subtitle", data.subtitle);
    form.append("description", data.description);
    if (data.image) form.append("image", data.image);

    await apiClient.put(`/hero/${editingId}`,
      form,
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    toast.success("Banner Updated Successfully");
    resetForm();
    fetchSlides();
  };

  const deleteSlide = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (!confirmDelete) return;

    try {
      const slideDlt = await apiClient.delete(
        `/hero/${id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log('delete slide', slideDlt);
      toast.success("Banner Deleted Successfully");
      if (editingId === id) {
        resetForm();
      }
      fetchSlides();

    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data);
      toast.error("Delete failed");
    }
  };




  // 🔹 Edit click
  const editSlide = (slide) => {

    setEditingId(slide._id);
    setData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: null 
    });
  };




  return (


    <>
      <>
        <div className="container py-4">
          {/* Header */}
          <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
            <h5 className="mb-0">
              <i className="fa-solid fa-images me-2 text-primary"></i>
              Hero Banner Manager
            </h5>
          </div>

          <div className="row">
          <div className="col-lg-5">
            {/* Form Card */}
          <div className="card custom-card mb-4">
            <div className="card-header card-header-custom bg-primary text-white fw-semibold">
              <i className="fa-solid fa-pen-to-square me-2"></i>
              {editingId ? "Update Banner" : "Add New Banner"}
            </div>

            <div className="card-body">
              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    value={data.title}
                    className="form-control"
                    placeholder="Enter title"
                    onChange={e => setData({ ...data, title: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Subtitle</label>
                  <input
                    value={data.subtitle}
                    className="form-control"
                    placeholder="Enter subtitle"
                    onChange={e => setData({ ...data, subtitle: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="5"
                    value={data.description}
                    className="form-control"
                    placeholder="Enter description"
                    onChange={e => setData({ ...data, description: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Banner Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={e => setData({ ...data, image: e.target.files[0] })}
                  />
                </div>

              </div>
            </div>

            <div className="card-footer text-end">
              {editingId ? (
                <>
                  <button className="btn btn-success light btn-radius-8 me-2 py-2" onClick={update}>
                    <i className="fa-solid fa-rotate me-1"></i>
                    Update
                  </button>
                  <button className="btn btn-danger light btn-radius-8 py-2" onClick={resetForm}>
                    <i className="fa-solid fa-xmark me-1"></i>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary btn-radius-8 py-2" onClick={save}>
                  <i className="fa-solid fa-plus me-1"></i>
                  Add Banner
                </button>
              )}
            </div>
          </div>
          </div>
          <div className="col-lg-7">
              {/* Slides List */}
          <div className="card custom-card">
            <div className="card-header card-header-custom bg-dark text-white fw-semibold">
              <i className="fa-solid fa-list me-2"></i>
              Existing Banners
            </div>

           <div className="card-body">
             <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {slides.map(slide => (
                    <tr key={slide._id} className="py-5">
                      <td className="fw-semibold text-nowrap">{slide.title}</td>
                      <td className="text-nowrap">{slide.subtitle}</td>
                      <td className="text-end d-flex">
                        <button
                          className="btn btn-sm btn-primary light sharp me-2"
                          onClick={() => editSlide(slide)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-danger light sharp"
                          disabled={editingId === slide._id}
                          onClick={() => deleteSlide(slide._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!slides.length && (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        <i className="fa-solid fa-circle-info me-2"></i>
                        No banners found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
           </div>
          </div>
          </div>
          </div>

        </div>
      </>

    </>

  );
};

export default HeroAdmin;










