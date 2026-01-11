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

    const [image, setImage] = useState(null);
    const [hasData, setHasData] = useState(false);
    /* 🔹 FETCH CONTACT */
    const fetchContact = async () => {
        try {
            const res = await apiClient.get("/contact");

            if (res.data) {
                setData(res.data);
                setHasData(true);
            } else {
                setHasData(false);
            }
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
            const fd = new FormData();

            Object.keys(data).forEach((key) => {
                fd.append(key, data[key]);
            });

            if (image) {
                fd.append("image", image);
            }

            await apiClient.post("/contact", fd);
            toast.success(hasData ? "Contact updated successfully" : "Contact added successfully");

            fetchContact();
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    const cancelForm = () => {
        setData({
            address: "",
            phone: "",
            email: "",
            openTime: "",
            heading: "",
            description: "",
        });

        setImage(null);
        setHasData(false);
    };



    /* 🔹 DELETE WITH CONFIRM */
    // const deleteContact = () => {
    //     toast.warn(
    //         ({ closeToast }) => (
    //             <div>
    //                 <p className="mb-2">
    //                     Are you sure you want to delete contact details?
    //                 </p>

    //                 <button
    //                     className="btn btn-danger btn-sm me-2"
    //                     onClick={async () => {
    //                         await apiClient.delete("/api/contact", {
    //                             headers: {
    //                                 Authorization: localStorage.getItem("token")
    //                             }
    //                         });

    //                         setData({
    //                             address: "",
    //                             phone: "",
    //                             email: "",
    //                             openTime: "",
    //                             heading: "",
    //                             description: ""
    //                         });

    //                         toast.success("Contact deleted");
    //                         closeToast();
    //                     }}
    //                 >
    //                     Yes
    //                 </button>

    //                 <button
    //                     className="btn btn-secondary btn-sm"
    //                     onClick={closeToast}
    //                 >
    //                     No
    //                 </button>
    //             </div>
    //         ),
    //         { autoClose: false }
    //     );
    // };

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
                <div className="col-lg-8 m-auto">
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
                                        required
                                        pattern="[0-9]{10}"
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
                                        type="time"
                                        className="form-control mb-2"
                                        placeholder=" Time "
                                        value={data.openTime}
                                        onChange={e => setData({ ...data, openTime: e.target.value })}
                                    />
                                </div>


                                <div className="col-md-12 ">
                                    <label htmlFor="">Heading</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Contact Heading"
                                        value={data.heading}
                                        onChange={e => setData({ ...data, heading: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-12 ">
                                    <label htmlFor="">Contact Image</label>
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
                                        placeholder="Contact Description"
                                        value={data.description}
                                        onChange={e =>
                                            setData({ ...data, description: e.target.value })
                                        }
                                    />
                                </div>


                                <div className="d-flex gap-2">
                                    <button className={`btn me-2 py-2 btn-radius-8 ${hasData ? "btn-success light" : "btn-primary"}`} onClick={saveContact}>
                                        {hasData ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                        {hasData ? "Update Contact" : "Add Contact"}
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
            </div>
        </div>
    );
};

export default ContactAdmin;
