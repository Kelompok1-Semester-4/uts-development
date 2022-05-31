import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Header from "../Dashboard User/partials/Header";

const ConselorProfile = () => {

    const token = localStorage.getItem("token");
    const [conselor, setConselor] = useState({});
    const { id } = useParams();

    // get conselor
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/detail-conselor/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setConselor(res.data.data);
            })
    }, []);

    if (conselor != null) {
        console.log(conselor);
    }

    const updateVerificationStatus = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/update-verification/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                swal("Success", "Verification status updated", "success").then(() => {
                    window.location.reload();
                });
            })
            .catch(err => {
                swal("Error", err.message, "error");
            });
    }

    return (
        <div>
            <div className="dashboard">
                {/* HEADER */}
                <Header photo='https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg' />

                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            {/* profile image */}
                            <div className="profile-image">
                                <img
                                    src={
                                        conselor.photo == '' ? 'https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg' : `http://127.0.0.1:8000/` + conselor.photo
                                    }
                                    className="img-fluid conselor-image"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h3>{conselor.name}</h3>
                            <p className="text-primary">{conselor.job}</p><br />
                            {
                                conselor.is_verified == 1 ?
                                    <button className="btn btn-primary btn-small">Verified</button>
                                    :
                                    <button className="btn btn-danger btn-small" onClick={() => {
                                        swal({
                                            title: "Are you sure?",
                                            text: "You want to verify this conselor",
                                            icon: "warning",
                                            buttons: true,
                                            dangerMode: true,
                                        })
                                            .then((willDelete) => {
                                                if (willDelete) {
                                                    updateVerificationStatus(conselor.id);
                                                }
                                            }
                                            )
                                    }}>Not Verified</button>
                            }

                            <ul className="nav nav-pills mb-2 mt-4" id="pills-tab" role="tablist">
                                <li className="nav-item me-4" role="presentation">
                                    <button className="nav-link active" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#pills-about" type="button" role="tab" aria-controls="pills-about" aria-selected="true">About</button>
                                </li>
                                <li className="nav-item me-4" role="presentation">
                                    <button className="nav-link" id="pills-education-tab" data-bs-toggle="pill" data-bs-target="#pills-education" type="button" role="tab" aria-controls="pills-education" aria-selected="false">Education</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab">
                                    <div className="row">
                                        <div className="col-md">
                                            <p> <strong>Birth Date:</strong>
                                                {conselor?.birth}
                                            </p>
                                            <p><strong>Phone:</strong> {conselor?.phone}</p>
                                            <p><strong>Address:</strong> {conselor?.address}</p>
                                            <p><strong>Work Address: </strong>{conselor?.work_address}</p>
                                            <p><strong>Practice Address: </strong>{conselor?.practice_place_address}</p>
                                            <p><strong>Office Phone Number: </strong>{conselor?.office_phone_number}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-education" role="tabpanel" aria-labelledby="pills-education-tab">
                                    <div className="row">
                                        <div className="col-md">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Degree</th>
                                                        <th scope="col">Institute</th>
                                                        <th scope="col">Institute Address</th>
                                                        <th scope="col">Year</th>
                                                        <th scope="col">Major</th>
                                                        <th scope="col">Study Field</th>
                                                        <th scope="col">GPA</th>
                                                        <th scope="col">Certified</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        conselor.education?.map((edu, index) => {
                                                            return (
                                                                <tr key={edu.id}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{edu.level}</td>
                                                                    <td>{edu.institution}</td>
                                                                    <td>{edu.institution_address}</td>
                                                                    <td>{edu.graduation_year}</td>
                                                                    <td>{edu.major}</td>
                                                                    <td>{edu.study_field}</td>
                                                                    <td>{edu.gpa}</td>
                                                                    <td>{edu.file_url}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConselorProfile;