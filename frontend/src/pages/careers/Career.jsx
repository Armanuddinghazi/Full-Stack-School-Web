import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import { toast } from "react-toastify";
import apiClient from '../../api/apiClient';

const Careers = () => {

    const initialFormState = {
        fullName: "",
        email: "",
        mobile: "",
        salary: "",
        teachingExp: "",
        adminExp: "",
        vision: "",
        resident: "",
        post: "",
    };
    const [form, setForm] = useState(initialFormState);
    const [resume, setResume] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resume) {
            toast.error("Resume required");
            return;
        }

        if (!form.post) {
            toast.error("Please select post");
            return;
        }

        if (!form.resident) {
            toast.error("Please select residency");
            return;
        }

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        fd.append("resume", resume);

        try {
            const res = await apiClient.post("/careers", fd);

            toast.success(res.data.message);

            localStorage.setItem("uploadedResume", res.data.resume);
            // setUploadedResume(res.data.resume);

            setForm(initialFormState);
            setResume(null);
            document.getElementById("resumeInput").value = "";

        } catch (error) {
            console.log('error message submission', error?.response?.data?.message)
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Submission failed";
            toast.error(message);
        }
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
    };


    return (
        <>
            <Breadcrumb
                title="Careers"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Careers", active: true }
                ]}
            />

            <div className="application py-120">
                <div className="container">
                    <div className="application-form" data-aos="zoom-in">
                        <h3>Vacancies </h3>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" required className="form-control"
                                            name="fname" placeholder="Enter Full Name"
                                            value={form.fullName}
                                            onChange={e => setForm({ ...form, fullName: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" required className="form-control"
                                            name="email" placeholder="Enter Email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Mobile Number</label>
                                        <input type="text" required className="form-control"
                                            name="number" placeholder="Enter Number"
                                            value={form.mobile}
                                            onChange={e => setForm({ ...form, mobile: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>What is your expected salary (per month)?</label>
                                        <input type="text" required className="form-control"
                                            name="m-salery" placeholder="Enter Number"
                                            value={form.salary}
                                            onChange={e => setForm({ ...form, salary: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>How many years of Teaching experience (in a school) do you have?(Type NA if Not Applicable)</label>
                                        <input type="text" required className="form-control"
                                            name="texperince" placeholder="Enter Number"
                                            value={form.teachingExp}
                                            onChange={e => setForm({ ...form, teachingExp: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>How many years of administrative or coordination experience (in a school) do you have?(Type NA if Not Applicable) </label>
                                        <input type="text" required className="form-control"
                                            name="yearexp" placeholder="Enter Number"
                                            value={form.adminExp}
                                            onChange={e => setForm({ ...form, adminExp: e.target.value })} />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Tell us in brief, your vision for an ideal school in max 50 words?</label>
                                        <input type="text" required className="form-control"
                                            name="m-vission" placeholder="Enter Number"
                                            value={form.vision}
                                            onChange={e => setForm({ ...form, vision: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Are you a resident of Noida?</label>
                                        <select className="form-select" name="program"
                                        value={form.resident}
                                            onChange={e => setForm({ ...form, resident: e.target.value })}>
                                            <option value="">Choose</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Post Applying for?</label>
                                        <select className="form-select" name="program"
                                        value={form.post}
                                            onChange={e => setForm({ ...form, post: e.target.value })}>
                                            <option value="">Select Post</option>
                                            <option value="Teacher">Teacher</option>
                                            <option value="Front Office Manager">Front Office Manager</option>
                                            <option value="Academic Coordinator">Academic Coordinator</option>
                                            <option value="Accontant">Accontant</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className='text-lable'>Upload Resume</label>
                                        <input type="file" className="form-control"
                                            placeholder="Enter Number"
                                             id="resumeInput"
                                            onChange={handleResumeChange} />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <button type="submit" className="theme-btn">Apply Now<i className="fa-regular fa-paper-plane-top"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Careers