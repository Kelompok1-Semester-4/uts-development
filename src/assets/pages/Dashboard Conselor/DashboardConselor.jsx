import React from "react";
import CoursesConselor from "../../../items/CoursesConselor";
import DiariesUser from "../../../items/DiariesUser";
import Header from "../Dashboard User/partials/Header";

const DashboardConselor = () => {
    return (
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
                                id="pills-diary-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-diary"
                                type="button"
                                role="tab"
                                aria-controls="pills-diary"
                                aria-selected="true"
                            >
                                Diaries
                            </button>
                        </li>
                        <li className="nav-item me-4 flex-sm-fill" role="presentation">
                            <button
                                className="nav-link btn"
                                id="pills-course-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-course"
                                type="button"
                                role="tab"
                                aria-controls="pills-course"
                                aria-selected="false"
                            >
                                Your Course
                            </button>
                        </li>
                        <li className="nav-item me-4 flex-sm-fill" role="presentation">
                            <button
                                className="nav-link btn"
                                id="pills-transaction-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-transaction"
                                type="button"
                                role="tab"
                                aria-controls="pills-transaction"
                                aria-selected="false"
                            >
                                Transaction
                            </button>
                        </li>
                        <li className="nav-item flex-sm-fill" role="presentation">
                            <button
                                className="nav-link btn"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                            >
                                Profile
                            </button>
                        </li>
                    </ul>
                    {/* CONTENT */}
                    <div className="tab-content p-0 content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-diary"
                            role="tabpanel"
                            aria-labelledby="pills-diary-tab"
                        >
                            <div className="row justify-content-between">
                                <div className="col-md-6">
                                    <h2>List Diary</h2>
                                    <h5 className="text-secondary">
                                        Record the precious moments in your life{" "}
                                    </h5>
                                </div>
                                <div className="col-md-3 text-end">
                                    <a className="btn btn-primary" href="/add-diary">
                                        Add New
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around">
                                <DiariesUser
                                    gambar="https://images.unsplash.com/photo-1581300134629-4c3a06a31948?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    title="Make Me Happy" />
                                <DiariesUser
                                    gambar="https://images.unsplash.com/photo-1581300134629-4c3a06a31948?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    title="Make Me Happy" />
                                <DiariesUser
                                    gambar="https://images.unsplash.com/photo-1581300134629-4c3a06a31948?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    title="Make Me Happy" />
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-course"
                            role="tabpanel"
                            aria-labelledby="pills-course-tab"
                        >
                            <div className="row justify-content-between">
                                <div className="col-md-6">
                                    <h2>List Courses</h2>
                                    <h5 className="text-secondary">
                                        this is the class you offer
                                    </h5>
                                </div>
                                <div className="col-md-3 text-end">
                                    <a className="btn btn-primary" href="/add-course">
                                        Add New
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around">
                                <CoursesConselor
                                    title="Be Happy"
                                    gambar="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGFwcHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                                    price="20.000" />
                                <CoursesConselor
                                    title="Be Happy"
                                    gambar="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGFwcHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                                    price="20.000" />
                                <CoursesConselor
                                    title="Be Happy"
                                    gambar="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGFwcHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                                    price="20.000" />
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-transaction"
                            role="tabpanel"
                            aria-labelledby="pills-transaction-tab"
                        >
                            <div className="row justify-content-between">
                                <div className="col-md-6">
                                    <h2>Transaction</h2>
                                    <h5 className="text-secondary">
                                        this is the transaction you made
                                    </h5>
                                </div>
                                <div className="col-md-3 text-end">
                                    <a className="btn btn-primary" href="/add-course">
                                        Add New
                                    </a>
                                </div>
                            </div>
                            <div className="row justify-content-between mt-5 d-flex align-items-center mb-5">
                                <div className="col-md-8">
                                    <p>
                                        Shows Entries
                                    </p>
                                </div>
                                <label for="Search" class="col-sm-1 col-form-label text-end ">Serach</label>
                                <div className="col-md-3 text-end">
                                    <input class="form-control form-control-sm" type="text" id="Search" placeholder="" aria-label="default input example" />
                                </div>
                            </div>
                            <div class="table-responsive-md mb-5">
                                <table class="table ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Durasi</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="col" className="text-secondary">Kenali Dirimu</td>
                                            <td>September 9, 2013</td>
                                            <td>2:00</td>
                                            <td>
                                                <a className="text-warning text-decoration-none">Edit </a>
                                                <a className="text-danger text-decoration-none">Delete </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-secondary">Bikin Schedule</td>
                                            <td>August 2, 2013</td>
                                            <td>6:30</td>
                                            <td> <a className="text-warning text-decoration-none">Edit </a>
                                                <a className="text-danger text-decoration-none">Delete </a></td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="text-secondary">Kenali Dirimu</td>
                                            <td>September 9, 2013</td>
                                            <td>2:00</td>
                                            <td>
                                                <a className="text-warning text-decoration-none">Edit </a>
                                                <a className="text-danger text-decoration-none">Delete </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="text-secondary">Kenali Dirimu</td>
                                            <td>September 9, 2013</td>
                                            <td>2:00</td>
                                            <td>
                                                <a className="text-warning text-decoration-none">Edit </a>
                                                <a className="text-danger text-decoration-none">Delete </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="text-secondary">Kenali Dirimu</td>
                                            <td>September 9, 2013</td>
                                            <td>2:00</td>
                                            <td>
                                                <a className="text-warning text-decoration-none">Edit </a>
                                                <a className="text-danger text-decoration-none">Delete </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardConselor;