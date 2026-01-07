import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const TeamAdmin = () => {
    const [team, setTeam] = useState([]);
    const [form, setForm] = useState({
        name: "", role: "",
        facebook: "", whatsapp: "",
        linkedin: "", youtube: ""
    });
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    const fetchTeam = async () => {
        const res = await apiClient.get("/team");
        setTeam(res.data);
    };

    useEffect(() => { fetchTeam(); }, []);

    const submit = async () => {
        const fd = new FormData();
        Object.keys(form).forEach(k => fd.append(k, form[k]));
        if (image) fd.append("image", image);

        try {
            if (editId) {
                await apiClient.put(`/team/${editId}`, fd);
                toast.success("Team updated successfully");
            } else {
                await apiClient.post("/team", fd);
                toast.success("Team added successfully");
            }
            setForm({ name: "", role: "", facebook: "", whatsapp: "", linkedin: "", youtube: "" });
            setImage(null);
            setEditId(null);
            fetchTeam();
        } catch {
            toast.error("Failed team ");
        }
    };

    const edit = (t) => {
        setEditId(t._id);
        setForm(t);
    };

    const del = async (id) => {
        await apiClient.delete(`/team/${id}`);
        toast.success("Deleted team successfully");
        fetchTeam();
    };

    const resetForm = () => {
        setEditId(null);
        setData({
            name: "", role: "",
            facebook: "", whatsapp: "",
            linkedin: "", youtube: ""
        });
    };

    return (
        <>
            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-images me-2 text-primary"></i>
                        Team Admin Manager
                    </h5>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                <h5 className="mb-0">{editId ? "Update Team" : "Add Team"}</h5>
                            </div>

                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="form-label">Name</label>
                                        <input className="form-control mb-2" placeholder="Name" value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-label">Role</label>
                                        <input className="form-control mb-2" placeholder="Role" value={form.role}
                                            onChange={e => setForm({ ...form, role: e.target.value })} />
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="form-label">Image</label>
                                        <input type="file" className="form-control mb-2" onChange={e => setImage(e.target.files[0])} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                 <button className={`btn me-2 py-2 btn-radius-8 ${editId ? "btn-success light" : "btn-primary" }`} onClick={submit}>
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
                                Existing Teams
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {team.map(t => (
                                            <tr key={t._id}>
                                                <td>
                                                    <img src={`${API_URL}${t.image}`} width="50" />
                                                </td>
                                                <td className="fw-semibold">{t.name}</td>
                                                <td className="fw-semibold">{t.role}</td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-sm btn-primary light sharp me-2"
                                                        onClick={() => edit(t)}
                                                    >
                                                        <i className="fa-solid fa-pen"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger light sharp"
                                                        disabled={editId === t._id}
                                                        onClick={() => del(t._id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {!team.length && (
                                            <tr>
                                                <td colSpan="3" className="text-center text-muted py-4">
                                                    <i className="fa-solid fa-circle-info me-2"></i>
                                                    No teams found
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

export default TeamAdmin;
