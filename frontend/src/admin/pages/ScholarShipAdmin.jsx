import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

const ScholarShipAdmin = () => {





    const [cards, setCards] = useState([]);
    const [form, setForm] = useState({
        cardTitle: "",
        cardContent: "",
        icon: null
    });
    const [data, setData] = useState({
        title: "",
        description: ""
    });
    const [image, setImage] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [editId, setEditId] = useState(null);


    // section code 


    /* 🔹 FETCH CONTACT */
    const fetchScholar = async () => {
        try {
            const res = await apiClient.get("/scholarshipSection");

            if (res.data) {
                setData({
                    title: res.data.title || "",
                    description: res.data.description || "",
                    image: res.data.image || null
                });
                setHasData(true);
            } else {
                setHasData(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchScholar();
    }, []);



    /* 🔹 SAVE / UPDATE */
    const saveScholarSection = async () => {
        if (
            !data.title ||
            !data.description
        ) {
            toast.error("All fields are required");
            return;
        }

        try {
            // const fd = new FormData();
            // Object.keys(data).forEach((key) => {
            //     fd.append(key, data[key]);
            // });
            const fd = new FormData();
            fd.append("title", data.title);
            fd.append("description", data.description);

            if (image) {
                fd.append("image", image);
            }

            await apiClient.post("/scholarshipSection", fd);
            toast.success(hasData ? " updated successfully" : " added successfully");

            fetchScholar();
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    const cancelForm = () => {
        setData({
            title: "",
            description: "",
        });

        setImage(null);
        setHasData(false);
    };


    const fetchcards = async () => {
        const res = await apiClient.get("/scholarshipCards");
        setCards(res.data);
    };

    useEffect(() => {
        fetchcards();
    }, []);

    const handleSubmit = async () => {
        if (!form.cardTitle || !form.cardContent || !form.icon) {
            toast.error("All fields required");
            return;
        }

        const data = new FormData();
        Object.keys(form).forEach(key => {
            if (form[key]) data.append(key, form[key]);
        });

        if (editId) {
            await apiClient.put(`/scholarshipCards/${editId}`, data);
            toast.success("Updated  successfully");
        } else {
            await apiClient.post("/scholarshipCards", data);
            toast.success("Added  successfully");
        }

        setForm({ cardTitle: "", cardContent: "", icon: null });
        setEditId(null);
        fetchcards();
    };

    const handleEdit = (f) => {
        setEditId(f._id);
        setForm(f);
    };

    const handleDelete = async (id) => {
        await apiClient.delete(`/scholarshipCards/${id}`);
        toast.success("Deleted  successfully");
        fetchcards();
    };

    const resetForm = () => {
        setEditId(null);
        setForm({
            cardTitle: "",
            cardContent: "",
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
                        ScholarShip Admin Manager
                    </h5>
                </div>
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                <h5 className="mb-0">Scholarship Section Page</h5>
                            </div>

                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-12 ">
                                        <label htmlFor="">Heading</label>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder=" Heading"
                                            value={data.title}
                                            onChange={e => setData({ ...data, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-12 ">
                                        <label htmlFor="">Image</label>
                                        <input
                                            type="file"
                                            className="form-control mb-2"
                                            onChange={e => setImage(e.target.files[0])}
                                        />
                                    </div>


                                    <div className="col-md-12 ">
                                        <label htmlFor="">Description</label>
                                        <textarea
                                            className="form-control mb-3"
                                            rows="4"
                                            placeholder="Description"
                                            value={data.description}
                                            onChange={e =>
                                                setData({ ...data, description: e.target.value })
                                            }
                                        />
                                    </div>


                                    <div className="d-flex gap-2">
                                        <button className={`btn me-2 py-2 btn-radius-8 ${hasData ? "btn-success light" : "btn-primary"}`} onClick={saveScholarSection}>
                                            {hasData ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                            {hasData ? "Update " : "Add "}
                                        </button>

                                        {hasData && (
                                            <button className="btn btn-danger light py-2 btn-radius-8" onClick={cancelForm}>
                                                <i className="fa-solid fa-xmark me-1"></i>
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                <h5 className="mb-0">{editId ? "Update " : "Add "}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-lg-12">
                                        <label htmlFor="">Title</label>
                                        <input className="form-control" placeholder="Title" value={form.cardTitle}
                                            onChange={e => setForm({ ...form, cardTitle: e.target.value })} />
                                    </div>

                                    <div className="col-lg-12">
                                        <label htmlFor="">Message</label>
                                        <textarea className="form-control" rows={5} placeholder="Message" value={form.cardContent}
                                            onChange={e => setForm({ ...form, cardContent: e.target.value })} />
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
                                    {editId ? "Update " : "Add "}
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
                                <h5 className="mb-0">Existing Scholarship Cards</h5>
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
                                            {cards.map(f => (
                                                <tr key={f._id}>
                                                    <td className="fw-semibold">{f.cardTitle}</td>
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

                                            {!cards.length && (
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

export default ScholarShipAdmin;
