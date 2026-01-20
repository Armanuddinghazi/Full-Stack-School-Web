import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

const AdminVideoManager = () => {
    const [videos, setVideos] = useState([]);
    const [formData, setFormData] = useState({ title: "", videoUrl: "" });
    const [editingId, setEditingId] = useState(null);

    // 1. Load All Videos
    const fetchVideos = async () => {
        try {
            const res = await apiClient.get("/videos");
            setVideos(res.data);
        } catch (err) {
            console.error("Error loading videos", err);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    // 2. Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Add or Update Video
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // UPDATE Logic
                await apiClient.put(`/videos/${editingId}`, formData);
                toast.success("Video Updated Successfully!");
            } else {
                // CREATE Logic
                await apiClient.post("/videos", formData);
                toast.success("Video Added Successfully!");
            }

            // Reset Form & Reload List
            setFormData({ title: "", videoUrl: "" });
            setEditingId(null);
            fetchVideos();

        } catch (err) {
            toast.error("Operation failed");
            console.error(err);
        }
    };

    // 4. Edit Button Click
    const handleEdit = (video) => {
        setFormData({ title: video.title, videoUrl: video.videoUrl });
        setEditingId(video._id);
        // Scroll to form (optional)
        window.scrollTo(0, 0);
    };

    // 5. Delete Button Click
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            try {
                await apiClient.delete(`/videos/${id}`);
                toast.success("Video Deleted!");
                fetchVideos(); // List refresh karein
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <div className="container py-4">
            {/* Header */}
            <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                <h5 className="mb-0">
                    <i className="fa-solid fa-images me-2 text-primary"></i>
                    Video Admin Manager
                </h5>
            </div>
            <div className="card custom-card mb-4">
                <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                    <i className="fa-solid fa-pen-to-square me-2"></i>
                    <h5 className="mb-0">{editingId ? "Update Video Gallery" : "Add Video Gallery"}</h5>
                </div>

                <div className="card-body">
                     {/* --- ADD / EDIT FORM --- */}
                <form onSubmit={handleSubmit} className="mb-5 p-3 bg-light border rounded">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Video Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Enter title (e.g., Event 2026)"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">YouTube Video URL</label>
                            <input
                                type="url"
                                name="videoUrl"
                                className="form-control"
                                placeholder="https://youtu.be/..."
                                value={formData.videoUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className=" align-items-center gap-2 justify-content-start d-flex">
                            <button type="submit" className={`btn py-2 btn-radius-8 ${editingId ? 'btn-success light' : 'btn-primary'}`}>
                                {editingId ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                {editingId ? "Update Video" : "Add Video"}
                            </button>
                                {editingId && (
                                <button
                                    type="button"
                                    className="btn btn-danger light py-2 btn-radius-8"
                                    onClick={() => { setEditingId(null); setFormData({ title: "", videoUrl: "" }); }}
                                >
                                    <i className="fa-solid fa-xmark me-1"></i>
                                    Cancel Edit
                                </button>
                        )}
                        </div>
                    
                    </div>
                    
                </form>
                    {/* --- VIDEO LIST TABLE --- */}
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Video Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.map((video, index) => (
                                <tr key={video._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={`https://img.youtube.com/vi/${video.videoUrl.split('v=')[1]?.split('&')[0] || video.videoUrl.split('/').pop()}/default.jpg`}
                                            alt="thumb"
                                            style={{ width: "60px", borderRadius: "5px" }}
                                        />
                                    </td>
                                    <td>{video.title}</td>
                                    <td>
                                        <a href={video.videoUrl} target="_blank" rel="noreferrer" className="text-decoration-none text-white badge bg-primary">
                                         <i class="fa-light fa-eye"></i>   Watch Link
                                        </a>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary sharp light me-2"
                                            onClick={() => handleEdit(video)}
                                        >
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger sharp light"
                                            onClick={() => handleDelete(video._id)}
                                        >
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {videos.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                         <i className="fa-duotone fa-solid fa-face-frown me-1"></i>
                                        No videos found. Add one above!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                </div>

            
            </div>
        </div>
    );
};

export default AdminVideoManager;