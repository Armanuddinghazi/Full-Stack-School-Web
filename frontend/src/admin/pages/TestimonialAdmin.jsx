import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../../api/apiClient';

const TestimonialAdmin = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        quote: '',
        rating: 5,
        image: null
    });

    const IMG_URL = import.meta.env.VITE_API_URL_IMG;

    const [previewImage, setPreviewImage] = useState(null);
    const [editId, setEditId] = useState(null);
    // Fetch Items
    const fetchItems = async () => {
        const res = await apiClient.get('/testimonials');
        setItems(res.data);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('quote', formData.quote);
        data.append('rating', formData.rating);

        if (formData.image instanceof File) {
            data.append('image', formData.image);
        }
        try {
            if (editId) {
                await apiClient.put(`/testimonials/${editId}`, data);
                toast.success("Testimonial updated successfully");
            } else {
                await apiClient.post("/testimonials", data);
                toast.success("Testimonial added successfully");
            }
            resetForm();
            fetchItems();
        } catch (err) {
            console.error(err);
            toast.success('Error adding testimonial');
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setFormData({
            name: item.name,
            role: item.role,
            quote: item.quote,
            rating: item.rating,
            image: null
        });
        setPreviewImage(`${IMG_URL}${item.image}`);
    };

    // Delete Item
    const handleDelete = async (id) => {
        if (window.confirm("Delete this review?")) {
            await apiClient.delete(`/testimonials/${id}`);
            fetchItems();
        }
    };

    const resetForm = () => {
        setEditId(null);
        setPreviewImage(null);
        setFormData({
            name: '',
            role: '',
            quote: '',
            rating: 5,
            image: null
        });
        document.getElementById('fileInput').value = "";
    };
    return (
        <div className="container ">
            <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                <h5 className="mb-0">
                    <i className="fa-solid fa-images me-2 text-primary"></i>
                    Testimonial Admin Manager
                </h5>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card custom-card mb-4 ">
                        <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            <h5 className="mb-0">{editId ? "Update Testimonial" : "Add Testimonial"}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mt-2">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="">Author Name</label>
                                        <input type="text" name="name" placeholder="Author Name" className="form-control" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="">Role</label>
                                        <input type="text" name="role" placeholder="Role " className="form-control" value={formData.role} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="">Testimonial Qoute</label>
                                        <textarea name="quote" rows={4} placeholder="Testimonial Quote" className="form-control" value={formData.quote} onChange={handleChange} required></textarea>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Rating (1-5)</label>
                                        <input type="number" name="rating" min="1" max="5" defaultValue="5" className="form-control" value={formData.rating} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Author Image</label>
                                        <input type="file" id="fileInput" name="image" className="form-control" onChange={handleChange} required={!editId} />
                                    </div>
                                    {previewImage && (
                                        <div className="mt-2 mb-2">
                                            <img src={previewImage} alt="Preview" width="60" height="60" className="rounded-circle object-fit-cover" />
                                            <span className="ms-2 text-muted small">Current Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className=" mt-2 text-start">
                                    <button type="submit" className={`btn me-2 py-2 btn-radius-8 ${editId ? "btn-success light" : "btn-primary"}`} >
                                        {editId ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                        {editId ? "Update " : "Add New"}
                                    </button>

                                    {editId && (
                                        <button className="btn btn-danger light py-2 btn-radius-8" onClick={resetForm}>
                                            <i className="fa-solid fa-xmark me-1"></i>
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="card custom-card">
                        <div className="card-header card-header-custom 
                                d-flex align-items-center
                                bg-dark text-white fw-semibold">
                            <i className="fa-solid fa-list me-2"></i>
                            <h5 className="mb-0">Existing Team</h5>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table  table-bordered align-middle mb-0">
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Description Quote</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item._id}>
                                                <td>
                                                    <img src={`${IMG_URL}${item.image}`} alt="" width="50" className="rounded-circle" />
                                                </td>
                                                <td className='mb-0'>{item.name}<br /><small className="text-muted">{item.role}</small></td>
                                                <td>{item.quote.substring(0, 100)}...</td>
                                                <td className='text-end d-flex align-items-center mb-0'>
                                                    <button onClick={() => handleEdit(item)} className="btn btn-primary sharp light btn-sm me-2">
                                                        <i className="fa-solid fa-pen"></i>
                                                    </button>
                                                    <button onClick={() => handleDelete(item._id)} disabled={editId === item._id} className="btn btn-danger sharp light btn-sm">
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {!items.length && (
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
    );
};

export default TestimonialAdmin;