import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const HeaderAdmin = () => {
    const BASE_URL = import.meta.env.VITE_API_URL_IMG;

    const [formData, setFormData] = useState({
        logo: '',
        contact: { phone: '', email: '', address: '' },
        socialLinks: [],
        menuItems: [],
        actionButton: { text: 'Apply Now', url: '/admission-form', show: true }
    });

    // File state for logo upload
    const [logoFile, setLogoFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await apiClient.get('/header');
            if (res.data && Object.keys(res.data).length > 0) {
                setFormData({
                    ...formData,
                    ...res.data,
                    contact: res.data.contact || { phone: '', email: '', address: '' },
                    actionButton: res.data.actionButton || { text: 'Apply Now', url: '#', show: true }
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Handle Simple Inputs
    const handleContactChange = (field, value) => {
        setFormData({ ...formData, contact: { ...formData.contact, [field]: value } });
    };

    // Handle Logo File Select
    const handleFileChange = (e) => {
        setLogoFile(e.target.files[0]);
    };

    // ===========================
    // SOCIAL LINKS LOGIC
    // ===========================
    const addSocial = () => {
        setFormData({ ...formData, socialLinks: [...formData.socialLinks, { icon: 'fa-brands fa-facebook-f', url: '#' }] });
    };
    const removeSocial = (index) => {
        const updated = formData.socialLinks.filter((_, i) => i !== index);
        setFormData({ ...formData, socialLinks: updated });
    };
    const handleSocialChange = (index, field, value) => {
        const updated = [...formData.socialLinks];
        updated[index][field] = value;
        setFormData({ ...formData, socialLinks: updated });
    };

    // ===========================
    // MENU MANAGEMENT LOGIC
    // ===========================

    // 1. Top Level Menu
    const addMenu = () => {
        setFormData({ ...formData, menuItems: [...formData.menuItems, { label: 'New Menu', path: '#', children: [] }] });
    };
    const removeMenu = (index) => {
        const updated = formData.menuItems.filter((_, i) => i !== index);
        setFormData({ ...formData, menuItems: updated });
    };
    const handleMenuChange = (index, field, value) => {
        const updated = [...formData.menuItems];
        updated[index][field] = value;
        setFormData({ ...formData, menuItems: updated });
    };

    // 2. Child Menu (Dropdown)
    const addChildMenu = (parentIndex) => {
        const updated = [...formData.menuItems];
        updated[parentIndex].children.push({ label: 'Sub Item', path: '/sub-link' });
        setFormData({ ...formData, menuItems: updated });
    };
    const removeChildMenu = (parentIndex, childIndex) => {
        const updated = [...formData.menuItems];
        updated[parentIndex].children = updated[parentIndex].children.filter((_, i) => i !== childIndex);
        setFormData({ ...formData, menuItems: updated });
    };
    const handleChildMenuChange = (parentIndex, childIndex, field, value) => {
        const updated = [...formData.menuItems];
        updated[parentIndex].children[childIndex][field] = value;
        setFormData({ ...formData, menuItems: updated });
    };

    // --- DRAG AND DROP HANDLER ---
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(formData.menuItems);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFormData({ ...formData, menuItems: items });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const dataPayload = new FormData();
            dataPayload.append('data', JSON.stringify(formData));

            if (logoFile) {
                dataPayload.append('logo', logoFile);
            }

            await apiClient.put('/header', dataPayload);

            toast.success('Header Updated Successfully!');
            fetchData();
            setLogoFile(null);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            toast.error('Error Updating Header');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="container">
                {/* {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>} */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-images me-2 text-primary"></i>
                        Header Management Dashboard
                    </h5>
                </div>
                {/* 1. Logo Upload */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        <h5 className="mb-0">Logo & Branding</h5>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <label className="form-label">Current Logo</label>
                                <div className="p-2 border rounded bg-light text-center">
                                    {formData.logo ? (
                                        <img src={`${BASE_URL}${formData.logo}`} alt="Current" width="150" height="100" />
                                    ) : <span>No Logo</span>}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <label className="form-label">Upload New Logo</label>
                                <input type="file" className="form-control" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Contact Info */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        <h5 className="mb-0">Top Bar Contact Info</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label">Phone</label>
                                <input className="form-control" value={formData.contact?.phone || ''} onChange={(e) => handleContactChange('phone', e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Email</label>
                                <input className="form-control" value={formData.contact?.email || ''} onChange={(e) => handleContactChange('email', e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Address</label>
                                <input className="form-control" value={formData.contact?.address || ''} onChange={(e) => handleContactChange('address', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Social Links */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center justify-content-between bg-primary
                      text-white fw-semibold mb-3">
                        <h5 className="mb-0">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            Social Media Links</h5>
                        <button className="btn btn-success dark btn-radius-8 py-2" onClick={addSocial}>
                            <i className="fa-solid fa-plus me-1"></i> Add Link
                        </button>
                    </div>

                    <div className="card-body">
                        {formData.socialLinks.map((item, index) => (
                            <div key={index} className="link-item-row">
                                <input placeholder="Icon Class (fa-brands fa-twitter)" className="form-control" value={item.icon} onChange={(e) => handleSocialChange(index, 'icon', e.target.value)} />
                                <input placeholder="URL" className="form-control" value={item.url} onChange={(e) => handleSocialChange(index, 'url', e.target.value)} />
                                <button className="btn btn-danger light py-2" onClick={() => removeSocial(index)}>
                                    <i className="fa-slab fa-regular fa-xmark"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Menu Management */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center justify-content-between bg-primary
                      text-white fw-semibold mb-3">
                        <h5 className="mb-0">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            Main Navigation Menu</h5>
                        <button className="btn btn-success dark btn-radius-8 py-2" onClick={addMenu}>
                            <i className="fa-solid fa-plus me-1"></i> Add Menu Link
                        </button>
                    </div>

                    <div className="card-body">


                       <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="menu-items">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {formData.menuItems.map((menu, mIndex) => (
                                        <Draggable key={mIndex} draggableId={`menu-${mIndex}`} index={mIndex}>
                                            {(provided) => (
                                                <div
                                                    className="menu-column-card mb-3"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={{ ...provided.draggableProps.style, backgroundColor: '#f9f9f9', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}
                                                >
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <div className="d-flex align-items-center">
                                                            {/* Drag Handle Icon */}
                                                            <span {...provided.dragHandleProps} className="me-3" style={{ cursor: 'grab', color: '#888' }}>
                                                                <i className="fa-solid fa-grip-vertical fa-lg"></i>
                                                            </span>
                                                            <span className="badge bg-dark">Menu Item {mIndex + 1}</span>
                                                        </div>
                                                        <button className="delete-btn-top btn btn-sm btn-radius-8 btn-danger light" onClick={() => removeMenu(mIndex)}>
                                                            <i className="fa-solid fa-trash me-1"></i> Delete
                                                        </button>
                                                    </div>

                                                    {/* Parent Menu Inputs */}
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <input placeholder="Label (e.g. Home)" className="form-control" value={menu.label} onChange={(e) => handleMenuChange(mIndex, 'label', e.target.value)} />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input placeholder="Link (e.g. /home or #)" className="form-control" value={menu.path} onChange={(e) => handleMenuChange(mIndex, 'path', e.target.value)} />
                                                        </div>
                                                    </div>

                                                    {/* Child Menus */}
                                                    <div className="ps-4 border-start">
                                                        <h6 className="text-muted">Dropdown Items (Optional)</h6>
                                                        {menu.children.map((child, cIndex) => (
                                                            <div key={cIndex} className="link-item-row mb-2">
                                                                <input placeholder="Sub Menu Label" className="form-control" value={child.label} onChange={(e) => handleChildMenuChange(mIndex, cIndex, 'label', e.target.value)} />
                                                                <input placeholder="Sub Menu Link" className="form-control" value={child.path} onChange={(e) => handleChildMenuChange(mIndex, cIndex, 'path', e.target.value)} />
                                                                <button className="btn btn-danger light py-2" onClick={() => removeChildMenu(mIndex, cIndex)}>
                                                                    <i className="fa-slab fa-regular fa-xmark"></i>
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button className="btn btn-sm btn-primary btn-radius-8 mt-2" onClick={() => addChildMenu(mIndex)}>
                                                            <i className="fa-solid fa-plus me-1"></i> Add Dropdown Item
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    </div>
                </div>

                {/* 5. Action Button */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        <h5 className="mb-0">Action Button </h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Button Text</label>
                                <input className="form-control" value={formData.actionButton.text} onChange={(e) => setFormData({ ...formData, actionButton: { ...formData.actionButton, text: e.target.value } })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Button URL</label>
                                <input className="form-control" value={formData.actionButton.url} onChange={(e) => setFormData({ ...formData, actionButton: { ...formData.actionButton, url: e.target.value } })} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center pb-5">
                    <button className=" btn btn-primary py-3 btn-radius-8" onClick={handleSave} disabled={loading}>
                        <i className="fa-duotone fa-solid fa-arrow-down-to-arc me-2"></i>
                        {loading ? 'Saving...' : 'Save Header'}
                    </button>
                </div>
           
            </div>
        </>
    );
};

export default HeaderAdmin;