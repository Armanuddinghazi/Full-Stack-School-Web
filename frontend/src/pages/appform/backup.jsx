import React from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";


const ApplicationForm = () => {

    return (
        <>
            <Breadcrumb
                title="Application Form"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Application Form", active: true }
                ]}
            />

            <div className="application py-120">
                <div className="container">
                    <div className="application-form" data-aos="zoom-in">
                        <h3>Application Form</h3>
                        <form action="#">
                            <div className="row">
                                <h5 className="mb-3">Student Details</h5>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student First Name</label>
                                        <input type="text" className="form-control" name="firstname" placeholder="Enter Student First Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Last Name</label>
                                        <input type="text" className="form-control" name="lastname" placeholder="Enter Student Last Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Date Of Birth</label>
                                        <input type="date" className="form-control" name="dob" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Previous Class</label>
                                        <select className="form-select" name="program">
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
                                        <select className="form-select" name="degree">
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
                                        <input type="text" className="form-control" name="lastname" placeholder="Enter Previous School" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Gender</label>
                                        <select className="form-select" name="program">
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
                                        <select className="form-select" name="program">
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
                                        <select className="form-select" name="program">
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
                                        <input type="text" className="form-control" name="" placeholder="Age As On 1st April" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Have You Studied In Any Of Gd Goenka School Earlier</label>
                                        <input type="text" className="form-control" name="" placeholder="Have You Studied In Any Of Gd  School Earlier" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Photo</label>
                                        <input type="file" className="form-control" name="photo" aria-describedby="photohelp" />
                                        <div id="photohelp" className="form-text">Your Photo Must be in Passport (PP) Size. Max Upload Size 1MB.</div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Upload Passport or Birth Document</label>
                                        <input type="file" className="form-control" name="document" aria-describedby="dochelp" />
                                        <div id="dochelp" className="form-text">Upload File Must Be Zip File. Max Upload Size 1MB.</div>
                                    </div>
                                </div>
                                <h5 className="mt-4 mb-3">Personal Information</h5>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Father's Name</label>
                                        <input type="text" className="form-control" name="fathername" placeholder="Your Father's Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Mother's Name</label>
                                        <input type="text" className="form-control" name="mothername" placeholder="Your Mother's Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Contact Number</label>
                                        <input type="text" className="form-control" name="number" placeholder="Your Contact Number" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" name="email" placeholder="Your Email Address" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Present Address</label>
                                        <input type="text" className="form-control" name="address" placeholder="Your Present Address" />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>National ID Or Passport ID</label>
                                        <input type="text" className="form-control" name="nid" placeholder="Your ID Number" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select className="form-select" name="gender">
                                            <option value="">Choose Gender</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                            <option value="3">Others</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Student Type</label>
                                        <select className="form-select" name="studenttype">
                                            <option value="">Choose Student Type</option>
                                            <option value="1">Student Type 01</option>
                                            <option value="2">Student Type 02</option>
                                            <option value="3">Student Type 03</option>
                                        </select>
                                    </div>
                                </div>
                                <h5 className="mt-4 mb-3">Academic Information</h5>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>School</label>
                                        <input type="text" className="form-control" name="school" placeholder="Your School" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Year Of Completion</label>
                                        <input type="text" className="form-control" name="yoc" placeholder="Completion Year" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Highest Qualification</label>
                                        <input type="text" className="form-control" name="qualification" placeholder="Your Qualification" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Current Status</label>
                                        <select className="form-select" name="status">
                                            <option value="">Choose Current Status</option>
                                            <option value="1">Current Status 01</option>
                                            <option value="2">Current Status 02</option>
                                            <option value="3">Current Status 03</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Study Area</label>
                                        <select className="form-select" name="studyarea">
                                            <option value="">Choose Study Area</option>
                                            <option value="1">Study Area 01</option>
                                            <option value="2">Study Area 02</option>
                                            <option value="3">Study Area 03</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Academic Degree Level</label>
                                        <select className="form-select" name="academicdegree">
                                            <option value="">Choose Degree Level</option>
                                            <option value="1">Academic Degree Level 01</option>
                                            <option value="2">Academic Degree Level 02</option>
                                            <option value="3">Academic Degree Level 03</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="agree" name="agree" value="1" />
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

export default ApplicationForm