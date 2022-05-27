import axios from "axios";
import React, { useEffect, useState } from "react";
import QuizItem from "../../../items/QuizItem";
import Header from "../Dashboard User/partials/Header";

const DashboardAdmin = () => {
    const [conselors, setConselor] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users?role_id=2')
            .then(res => {
                setConselor(res.data);
                console.log(res.data);
            });
    }, []);

    return (
        <div>
            <div className="dashboard">
                {/* HEADER */}
                <Header photo='https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg' />
                {/* MENU */}
                <div className="container">
                    <div className="row justify-content-center menu">
                        <ul
                            className="nav nav-pills mb-3 flex-column flex-sm-row nav-justified dashboard-tab"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item me-4 flex-sm-fill" role="presentation">
                                <button
                                    className="nav-link btn active"
                                    id="pills-quiz-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-quiz"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-quiz"
                                    aria-selected="true"
                                >
                                    Quiz
                                </button>
                            </li>
                            <li className="nav-item me-4 flex-sm-fill" role="presentation">
                                <button
                                    className="nav-link btn"
                                    id="pills-conselor-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-conselor"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-conselor"
                                    aria-selected="false"
                                >
                                    Conselors
                                </button>
                            </li>

                        </ul>
                        {/* CONTENT */}
                        <div className="tab-content p-0 content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-quiz"
                                role="tabpanel"
                                aria-labelledby="pills-quiz-tab"
                            >
                                <div className="row justify-content-between">
                                    <div className="col-md-6">
                                        <h2>List Quiz</h2>
                                        <h5 className="text-secondary">
                                            Make sure your mental health{" "}
                                        </h5>
                                    </div>
                                    <div className="col-md-3 text-end">
                                        <a className="btn btn-primary" href="/add-diary">
                                            Add New
                                        </a>
                                    </div>
                                </div>
                                <div className=" d-flex justify-content-around">
                                    <QuizItem
                                        gambar="https://images.unsplash.com/photo-1581300134629-4c3a06a31948?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                        title="Make Me Happy" />
                                    <QuizItem
                                        gambar="https://images.unsplash.com/photo-1581300134629-4c3a06a31948?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                        title="Make Me Happy" />
                                    <QuizItem
                                        gambar="https://images.unsplash.com/photo-1581300134629-4c3a06a31948?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                        title="Make Me Happy" />
                                    <QuizItem
                                        gambar="https://images.unsplash.com/photo-1581300134629-4c3a06a31948?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                        title="Make Me Happy" />
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="pills-conselor"
                                role="tabpanel"
                                aria-labelledby="pills-conselor-tab"
                            >
                                <div className="row justify-content-between">
                                    <div className="col-md-6">
                                        <h2>List Conselors</h2>
                                        <h5 className="text-secondary">
                                            this is the class you offer
                                        </h5>
                                    </div>

                                </div>
                                <div className="row mt-5">
                                    {/* table */}
                                    <div className="col-md-12">
                                        <table className="table table-hover" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Work Adress</th>
                                                    <th scope="col">Is Verified</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    conselors?.map((item, index) => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{item.detail_user.name}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.detail_user.office_phone_number}</td>
                                                                <td>{item.detail_user.work_address}</td>
                                                                <td>{item.email_verified_at?.split("T")[0].split("-").reverse().join("-")}</td>
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
            </div >
        </div >
    );
};

export default DashboardAdmin;