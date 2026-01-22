import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../../api/apiClient';

const MissionAdmin = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '',
        id: null
    });

    const API_URL = '/mission-vision';

    // 1. Fetch All
    const fetchItems = async () => {
        try {
            const res = await apiClient.get(API_URL);
            setItems(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // 2. Handle Form Input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Submit (Create or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await apiClient.put(`${API_URL}/${formData.id}`, formData);
                toast.success("Updated Successfully");
            } else {
                await apiClient.post(API_URL, formData);
                toast.success("Added Successfully");
            }
            setFormData({ title: '', description: '', icon: '', id: null });
            fetchItems();
        } catch (error) {
            console.log('admin error', error);
            toast.error("Operation Failed");
        }
    };

    // 4. Edit Click Handler
    const handleEdit = (item) => {
        setFormData({
            title: item.title,
            description: item.description,
            icon: item.icon,
            id: item._id
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            try {
                await apiClient.delete(`${API_URL}/${id}`);
                toast.success("Deleted Successfully");
                fetchItems();
            } catch (error) {
                toast.error("Delete Failed");
            }
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                <h5 className="mb-0">
                    <i className="fa-solid fa-images me-2 text-primary"></i>
                    Manage Mission & Vision
                </h5>
            </div>
            {/* Form Section */}
            <div className="row">
                <div className="col-lg-6">
                    <div className="card custom-card mb-4">
                        <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            <h5 className="mb-0">{formData.id ? "Update Mission/Vision" : "Add Mission/Vision"}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title (e.g., Our Mission)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder='Title'
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        placeholder='Description'
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Icons </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleChange}
                                        placeholder="fa-solid fa-rocket"
                                        required
                                    />
                                </div>
                                <div className="card-footer text-center">

                                    <button type='submit' className={`btn me-2 py-2 btn-radius-8 ${formData.id ? "btn-success light" : "btn-primary"}`} onClick={handleSubmit}>
                                        {formData.id ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                        {formData.id ? "Update" : "Add New"}
                                    </button>

                                    {formData.id && (
                                        <button className="btn btn-danger light py-2 btn-radius-8" 
                                         onClick={() => setFormData({ title: '', description: '', icon: '', id: null })}>
                                            <i className="fa-solid fa-xmark me-1"></i>
                                            Cancel Edit
                                        </button>
                                    )}

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    {/* Slides List */}
                    <div className="card custom-card">
                        <div className="card-header card-header-custom  d-flex align-items-center bg-dark text-white fw-semibold">
                            <i className="fa-solid fa-list me-2"></i>
                            <h5 className="mb-0">Existing Mission/Vision</h5>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Icon</th>
                                            <th>Title</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item._id}>
                                                <td className='fw-semibold'><div className="fs-4 txt-success">
                                                    <i className={item.icon}></i>
                                                </div></td>
                                                <td className="fw-semibold">{item.title}</td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-sm btn-primary light sharp me-2"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <i className="fa-solid fa-pen"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger light sharp"
                                                        disabled={formData.id === item._id}
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {!items.length && (
                                            <tr>
                                                <td colSpan="3" className="text-center text-muted py-4">
                                                    <i className="fa-solid fa-circle-info me-2"></i>
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
    );
};

export default MissionAdmin;