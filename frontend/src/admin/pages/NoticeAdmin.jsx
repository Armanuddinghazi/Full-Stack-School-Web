import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const NoticeAdmin = () => {

    // const [text, setText] = useState("");
    // const [notices, setNotices] = useState([]);

    // const [form, setForm] = useState({
    //     text: "",
    // });
    // const [editId, setEditId] = useState(null);

    // const loadNotices = async () => {
    //     const res = await apiClient.get("/notices");
    //     setNotices(res.data);
    // };

    // useEffect(() => {
    //     loadNotices();
    // }, []);

    // const addNotice = async () => {
    //     if (!text.trim()) return toast.error("Notice required");
    //     await apiClient.post("/notices", { text });
    //     toast.success("Notice added");
    //     setText("");
    //     loadNotices();
    // };

    // const deleteNotice = async (id) => {
    //     await apiClient.delete(`/notices/${id}`);
    //     toast.success("Notice deleted");
    //     loadNotices();
    // };

    const [text, setText] = useState([]);
    const [form, setForm] = useState({
        text: "",
    });
    const [editId, setEditId] = useState(null);

    const fetchtext = () => {
        apiClient.get("/notices")
            .then(res => setText(res.data));

    };

    useEffect(() => {
        fetchtext();
    }, []);

    const handleSubmit = async () => {
        try {
            if (editId) {
                await apiClient.put(`/notices/${editId}`, form);
                toast.success("Notice updated successfully");
            } else {
                await apiClient.post("/notices", form);
                toast.success("Notice added successfully");
            }
            setForm({ text: "" });
            setEditId(null);
            fetchtext();
        } catch {
            toast.error("Failed Notice");
        }
    };

    const handleEdit = (notices) => {
        setForm(notices);
        setEditId(notices._id);
    }
    const handleDelete = async (id) => {
        await apiClient.delete(`/notices/${id}`);
        toast.success("Deleted notice successfully");
        fetchtext();
    };

    const resetForm = () => {
        setEditId(null);
        setData({
            text: "",
        });
    };

    return (
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
                    <div className="col-lg-6">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                {editId ? "Update Notice" : "Add New Notice"}
                            </div>

                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-lg-12">
                                        <label htmlFor="form-label">Notice</label>
                                        <input
                                            className="form-control"
                                            value={form.text}
                                            onChange={e => setForm({ ...form, text: e.target.value })}
                                            placeholder="Enter notice"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="card-footer text-end">
                                <button className={`btn me-2 py-2 btn-radius-8 ${editId ? "btn-success light" : "btn-primary"}`} onClick={handleSubmit}>
                                    {editId ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                    {editId ? "Update Notice" : "Add Notice"}
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
                                <h5 className="mb-0">Existing Notices</h5>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Notice</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {text.map(txt => (
                                                <tr key={txt._id}>
                                                    <td className="fw-semibold">{txt.text?.slice(0, 45)}...</td>
                                                    <td className="text-end">
                                                        <button
                                                            className="btn btn-sm btn-primary light sharp me-2"
                                                            onClick={() => handleEdit(txt)}
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger light sharp"
                                                            disabled={editId === txt._id}
                                                            onClick={() => handleDelete(txt._id)}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                            {!text.length && (
                                                <tr>
                                                    <td colSpan="3" className="text-center text-muted py-4">
                                                        <i className="fa-duotone fa-solid fa-face-frown me-1"></i>
                                                        No data found
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

export default NoticeAdmin;
