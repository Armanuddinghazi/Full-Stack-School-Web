import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const ContactAdmin = () => {
    const [data, setData] = useState({
        address: "",
        phone: "",
        email: "",
        openTime: "",
        heading: "",
        description: ""
    });

    /* 🔹 FETCH CONTACT */
    const fetchContact = async () => {
        try {
            const res = await apiClient.get("/contact");
            if (res.data) setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    /* 🔹 SAVE / UPDATE */
    const saveContact = async () => {
        if (
            !data.address ||
            !data.phone ||
            !data.email ||
            !data.openTime ||
            !data.heading ||
            !data.description
        ) {
            toast.error("All fields are required");
            return;
        }

        try {
            await apiClient.post("/contact", data, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            toast.success("Contact details saved / updated");
            fetchContact();
        } catch (err) {
            toast.error("Something went wrong");
        }
    };


    /* 🔹 DELETE WITH CONFIRM */
    const deleteContact = () => {
        toast.warn(
            ({ closeToast }) => (
                <div>
                    <p className="mb-2">
                        Are you sure you want to delete contact details?
                    </p>

                    <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={async () => {
                            await apiClient.delete("/api/contact", {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            });

                            setData({
                                address: "",
                                phone: "",
                                email: "",
                                openTime: "",
                                heading: "",
                                description: ""
                            });

                            toast.success("Contact deleted");
                            closeToast();
                        }}
                    >
                        Yes
                    </button>

                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={closeToast}
                    >
                        No
                    </button>
                </div>
            ),
            { autoClose: false }
        );
    };

    return (

        <div className="container py-4">
            {/* Header */}
            <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                <h5 className="mb-0">
                    <i className="fa-solid fa-images me-2 text-primary"></i>
                    Contact Admin Manager
                </h5>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    {/* Form Card */}
                    <div className="card custom-card mb-4">
                        <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            <h5 className="mb-0">Contact Page</h5>
                        </div>

                        <div className="card-body">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label htmlFor="">Address</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Office Address"
                                        value={data.address}
                                        onChange={e => setData({ ...data, address: e.target.value })}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label htmlFor="">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Phone Number"
                                        value={data.phone}
                                        onChange={e => setData({ ...data, phone: e.target.value })}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="email"
                                        className="form-control mb-2"
                                        placeholder="Email Address"
                                        value={data.email}
                                        onChange={e => setData({ ...data, email: e.target.value })}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label htmlFor=""> Time</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder=" Time "
                                        value={data.openTime}
                                        onChange={e => setData({ ...data, openTime: e.target.value })}
                                    />
                                </div>


                                <div className="col-md-12 d-none">
                                    <label htmlFor="">Heading</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Contact Heading"
                                        value={data.heading}
                                        onChange={e => setData({ ...data, heading: e.target.value })}
                                    />
                                </div>


                                <div className="col-md-12 d-none">
                                    <label htmlFor="">Description</label>
                                    <textarea
                                        className="form-control mb-3"
                                        rows="4"
                                        placeholder="Contact Description"
                                        value={data.description}
                                        onChange={e =>
                                            setData({ ...data, description: e.target.value })
                                        }
                                    />
                                </div>


                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary py-2 btn-radius-8" onClick={saveContact}>
                                        <i className="fas fa-save"></i> Save /Update
                                    </button>

                                    <button className="btn btn-danger light py-2 btn-radius-8" onClick={deleteContact}>
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactAdmin;
