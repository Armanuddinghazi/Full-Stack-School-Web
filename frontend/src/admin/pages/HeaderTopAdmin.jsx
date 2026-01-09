import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const HeaderTopAdmin = () => {
    const [form, setForm] = useState({
        email: "",
        phone: "",
        address: "",
        facebook: "",
        instagram: "",
        twitter: "",
        whatsapp: "",
        footerContent: "",
        headerLogo: null,
        footerLogo: null
    });
    const [id, setId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await apiClient.get("/headertop");
        if (res.data) {
            setForm({ ...res.data, ...res.data.socialLinks });
            setId(res.data._id);
        }
    };

    const handleSubmit = async () => {
        try {
            const fd = new FormData();

            fd.append("email", form.email);
            fd.append("phone", form.phone);
            fd.append("address", form.address);
            fd.append("footerContent", form.footerContent);

            fd.append(
                "socialLinks",
                JSON.stringify({
                    facebook: form.facebook,
                    instagram: form.instagram,
                    twitter: form.twitter,
                    whatsapp: form.whatsapp,
                })
            );

            if (form.headerLogo) fd.append("headerLogo", form.headerLogo);
            if (form.footerLogo) fd.append("footerLogo", form.footerLogo);


            if (id) {
                await apiClient.put(`/headertop/${id}`, fd);
                toast.success("Updated Successfully");
            } else {
                await apiClient.post("/headertop", fd);
                toast.success("Added Successfully");
            }
            fetchData();
        } catch (error) {

        }
    };

    // const resetForm = () => {
    //     id(null);
    //     setForm({
    //         email: "",
    //         phone: "",
    //         address: "",
    //         facebook: "",
    //         instagram: "",
    //         twitter: "",
    //         whatsapp: ""
    //     });
    // };

    return (
        <>
            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-images me-2 text-primary"></i>
                        Header Top Admin Manager
                    </h5>
                </div>
                <div className="row">
                    <div className="col-lg-9 m-auto">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                <h5 className="mb-0">{id ? "Update Header Contact" : "Add Header Contact"}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-lg-6">
                                        <label htmlFor="">Email</label>
                                        <input type="email" className="form-control" placeholder="Email" value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="">Phone Number</label>
                                        <input type="phone" className="form-control" placeholder="Phone Number" value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="">Header Logo</label>
                                        <input type="file" className="form-control"
                                            onChange={e => setForm({ ...form, headerLogo: e.target.files[0] })} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="">Footer Logo</label>
                                        <input type="file" className="form-control"
                                            onChange={e => setForm({ ...form, footerLogo: e.target.files[0] })} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="">Location</label>
                                        <input type="text" className="form-control" placeholder="Location" value={form.address}
                                            onChange={e => setForm({ ...form, address: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="">Facebook URL</label>
                                        <input type="url" className="form-control" placeholder="Facebook" value={form.facebook}
                                            onChange={e => setForm({ ...form, facebook: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="">Instagram URL</label>
                                        <input type="url" className="form-control" placeholder="Instagram" value={form.instagram}
                                            onChange={e => setForm({ ...form, instagram: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="">Twitter URL</label>
                                        <input type="url" className="form-control" placeholder="Twitter" value={form.twitter}
                                            onChange={e => setForm({ ...form, twitter: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="">Whatsapp URL</label>
                                        <input type="url" className="form-control" placeholder="Whatsapp" value={form.whatsapp}
                                            onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="">Footer Content</label>
                                        <textarea rows={4} type="text" className="form-control" placeholder="Description"
                                            value={form.footerContent}
                                            onChange={e => setForm({ ...form, footerContent: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button className={`btn me-2 py-2 btn-radius-8 ${id ? "btn-success light" : "btn-primary"}`} onClick={handleSubmit}>
                                    {id ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                    {id ? "Update" : "Add"}
                                </button>

                                {/* {id && (
                                    <button className="btn btn-danger light py-2 btn-radius-8" onClick={resetForm}>
                                        <i className="fa-solid fa-xmark me-1"></i>
                                        Cancel
                                    </button>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopAdmin;
