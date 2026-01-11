import React, { useEffect, useState } from "react";
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import apiClient from "../../api/apiClient";

const MandatoryDisclosure = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        apiClient.get("/disclosure").then(res => {
            setTables(res.data);
        });
    }, []);
    return (
        <>
            <Breadcrumb
                title="Mandatory Disclosure"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Mandatory Disclosure", active: true }
                ]}
            />

            <div className="tuition-fee py-50">
                <div className="container">
                    {/* <div className="tuition-wrap">
                        <div className="tuition-fee-table" >
                            <h4 className="my-4" data-aos="fade-right">GENERAL INFORMATION</h4>
                            <div className="table-responsive" data-aos="fade-right">
                                <table className="table table-light">
                                    <thead>
                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">Information</th>
                                            <th scope="col">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Name of the school</td>
                                            <td>Our Internation School</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Name of the school</td>
                                            <td>Our Internation School</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h4 className="my-4" data-aos="fade-right">DOCUMENTS AND INFORMATION</h4>
                            <div className="table-responsive" data-aos="fade-right">
                                <table className="table table-light">
                                    <thead className='bg-dark'>
                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">DOCUMENTS/INFORMATION</th>
                                            <th scope="col">LINKS OF UPLOADED DOCUMENTS ON YOUR SCHOOL'S WEBSITE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Name of the school</td>
                                            <td><button className='btn btn-outline-primary py-1'>Veiw</button></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Name of the school</td>
                                            <td><button className='btn btn-outline-primary py-1'>Veiw</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h4 className="my-4" data-aos="fade-right">RESULT AND ACADEMICS</h4>
                            <div className="table-responsive" data-aos="fade-right">
                                <table className="table table-light">
                                    <thead className='bg-dark'>
                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">DOCUMENTS/INFORMATION</th>
                                            <th scope="col">LINKS OF UPLOADED DOCUMENTS ON YOUR SCHOOL'S WEBSITE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Name of the school</td>
                                            <td><button className='btn btn-outline-primary py-1'>Veiw</button></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Name of the school</td>
                                            <td><button className='btn btn-outline-primary py-1'>Veiw</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h4 className="my-4" data-aos="fade-right">STAFF (TEACHING)</h4>
                            <div className="table-responsive" data-aos="fade-right">
                                <table className="table table-light">
                                    <thead className='bg-dark'>
                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">INFORMATION</th>
                                            <th scope="col">DETAILS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Name of the school</td>
                                            <td><button className='btn btn-outline-primary py-1'>Veiw</button></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Name of the school</td>
                                            <td><button className='btn btn-outline-primary py-1'>Veiw</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h4 className="my-4" data-aos="fade-right">RESULT CLASS: X</h4>
                            <div className="table-responsive" data-aos="fade-right">
                                <table className="table table-light">
                                    <thead className='bg-dark'>
                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">YEAR</th>
                                            <th scope="col">NO. OF REGISTERED STUDENTS</th>
                                            <th scope="col">NO. OF STUDENTS PASSED</th>
                                            <th scope="col">PASS PERCENTAGE</th>
                                            <th scope="col">REMARKS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>2025</td>
                                            <td>219</td>
                                            <td>180</td>
                                            <td>77.62</td>
                                            <td>!!</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <h4 className="my-4" data-aos="fade-right">RESULT CLASS: XII</h4>
                            <div className="table-responsive" data-aos="fade-right">
                                <table className="table table-light">
                                    <thead className='bg-dark'>
                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">YEAR</th>
                                            <th scope="col">NO. OF REGISTERED STUDENTS</th>
                                            <th scope="col">NO. OF STUDENTS PASSED</th>
                                            <th scope="col">PASS PERCENTAGE</th>
                                            <th scope="col">REMARKS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>2025</td>
                                            <td>219</td>
                                            <td>180</td>
                                            <td>77.62</td>
                                            <td>!!</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div> */}

                    <div className="tuition-wrap">
                        {tables.map((table) => (
                            <div key={table._id} className="mb-5">
                                <h4 className="mb-3" data-aos="fade-right">{table.title}</h4>

                                <div className="table-responsive" data-aos="fade-right">
                                    <table className="table table-light  table-bordered">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                {table.columns.map((col, i) => (
                                                    <th key={i}>{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table.rows.map((row, rIndex) => (
                                                <tr key={rIndex}>
                                                    <td>{rIndex + 1}</td>
                                                    {row.cells.map((cell, cIndex) => (
                                                        <td key={cIndex}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MandatoryDisclosure