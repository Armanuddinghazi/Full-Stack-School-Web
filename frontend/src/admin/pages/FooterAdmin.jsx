import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';

const FooterAdmin = () => {
    const BASE_URL = import.meta.env.VITE_API_URL_IMG;

    const [formData, setFormData] = useState({
        logo: '',
        aboutContent: '',
        contact: { phone: '', address: '', email: '' },
        menuColumns: [],
        socialLinks: [],
        newsletter: { title: '', text: '', placeholder: '' },
        copyrightText: ''
    });

    const [logoFile, setLogoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // 1. Data Fetching
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await apiClient.get("/footer");
            if (res.data) setFormData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // 2. Generic Change Handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Logo File Select
    const handleFileChange = (e) => {
        setLogoFile(e.target.files[0]);
    };
    // 3. Nested Object Handler (Contact, Newsletter)
    const handleNestedChange = (parent, field, value) => {
        setFormData({
            ...formData,
            [parent]: { ...formData[parent], [field]: value }
        });
    };

    // ============================================
    //  DYNAMIC MENUS LOGIC
    // ============================================
    const addMenuColumn = () => {
        const newCol = { title: 'New Menu', columnClass: 'col-lg-3', links: [] };
        setFormData({ ...formData, menuColumns: [...formData.menuColumns, newCol] });
    };

    const removeMenuColumn = (index) => {
        const updatedCols = formData.menuColumns.filter((_, i) => i !== index);
        setFormData({ ...formData, menuColumns: updatedCols });
    };

    const handleColumnChange = (index, field, value) => {
        const updatedCols = [...formData.menuColumns];
        updatedCols[index][field] = value;
        setFormData({ ...formData, menuColumns: updatedCols });
    };

    const addLinkToColumn = (colIndex) => {
        const updatedCols = [...formData.menuColumns];
        updatedCols[colIndex].links.push({ label: 'New Link', url: '/', icon: 'fas fa-caret-right' });
        setFormData({ ...formData, menuColumns: updatedCols });
    };

    const removeLinkFromColumn = (colIndex, linkIndex) => {
        const updatedCols = [...formData.menuColumns];
        updatedCols[colIndex].links = updatedCols[colIndex].links.filter((_, i) => i !== linkIndex);
        setFormData({ ...formData, menuColumns: updatedCols });
    };

    const handleLinkChange = (colIndex, linkIndex, field, value) => {
        const updatedCols = [...formData.menuColumns];
        updatedCols[colIndex].links[linkIndex][field] = value;
        setFormData({ ...formData, menuColumns: updatedCols });
    };

    // ============================================
    //  SOCIAL LINKS LOGIC
    // ============================================
    const addSocial = () => {
        setFormData({ ...formData, socialLinks: [...formData.socialLinks, { icon: 'fab fa-facebook', url: '#' }] });
    };

    const removeSocial = (index) => {
        const updatedSocials = formData.socialLinks.filter((_, i) => i !== index);
        setFormData({ ...formData, socialLinks: updatedSocials });
    };

    const handleSocialChange = (index, field, value) => {
        const updatedSocials = [...formData.socialLinks];
        updatedSocials[index][field] = value;
        setFormData({ ...formData, socialLinks: updatedSocials });
    };

    // 4. Save Data
    const handleSave = async () => {
        setLoading(true);
        try {
            const dataPayload = new FormData();
            dataPayload.append('data', JSON.stringify(formData));

            if (logoFile) {
                dataPayload.append('logo', logoFile);
            }

            await apiClient.put("/footer", dataPayload);
            toast.success('Footer Updated Successfully!');
            fetchData();
            setLogoFile(null);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            toast.error('Error Updating Footer');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="container">
                {/* Header */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-images me-2 text-primary"></i>
                        Footer Management Dashboard
                    </h5>
                </div>
                {/* {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>} */}

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

                {/* SECTION 1: General Info */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        <h5 className="mb-0">General Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {/* <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Logo URL</label>
                                    <input className="form-control" name="logo" value={formData.logo} onChange={handleChange} />
                                </div>
                            </div> */}
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Copyright Text</label>
                                    <input className="form-control" name="copyrightText" value={formData.copyrightText} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">About Content</label>
                                    <textarea className="form-control" rows="3" name="aboutContent" value={formData.aboutContent} onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Contact Info */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        <h5 className="mb-0">Contact Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label">Phone</label>
                                <input className="form-control" value={formData.contact.phone} onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Email</label>
                                <input className="form-control" value={formData.contact.email} onChange={(e) => handleNestedChange('contact', 'email', e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Address</label>
                                <input className="form-control" value={formData.contact.address} onChange={(e) => handleNestedChange('contact', 'address', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ------------------------------------------- */}
                {/* SECTION 3: NEWSLETTER SECTION (ADDED NEW)   */}
                {/* ------------------------------------------- */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        <h5 className="mb-0">Newsletter Configuration</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Section Title</label>
                                    <input
                                        className="form-control"
                                        value={formData.newsletter?.title || ''}
                                        onChange={(e) => handleNestedChange('newsletter', 'title', e.target.value)}
                                        placeholder="Ex: Newsletter"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Input Placeholder</label>
                                    <input
                                        className="form-control"
                                        value={formData.newsletter?.placeholder || ''}
                                        onChange={(e) => handleNestedChange('newsletter', 'placeholder', e.target.value)}
                                        placeholder="Ex: Your Email"
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Description Text</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={formData.newsletter?.text || ''}
                                        onChange={(e) => handleNestedChange('newsletter', 'text', e.target.value)}
                                        placeholder="Ex: Subscribe Our Newsletter To Get Latest Update..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 4: DYNAMIC MENUS */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center justify-content-between bg-primary
                      text-white fw-semibold mb-3">
                        <h5 className="mb-0">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            Menu Management (Dynamic Columns)</h5>
                        <button className="btn btn-success dark btn-radius-8 py-2" onClick={addMenuColumn}>
                            <i className="fa-solid fa-plus me-1"></i>  Add New Column
                        </button>
                    </div>

                    <div className="card-body">
                        {formData.menuColumns.map((col, colIndex) => (
                            <div key={colIndex} className="menu-column-card">

                                <button className="delete-btn-top btn btn-danger py-1 light btn-radius-8" onClick={() => removeMenuColumn(colIndex)}>
                                    <i className="fa-solid fa-trash me-2"></i>
                                    Remove Column </button>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Column Title (Rename Here)</label>
                                        <input
                                            className="form-control"
                                            value={col.title}
                                            onChange={(e) => handleColumnChange(colIndex, 'title', e.target.value)}
                                            placeholder="Ex: Quick Links"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Bootstrap Class (Width)</label>
                                        <input
                                            className="form-control"
                                            value={col.columnClass}
                                            onChange={(e) => handleColumnChange(colIndex, 'columnClass', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <label className="form-label">Links in this Column:</label>
                                {col.links.map((link, linkIndex) => (
                                    <div key={linkIndex} className="link-item-row">
                                        <input
                                            placeholder="Label (Eg: Home)"
                                            className="form-control"
                                            value={link.label}
                                            onChange={(e) => handleLinkChange(colIndex, linkIndex, 'label', e.target.value)}
                                        />
                                        <input
                                            placeholder="URL (Eg: /home)"
                                            className="form-control"
                                            value={link.url}
                                            onChange={(e) => handleLinkChange(colIndex, linkIndex, 'url', e.target.value)}
                                        />
                                        <input
                                            placeholder="Icon Class"
                                            className="form-control"
                                            value={link.icon}
                                            onChange={(e) => handleLinkChange(colIndex, linkIndex, 'icon', e.target.value)}
                                        />
                                        <button className="btn btn-danger light py-2" onClick={() => removeLinkFromColumn(colIndex, linkIndex)}>
                                            <i className="fa-slab fa-regular fa-xmark"></i>
                                        </button>
                                    </div>
                                ))}
                                <button className="btn btn-success dark btn-radius-8 py-2 mt-2" onClick={() => addLinkToColumn(colIndex)}>
                                    <i className="fa-solid fa-plus me-1"></i>
                                    Add Link Item</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 5: Social Links */}
                <div className="card custom-card mb-4">
                    <div className="card-header card-header-custom d-flex align-items-center justify-content-between bg-primary
                      text-white fw-semibold mb-3">
                        <h5 className="mb-0">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            Social Media Links</h5>
                        <button className="btn btn-success dark btn-radius-8 py-2 " onClick={addSocial}><i className="fa-solid fa-plus me-1"></i> Add Social</button>
                    </div>
                    <div className="card-body">
                        {formData.socialLinks.map((social, index) => (
                            <div key={index} className="link-item-row">
                                <input
                                    placeholder="Icon Class (fab fa-facebook)"
                                    className="form-control"
                                    value={social.icon}
                                    onChange={(e) => handleSocialChange(index, 'icon', e.target.value)}
                                />
                                <input
                                    placeholder="URL"
                                    className="form-control"
                                    value={social.url}
                                    onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                                />
                                <button className="btn btn-danger light py-2" onClick={() => removeSocial(index)}>
                                    <i className="fa-slab fa-regular fa-xmark"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SAVE BUTTON */}
                <div className="text-center pb-5">
                    <button className=" btn btn-primary py-3 btn-radius-8" onClick={handleSave} disabled={loading}>
                        <i className="fa-duotone fa-solid fa-arrow-down-to-arc me-2"></i>
                        {loading ? 'Saving...' : 'Save Footer '}
                    </button>
                </div>
            </div>
        </>
    );
};

export default FooterAdmin;