import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const CourseAdmin = () => {
    const [blogs, setBlogs] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [data, setData] = useState({
        title: "",
        author: "",
        comments: "",
        date: "",
        slug: "",
        description: "",
        image: null
    });


    const fetchblogs = async () => {
        const res = await apiClient.get("/blogs");
        setBlogs(res.data);
    };

    useEffect(() => {
        fetchblogs();
    }, []);


    const saveBlog = async () => {

        if (!data.title || !data.author || !data.date) {
            toast.error("Required fields missing");
            return;
        }

        const form = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key]) form.append(key, data[key]);
        });

        try {
            if (editingId) {
                await apiClient.put(
                    `/blogs/${editingId}`,
                    form
                );
                toast.success("Blog Updated Successfully");
            } else {
                await apiClient.post(
                    "/blogs",
                    form
                );
                toast.success("Blog Added Successfully");
            }

            resetForm();
            fetchblogs();
        } catch {
            toast.error("Something went wrong");
        }
    };


    const editBlog = (blog) => {
        setEditingId(blog._id);
        setData({ ...blog, image: null });
    };

    const deleteBlog = async (id) => {
        // if (!window.confirm("Delete this course?")) return;

        await apiClient.delete(`/blogs/${id}`);
        fetchblogs();
        toast.success("Blog Deleted Successfully");
    };

    const resetForm = () => {
        setEditingId(null);
        setData({
            title: "",
            author: "",
            comments: "",
            date: "",
            slug: "",
            description: "",
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
                            Blog Admin Manager
                        </h5>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            {/* Form Card */}
                            <div className="card custom-card mb-4">
                                <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                    <i className="fa-solid fa-pen-to-square me-2"></i>
                                    <h5 className="mb-0">{editingId ? "Update Blog" : "Add Blog"}</h5>
                                </div>

                                <div className="card-body">
                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <label className="form-label">Title</label>
                                            <input className="form-control mb-2" placeholder="Title"
                                                value={data.title}
                                                onChange={e => setData({ ...data, title: e.target.value })}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Author</label>
                                            <input className="form-control mb-2" placeholder="Auther"
                                                value={data.author}
                                                onChange={e => setData({ ...data, author: e.target.value })}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Comments</label>
                                            <input className="form-control mb-2" placeholder="Comments"
                                                value={data.comments}
                                                onChange={e => setData({ ...data, comments: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Date</label>
                                            <input type="date" className="form-control mb-2" placeholder="Duration"
                                                value={data.date}
                                                onChange={e => setData({ ...data, date: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label"> Image</label>
                                            <input type="file" className="form-control mb-3"
                                                onChange={e => setData({ ...data, image: e.target.files[0] })}
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="card-footer text-end">

                                    <button className={`btn me-2 py-2 btn-radius-8 ${editingId ? "btn-success light" : "btn-primary"}`} onClick={saveBlog}>
                                        {editingId ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                        {editingId ? "Update" : "Add"}
                                    </button>

                                    {editingId && (
                                        <button className="btn btn-danger light py-2 btn-radius-8" onClick={resetForm}>
                                            <i className="fa-solid fa-xmark me-1"></i>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
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
                                                    <th>Author</th>
                                                    <th className="text-end">Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {blogs.map(blog => (
                                                    <tr key={blog._id}>
                                                        <td className="fw-semibold">{blog.author}</td>
                                                        <td className="text-end">
                                                            <button
                                                                className="btn btn-sm btn-primary light sharp me-2"
                                                                onClick={() => editBlog(blog)}
                                                            >
                                                                <i className="fa-solid fa-pen"></i>
                                                            </button>

                                                            <button
                                                                className="btn btn-sm btn-danger light sharp"
                                                                disabled={editingId === blog._id}
                                                                onClick={() => deleteBlog(blog._id)}
                                                            >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}

                                                {!blogs.length && (
                                                    <tr>
                                                        <td colSpan="3" className="text-center text-muted py-4">
                                                            <i className="fa-solid fa-circle-info me-2"></i>
                                                            No blogs found
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

export default CourseAdmin;
