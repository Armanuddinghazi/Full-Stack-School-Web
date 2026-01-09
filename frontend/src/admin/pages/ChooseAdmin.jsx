import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

const ChooseAdmin = () => {
    const initialForm = {
        tagline: "",
        heading: "",
        paragraph: "",
        cards: [
            { title: "", text: "" },
            { title: "", text: "" },
            { title: "", text: "" },
            { title: "", text: "" },
        ],
    };

    const [form, setForm] = useState(initialForm);
    const [image, setImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await apiClient.get("/chooseus");

        if (res.data) {
            setForm(res.data);
            setIsEdit(true);
        } else {
            setIsEdit(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("tagline", form.tagline);
        fd.append("heading", form.heading);
        fd.append("paragraph", form.paragraph);
        fd.append("cards", JSON.stringify(form.cards));
        if (image) fd.append("image", image);

        await apiClient.post("/chooseus", fd);

        toast.success(isEdit ? "Updated Successfully" : "Added Successfully");
        fetchData();
    };

    const handleCancel = () => {
        setForm(initialForm);
        setImage(null);
        setIsEdit(false);
    };



    return (
        <>
            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-images me-2 text-primary"></i>
                        Choose Us Admin Manager
                    </h5>
                </div>
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                <h5 className="mb-0">{isEdit ? "Update Choose Us Section" : "Add Choose Us Section"}</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-lg-6">
                                            <label htmlFor="">Tagline</label>
                                            <input
                                                className="form-control"
                                                placeholder="Tagline"
                                                value={form.tagline}
                                                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor="">Heading</label>
                                            <input
                                                className="form-control"
                                                placeholder="Heading"
                                                value={form.heading}
                                                onChange={(e) => setForm({ ...form, heading: e.target.value })}
                                            />
                                        </div>

                                        <div className="col-lg-12">
                                            <label htmlFor="">Message</label>
                                            <textarea
                                                rows={5}
                                                className="form-control"
                                                placeholder="Paragraph"
                                                value={form.paragraph}
                                                onChange={(e) => setForm({ ...form, paragraph: e.target.value })}
                                            />
                                        </div>

                                        {form.cards.map((card, i) => (
                                            <div key={i} className="col-lg-6">
                                                <label htmlFor="">{`Card ${i + 1} Title`}</label>
                                                <input
                                                    className="form-control mb-3"
                                                    placeholder={`Card ${i + 1} Title`}
                                                    value={card.title}
                                                    onChange={(e) => {
                                                        const cards = [...form.cards];
                                                        cards[i].title = e.target.value;
                                                        setForm({ ...form, cards });
                                                    }}
                                                />
                                                <label htmlFor="">{`Card ${i + 1} Text`}</label>
                                                <input
                                                    className="form-control"
                                                    placeholder={`Card ${i + 1} Text`}
                                                    value={card.text}
                                                    onChange={(e) => {
                                                        const cards = [...form.cards];
                                                        cards[i].text = e.target.value;
                                                        setForm({ ...form, cards });
                                                    }}
                                                />
                                            </div>
                                        ))}

                                        <div className="col-lg-12">
                                            <label htmlFor="">Image</label>
                                            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                        </div>

                                    </div>
                                    <div className="card-footer text-center mt-3 mb-0">
                                        <button type="submit" className={`btn me-2 py-2 btn-radius-8 ${isEdit ? "btn-success light" : "btn-primary"}`}>
                                            {isEdit ? <i className="fa-solid fa-rotate me-1"></i> : <i className="fa-solid fa-plus me-1"></i>}
                                            {isEdit ? "Update Choose Us" : "Add Choose Us"}
                                        </button>
                                        {isEdit && (
                                            <button className="btn btn-danger light py-2 btn-radius-8" onClick={handleCancel}>
                                                <i className="fa-solid fa-xmark me-1"></i>
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChooseAdmin;
