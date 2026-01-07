import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const GalleryAdmin = () => {

    const [gallery, setGallery] = useState([]);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    const fetchGallery = async () => {
        const res = await apiClient.get("/gallery");
        setGallery(res.data);
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const submit = async () => {
        const fd = new FormData();
        fd.append("title", title);
        if (image) fd.append("image", image);

        if (editId) {
            await apiClient.put(`/gallery/${editId}`, fd);
            toast.success("Updated");
        } else {
            await apiClient.post("/gallery", fd);
            toast.success("Added");
        }

        setTitle("");
        setImage(null);
        setEditId(null);
        fetchGallery();
    };

    const edit = (g) => {
        setEditId(g._id);
        setTitle(g.title || "");
    };

    const del = async (id) => {
        await apiClient.delete(`/gallery/${id}`);
        toast.success("Deleted");
        fetchGallery();
    };

    const resetForm = () => {
        setEditId(null);
        setData({
            title: "",
            image: null
        });
    };


    return (
        <div className="container py-4">
            {/* Header */}
            <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                <h5 className="mb-0">
                    <i className="fa-solid fa-images me-2 text-primary"></i>
                    Gallery Admin Manager
                </h5>
            </div>
            <div className="row">
                <div className="col-lg-7">
                    {/* Form Card */}
                    <div className="card custom-card mb-4">
                        <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            <h5 className="mb-0">{editId ? "Update Gallery" : "Add Gallery"}</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="form-label">Title</label>
                                    <input
                                        className="form-control mb-2"
                                        placeholder="Title (optional)"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="form-label">Image Upload</label>
                                    <input
                                        type="file"
                                        className="form-control mb-3"
                                        onChange={e => setImage(e.target.files[0])}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="card-footer text-end">
                            <button className={`btn me-2 py-2 btn-radius-8 ${editId ? "btn-success light" : "btn-primary"}`} onClick={submit}>
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
                <div className="col-lg-5">
                    <div className="card custom-card">
                        <div className="card-header card-header-custom bg-dark text-white fw-semibold">
                            <i className="fa-solid fa-list me-2"></i>
                            Existing Galleis Images
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Image</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gallery.map(g => (
                                        <tr key={g._id}>
                                            <td><img
                                                src={`${API_URL}${g.image}`}
                                                className="img-fluid mb-2"
                                                width={50}
                                            /></td>
                                            <td className="text-end">
                                                <button
                                                    className="btn btn-sm btn-primary light sharp me-2"
                                                    onClick={() => edit(g)}
                                                >
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger light sharp"
                                                    disabled={editId === g._id}
                                                    onClick={() => del(g._id)}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {!gallery.length && (
                                        <tr>
                                            <td colSpan="3" className="text-center text-muted py-4">
                                                <i className="fa-solid fa-circle-info me-2"></i>
                                                No images found
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
    );
};

export default GalleryAdmin;
