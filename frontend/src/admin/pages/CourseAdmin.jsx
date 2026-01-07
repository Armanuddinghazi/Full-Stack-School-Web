import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const CourseAdmin = () => {
    const [courses, setCourses] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [data, setData] = useState({
        title: "",
        tag: "",
        lessons: "",
        rating: "",
        seats: "",
        duration: "",
        price: "",
        description: "",
        image: null
    });


    const fetchCourses = async () => {
        const res = await apiClient.get("/courses");
        setCourses(res.data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);


    const saveCourse = async () => {

        if (!data.title || !data.tag || !data.price) {
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
                    `/courses/${editingId}`,
                    form
                );
                toast.success("Course Updated Successfully");
            } else {
                await apiClient.post(
                    "/courses",
                    form
                );
                toast.success("Course Added Successfully");
            }

            resetForm();
            fetchCourses();
        } catch {
            toast.error("Something went wrong");
        }
    };


    const editCourse = (course) => {
        setEditingId(course._id);
        setData({ ...course, image: null });
    };

    const deleteCourse = async (id) => {
        // if (!window.confirm("Delete this course?")) return;

        await apiClient.delete(`/courses/${id}`);
        fetchCourses();
        toast.success("Course Deleted Successfully");
    };

    const resetForm = () => {
        setEditingId(null);
        setData({
            title: "",
            tag: "",
            lessons: "",
            rating: "",
            seats: "",
            duration: "",
            price: "",
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
                            Course Admin Manager
                        </h5>
                    </div>

                    <div className="row">
                        <div className="col-lg-7">
                            {/* Form Card */}
                            <div className="card custom-card mb-4">
                                <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                    <i className="fa-solid fa-pen-to-square me-2"></i>
                                    <h5 className="mb-0">{editingId ? "Update Course" : "Add Course"}</h5>
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
                                            <label className="form-label">Tag</label>
                                            <input className="form-control mb-2" placeholder="Tag"
                                                value={data.tag}
                                                onChange={e => setData({ ...data, tag: e.target.value })}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Seats</label>
                                            <input className="form-control mb-2" placeholder="Seats"
                                                value={data.seats}
                                                onChange={e => setData({ ...data, seats: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Duration</label>
                                            <input className="form-control mb-2" placeholder="Duration"
                                                value={data.duration}
                                                onChange={e => setData({ ...data, duration: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Price</label>
                                            <input className="form-control mb-2" placeholder="Price"
                                                value={data.price}
                                                onChange={e => setData({ ...data, price: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Rating</label>
                                            <input className="form-control mb-2" placeholder="Rating"
                                                value={data.rating}
                                                onChange={e => setData({ ...data, rating: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control mb-2" rows={4} placeholder="Description"
                                                value={data.description}
                                                onChange={e => setData({ ...data, description: e.target.value })}
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
                                    <button className={`btn me-2 py-2 btn-radius-8 ${editingId ? "btn-success light" : "btn-primary" }`} onClick={saveCourse}>
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
                        <div className="col-lg-5">
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
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {courses.map(course => (
                                                <tr key={course._id} className="py-5">
                                                    <td className="fw-semibold text-nowrap">{course.title}</td>
                                                    <td className="text-end ">
                                                        <button
                                                            className="btn btn-sm btn-primary light sharp me-2"
                                                            onClick={() => editCourse(course)}
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger light sharp"
                                                            disabled={editingId === course._id}
                                                            onClick={() => deleteCourse(course._id)}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                            {!courses.length && (
                                                <tr>
                                                    <td colSpan="3" className="text-center text-muted py-4">
                                                        <i className="fa-solid fa-circle-info me-2"></i>
                                                        No courses found
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
