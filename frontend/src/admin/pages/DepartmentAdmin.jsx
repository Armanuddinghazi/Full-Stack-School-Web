import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

const DepartmentAdmin = () => {
    const [department, setDepartment] = useState([]);
    const [form, setForm] = useState({
        title: "",
        content: "",
        icon: null
    });
    const [editId, setEditId] = useState(null);

    const fetchdepartment = async () => {
        const res = await apiClient.get("/department");
        setDepartment(res.data);
    };

    useEffect(() => {
        fetchdepartment();
    }, []);

    const handleSubmit = async () => {

        if (!form.title || !form.content || !form.count) {
            toast.error("All fields required");
            return;
        }

        const data = new FormData();
        Object.keys(form).forEach(key => {
            if (form[key]) data.append(key, form[key]);
        });

        if (editId) {
            await apiClient.put(`/department/${editId}`, data);
            toast.success("Updated department successfully");
        } else {
            await apiClient.post("/department", data);
            toast.success("Added department successfully");
        }

        setForm({ title: "", content: "", icon: null });
        setEditId(null);
        fetchdepartment();
    };

    const handleEdit = (d) => {
        setEditId(d._id);
        setForm(d);
    };

    const handleDelete = async (id) => {
        await apiClient.delete(`/department/${id}`);
        toast.success("Deleted feature successfully");
        fetchdepartment();
    };

    const resetForm = () => {
        setEditId(null);
        setForm({
            title: "",
            content: "",
            icon: null
        });
    };

    return (
        <>
            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-images me-2 text-primary"></i>
                        Feature Admin Manager
                    </h5>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                <h5 className="mb-0">{editId ? "Update Department Section" : "Add Department Section"}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">                                 
                                    <div className="col-lg-12">
                                        <label htmlFor="">Title</label>
                                        <input className="form-control" placeholder="Title" value={form.title}
                                            onChange={e => setForm({ ...form, title: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="">Message</label>
                                        <textarea className="form-control" rows={5} placeholder="Message" value={form.content}
                                            onChange={e => setForm({ ...form, content: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="">Icon Image</label>
                                        <input className="form-control" type="file" onChange={e => setForm({ ...form, icon: e.target.files[0] })} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button className={`btn me-2 py-2 btn-radius-8 ${editId ? "btn-success light" : "btn-primary"}`} onClick={handleSubmit}>
                                    {editId ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                    {editId ? "Update Department" : "Add Department"}
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
                            <div className="card-header card-header-custom  d-flex align-items-center bg-dark text-white fw-semibold">
                                <i className="fa-solid fa-list me-2"></i>
                                <h5 className="mb-0">Existing Department</h5>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Title</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {department.map(f => (
                                                <tr key={f._id}>
                                                    <td className="fw-semibold">{f.title}</td>
                                                    <td className="text-end">
                                                        <button
                                                            className="btn btn-sm btn-primary light sharp me-2"
                                                            onClick={() => handleEdit(f)}
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger light sharp"
                                                            disabled={editId === f._id}
                                                            onClick={() => handleDelete(f._id)}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                            {!department.length && (
                                                <tr>
                                                    <td colSpan="3" className="text-center text-muted py-4">
                                                        <i className="fa-solid fa-circle-info me-2"></i>
                                                        No department found
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

export default DepartmentAdmin;
