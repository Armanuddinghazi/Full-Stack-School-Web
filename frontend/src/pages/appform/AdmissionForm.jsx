import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import apiClient from '../../api/apiClient';
import { toast } from "react-toastify";

const AdmissionForm = () => {

    const [form, setForm] = useState({
        student: {
            firstName: "",
            lastName: "",
            dob: "",
            previousClass: "",
            applyingClass: "",
            previousSchool: "",
            gender: "",
            bloodGroup: "",
            source: "",
            ageOnApril: "",
            studiedBefore: ""
        },
        parents: {
            fatherName: "",
            motherName: "",
            fatherPhone: "",
            fatherEmail: "",
            fatherOccupation: "",
            motherOccupation: "",
            motherPhone: ""
        },
        siblings: [
            { name: "", class: "" },
            { name: "", class: "" }
        ],
        guardian: {
            name: "",
            relation: ""
        },
        address: {
            permanent: "",
            parentAddress: ""
        },
        agree: false
    });

  

    const debounceRef = useRef(null);

    const debouncedApiCall = (data) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }


        debounceRef.current = setTimeout(async () => {
            try {
                console.log(" Debounced API Payload:", data);
                // await apiClient.post("/admission", form);
            } catch (error) {
                console.error(" Debounced API Error:", error);
            }
        }, 800);
    };

    const handleChange = (e, section, field, index = null) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setForm((prev) => {
            let updatedForm;

            if (section === "siblings") {
                const siblings = [...prev.siblings];
                siblings[index][field] = value;
                updatedForm = { ...prev, siblings };
            }
            else if (section === "agree") {
                updatedForm = { ...prev, agree: value };
            }
            else {
                updatedForm = {
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: value
                    }
                };
            }
            debouncedApiCall(updatedForm);

            return updatedForm;
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.agree) {
            toast.error("Please accept Terms & Conditions");
            return;
        }
        console.log("Student Details:", form.student);
        try {
            const res = await apiClient.post("/admission", form);
            console.log('Response admisson form', res.data);
            toast.success("Admission Form Submitted Successfully");

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };


    // const handleChange = (e, section, field, index = null) => {
    //     const value = e.target.value;

    //     if (section === "siblings") {
    //         const updated = [...form.siblings];
    //         updated[index][field] = value;
    //         setForm({ ...form, siblings: updated });
    //     } else if (section === "agree") {
    //         setForm({ ...form, agree: e.target.checked });
    //     } else {
    //         setForm({
    //             ...form,
    //             [section]: { ...form[section], [field]: value }
    //         });
    //     }
    // };

    return (
        <>
            <Breadcrumb
                title="Addmission Form"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Addmission Form", active: true }
                ]}
            />

            <div className="application py-120">
                <div className="container">
                    <div className="application-form" data-aos="zoom-in">
                        <h3>Addmission Form</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <h5 className="mb-3">Student Details</h5>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student First Name</label>
                                        <input type="text" className="form-control" name="firstname" placeholder="Enter Student First Name"
                                            onChange={(e) => handleChange(e, "student", "firstName")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Last Name</label>
                                        <input type="text" className="form-control" name="lastname" placeholder="Enter Student Last Name"
                                            onChange={(e) => handleChange(e, "student", "lastName")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Date Of Birth</label>
                                        <input type="date" className="form-control" name="dob"
                                            onChange={(e) => handleChange(e, "student", "dob")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Previous Class</label>
                                        <select className="form-select" name="previousClass"
                                            onChange={(e) => handleChange(e, "student", "previousClass")}>
                                            <option value="">Choose Program Type</option>
                                            <option value="1">Program Type 01</option>
                                            <option value="2">Program Type 02</option>
                                            <option value="3">Program Type 03</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Applying For Class</label>
                                        <select className="form-select" name="applyingClass"
                                            required onChange={(e) => handleChange(e, "student", "applyingClass")}>
                                            <option value="">Select Applying For Class</option>
                                            <option value="1">Play Group</option>
                                            <option value="2">Nursury</option>
                                            <option value="3">LKG</option>
                                            <option value="4">UKG</option>
                                            <option value="5">Class 1</option>
                                            <option value="6">Class 2</option>
                                            <option value="7">Class 3</option>
                                            <option value="8">Class 4</option>
                                            <option value="9">Class 5</option>
                                            <option value="10">Class 6</option>
                                            <option value="11">Class 7</option>
                                            <option value="12">Class 8</option>
                                            <option value="13">Class 9</option>
                                            <option value="14">Class 10</option>
                                            <option value="15">Class 11</option>
                                            <option value="16">Class 12</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Previous School</label>
                                        <input type="text" className="form-control" name="previousSchool" placeholder="Enter Previous School"
                                            onChange={(e) => handleChange(e, "student", "previousSchool")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Gender</label>
                                        <select className="form-select" name="gender"
                                            required onChange={(e) => handleChange(e, "student", "gender")}>
                                            <option value="">Select Student Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Blood Group</label>
                                        <select className="form-select" name="bloodGroup"
                                            onChange={(e) => handleChange(e, "student", "bloodGroup")}>
                                            <option value="">Select Student Blood Group</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Source Of Information</label>
                                        <select className="form-select" name="source"
                                            onChange={(e) => handleChange(e, "student", "source")}>
                                            <option value="">Select Source Of Information</option>
                                            <option value="Newspaper">Newspaper</option>
                                            <option value="Word Of Mouth">Word Of Mouth</option>
                                            <option value="Hoardings">Hoardings</option>
                                            <option value="Radio FM">Radio FM</option>
                                            <option value="Social Media">Social Media</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Age As On 1st April</label>
                                        <input type="text" className="form-control" name="ageOnApril" placeholder="Age As On 1st April"
                                            onChange={(e) => handleChange(e, "student", "ageOnApril")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Have You Studied in GD Goenka before?</label>
                                        <input type="text" className="form-control" name="studiedBefore" placeholder="Have Studied in GD Goenka before?"
                                            onChange={(e) => handleChange(e, "student", "studiedBefore")} />
                                    </div>
                                </div>

                                <h5 className="mt-4 mb-3">Parent Details</h5>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Father's Name</label>
                                        <input type="text" className="form-control" name="fathername" placeholder="Your Father's Name"
                                            onChange={(e) => handleChange(e, "parents", "fatherName")} required />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Mother's Name</label>
                                        <input type="text" className="form-control" name="motherName" placeholder="Your Mother's Name"
                                            onChange={(e) => handleChange(e, "parents", "motherName")} required />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Father Contact Number</label>
                                        <input required pattern="[0-9]{10}" className="form-control" name="fatherPhone" placeholder="Your Father Contact Number"
                                            onChange={(e) => handleChange(e, "parents", "fatherPhone")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Father Email Address</label>
                                        <input type="email" className="form-control" name="fatherEmail" placeholder="Your Father Email Address"
                                            onChange={(e) => handleChange(e, "parents", "fatherEmail")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Father Occupation</label>
                                        <input type="text" className="form-control" name="fatherOccupation" placeholder="Your Father Occupation"
                                            onChange={(e) => handleChange(e, "parents", "fatherOccupation")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Mother Occupation</label>
                                        <input type="text" className="form-control" name="motherOccupation" placeholder="Your Mother Occupation"
                                            onChange={(e) => handleChange(e, "parents", "motherOccupation")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Mother Contact Number</label>
                                        <input pattern="[0-9]{10}" className="form-control" name="motherPhone" placeholder="Your Mother Contact Number"
                                            onChange={(e) => handleChange(e, "parents", "motherPhone")} />
                                    </div>
                                </div>

                                <h5 className="mt-4 mb-3">Sibling Details</h5>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Sibling No1 Name</label>
                                        <input type="text" className="form-control" name="sibling-name1" placeholder="Sibling No1 Name"
                                            onChange={(e) => handleChange(e, "siblings", "name", 0)} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Sibling No2 Name</label>
                                        <input type="text" className="form-control" name="sibling-name2" placeholder="Sibling No2 Name"
                                            onChange={(e) => handleChange(e, "siblings", "name", 1)} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Sibling No1 Name Class</label>
                                        <input type="text" className="form-control" name="sibling-name-class1" placeholder="Sibling No1 Name Class"
                                            onChange={(e) => handleChange(e, "siblings", "class", 0)} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Sibling No2 Name Class</label>
                                        <input type="text" className="form-control" name="sibling-name-class2" placeholder="Sibling No2 Name Class"
                                            onChange={(e) => handleChange(e, "siblings", "class", 1)} />
                                    </div>
                                </div>
                                <h5 className="mt-4 mb-3">Guardians Details</h5>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Guardian Name</label>
                                        <input type="text" className="form-control" name="name" placeholder="Guardian Name"
                                            onChange={(e) => handleChange(e, "guardian", "name")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Relation With Candidate</label>
                                        <input type="text" className="form-control" name="relation" placeholder="Relation With Candidate"
                                            onChange={(e) => handleChange(e, "guardian", "relation")} />
                                    </div>
                                </div>
                                <h5 className="mt-4 mb-3">Our Address</h5>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Permanent Address</label>
                                        <textarea rows={4} className="form-control" name="permanent" placeholder="Permanent Address"
                                            onChange={(e) => handleChange(e, "address", "permanent")} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Address Of Parents/guardian</label>
                                        <textarea rows={4} className="form-control" name="parentAddress" placeholder="Address Of Parents/guardian"
                                            onChange={(e) => handleChange(e, "address", "parentAddress")} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="agree" name="agree" value="1"
                                            onChange={(e) => handleChange(e, "agree")} />
                                        <label className="form-check-label" for="agree">
                                            By Submitting This Form You Agree To The <a href="#">Terms & Conditions</a> And <a href="#">Privacy Policy</a>.
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button type="submit" className="theme-btn">Submit Application<i className="fas fa-arrow-right-long"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdmissionForm