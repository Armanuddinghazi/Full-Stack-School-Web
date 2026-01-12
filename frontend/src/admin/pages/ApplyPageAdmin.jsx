import { useState, useEffect, useRef } from "react";
import apiClient from "../../api/apiClient";
import { toast } from 'react-toastify';

const emptyForm = {
    howApply: {
        title: "",
        description: "",
        description2: "",
        leftList: [{ text: "" }],
        rightList: [{ text: "" }],
        buttonText: "",
        buttonLink: ""
    },
    image: null
};

const AdminApplyPage = () => {
    const [form, setForm] = useState(emptyForm);
    const originalData = useRef(null); // for cancel/reset

    /* ================= FETCH EXISTING DATA ================= */
    useEffect(() => {
        const fetchData = async () => {
            const res = await apiClient.get("/applypage");
            if (res.data) {
                setForm(res.data);
                originalData.current = res.data;
            }
        };
        fetchData();
    }, []);

    /* ================= LIST HANDLERS ================= */
    const handleListChange = (type, index, value) => {
        setForm((prev) => {
            const updated = [...prev.howApply[type]];
            updated[index].text = value;
            return {
                ...prev,
                howApply: { ...prev.howApply, [type]: updated }
            };
        });
    };

    const addListItem = (type) => {
        setForm((prev) => ({
            ...prev,
            howApply: {
                ...prev.howApply,
                [type]: [...prev.howApply[type], { text: "" }]
            }
        }));
    };

    const removeListItem = (type, index) => {
        setForm((prev) => ({
            ...prev,
            howApply: {
                ...prev.howApply,
                [type]: prev.howApply[type].filter((_, i) => i !== index)
            }
        }));
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {
        const fd = new FormData();
        fd.append("data", JSON.stringify(form));
        if (form.image) fd.append("image", form.image);

        await apiClient.post("/applypage", fd);
        toast.success("Updated Successfully ")
        originalData.current = form;
    };

    /* ================= CANCEL ================= */
    const handleCancel = () => {
        if (originalData.current) {
            setForm(originalData.current);
        }
    };

    return (
        <>
            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-images me-2 text-primary"></i>
                        Apply Page Admin
                    </h5>
                </div>
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                <h5 className="mb-0">Apply Page Table</h5>
                            </div>

                            <div className="card-body">
                                <div className="row g-3">
                                   <div className="col-lg-12">
                                    <label htmlFor="">Description 1</label>
                                     <textarea
                                        className="form-control mb-2"
                                        rows={3}
                                        placeholder="Description"
                                        value={form.howApply.description}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                howApply: { ...form.howApply, description: e.target.value }
                                            })
                                        }
                                    />
                                   </div>

                                   <div className="col-lg-12">
                                    <label htmlFor="">Description 2</label>
                                     <textarea
                                        className="form-control mb-3"
                                        placeholder="Description 2"
                                        rows={3}
                                        value={form.howApply.description2}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                howApply: { ...form.howApply, description2: e.target.value }
                                            })
                                        }
                                    />

                                   </div>
                                    {/* LEFT LIST */}
                                    <h5 className="mb-0">Left List</h5>
                                    <div className="col-lg-12">
                                        {form.howApply.leftList.map((item, i) => (
                                        <div key={i} className="d-flex gap-2 mb-2">
                                            <input
                                                className="form-control"
                                                placeholder={`List ${i + 1}`}
                                                value={item.text}
                                                onChange={(e) => handleListChange("leftList", i, e.target.value)}
                                            />
                                            <button
                                                className="btn btn-danger light"
                                                onClick={() => removeListItem("leftList", i)}
                                            >
                                               <i className="fa-slab fa-regular fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <button className="btn btn-primary light py-2 mt-2 btn-radius-8 mb-3" onClick={() => addListItem("leftList")}>
                                       <i className="fa-solid fa-plus me-1"></i>  Add Left Item
                                    </button>
                                    </div>

                                    {/* RIGHT LIST */}
                                    <h5 className="mb-0">Right List</h5>
                                    <div className="col-lg-12">
                                        {form.howApply.rightList.map((item, i) => (
                                        <div key={i} className="d-flex gap-2 mb-2">
                                            <input
                                                className="form-control"
                                                placeholder={`List ${i + 1}`}
                                                value={item.text}
                                                onChange={(e) => handleListChange("rightList", i, e.target.value)}
                                            />
                                            <button
                                                className="btn btn-danger light"
                                                onClick={() => removeListItem("rightList", i)}
                                            >
                                                <i className="fa-slab fa-regular fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <button className="btn btn-primary light py-2 mt-2 btn-radius-8 mb-3" onClick={() => addListItem("rightList")}>
                                         <i className="fa-solid fa-plus me-1"></i>  Add Right Item
                                    </button>
                                    </div>

                                    {/* IMAGE */}
                                    <input
                                        type="file"
                                        className="form-control mb-3"
                                        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                                    />

                                    {/* BUTTON */}
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-success dark py-2  btn-radius-8" onClick={handleSubmit}>
                                          <i className="fa-duotone fa-solid fa-arrow-down-to-arc"></i>  Save / Update
                                        </button>
                                        <button className="btn btn-danger light py-2  btn-radius-8" onClick={handleCancel}>
                                          <i className="fa-solid fa-xmark me-1"></i>  Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminApplyPage;
