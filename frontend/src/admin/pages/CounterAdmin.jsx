import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const CounterAdmin = () => {
  const [counters, setCounters] = useState([]);
  const [form, setForm] = useState({
    title: "",
    value: "",
    icon: "course"
  });
  const [editId, setEditId] = useState(null);

  const fetchCounters = () => {
    apiClient.get("/counter")
      .then(res => setCounters(res.data));

  };

  useEffect(() => {
    fetchCounters();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await apiClient.put(`/counter/${editId}`, form);
        toast.success("Counter updated successfully");
      } else {
        await apiClient.post("/counter", form);
        toast.success("Counter added successfully");
      }
      setForm({ title: "", value: "", icon: "course" });
      setEditId(null);
      fetchCounters();
    } catch {
      toast.error("Failed team");
    }
  };

  const handleEdit = (counter) => {
    setForm(counter);
    setEditId(counter._id);
  };

  const handleDelete = async (id) => {
    await apiClient.delete(`/counter/${id}`);
    toast.success("Deleted team successfully");
    fetchCounters();
  };

  const resetForm = () => {
    setEditId(null);
    setData({
      title: "",
      value: "",
      icon: "course"
    });
  };

  return (
    <>
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
          <h5 className="mb-0">
            <i className="fa-solid fa-images me-2 text-primary"></i>
            Counter Admin Manager
          </h5>
        </div>
        <div className="row">
          <div className="col-lg-6">
            {/* Form Card */}
            <div className="card custom-card mb-4">
              <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                <i className="fa-solid fa-pen-to-square me-2"></i>
                <h5 className="mb-0">{editId ? "Update Counter" : "Add Counter"}</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-lg-6">
                    <label htmlFor="form-label">Title</label>
                    <input
                      className="form-control"
                      placeholder="Title"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label htmlFor="form-label">Count Value</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Count Value"
                      value={form.value}
                      onChange={e => setForm({ ...form, value: e.target.value })}
                    />

                  </div>
                  <div className="col-lg-12">
                    <label htmlFor="form-label">Icons Name</label>
                    <select
                      className="form-select"
                      value={form.icon}
                      onChange={e => setForm({ ...form, icon: e.target.value })}
                    >
                      <option value="course">Course</option>
                      <option value="graduation">Graduation</option>
                      <option value="teacher">Teacher</option>
                      <option value="award">Award</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">

                <button className={`btn me-2 py-2 btn-radius-8 ${editId ? "btn-success light" : "btn-primary"}`} onClick={handleSubmit}>
                  {editId ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                  {editId ? "Update" : "Add"}
                </button>

                {editId && (
                  <button className="btn btn-danger light py-2 btn-radius-8" onClick={resetForm}>
                    <i className="fa-solid fa-xmark me-1"></i>
                    Cancel
                  </button>
                )}

              </div>
            </div>
          </div>
          <div className="col-lg-6">
            {/* Slides List */}
            <div className="card custom-card">
              <div className="card-header card-header-custom bg-dark text-white fw-semibold">
                <i className="fa-solid fa-list me-2"></i>
                Existing Counters
              </div>

              <div className="card-body">
                <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Count Value</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {counters.map(counter => (
                      <tr key={counter._id}>
                        <td className="fw-semibold">{counter.title}</td>
                        <td className="fw-semibold">{counter.value}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-primary light sharp me-2"
                            onClick={() => handleEdit(counter)}
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-danger light sharp"
                            disabled={editId === counter._id}
                            onClick={() => handleDelete(counter._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {!counters.length && (
                      <tr>
                        <td colSpan="3" className="text-center text-muted py-4">
                          <i className="fa-solid fa-circle-info me-2"></i>
                          No counters found
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
  );
};

export default CounterAdmin;
