import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "./partials/Header";

const DashboardUser = () => {

    const [user, setUser] = useState({});
    const [diaries, setDiaries] = useState([]);
    const [course, setCourse] = useState([]);
    const [role, setRole] = useState("");
    const [credential, setCredential] = useState({});

    const token = localStorage.getItem("token");
    if (!token) { window.location.replace("/login") }

    let navigate = useNavigate();
    // fetch authenticated user by token
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUser(res.data.data.detailUser);
                setCredential(res.data.data.user);
                setRole(res.data.data.user.role_id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // fetch diaries by user id
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/diaries-user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setDiaries(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/transaction`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setCourse(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (role == 2 || role == 3) {
        window.location.href = "/login";
        localStorage.clear();
    }
    // console.log(user.id);
    // console.log(diaries);
    // console.log(course);

    // delete diary
    const handleDelete = (id) => {
        axios.delete('http://127.0.0.1:8000/api/diary/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(res);
            swal("Deleted!", "Your diary has been deleted.", "success");
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="dashboard">
            {/* HEADER */}
            <Header photo={(user.photo == '' ? 'https://www.jobstreet.co.id/en/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png' : 'http://127.0.0.1:8000/' + user.photo)} />

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
                                id="pills-class-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-class"
                                type="button"
                                role="tab"
                                aria-controls="pills-class"
                                aria-selected="false"
                            >
                                Your Class
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
                        {/* list diary */}
                        <div
                            className="tab-pane fade show active"
                            id="pills-diary"
                            role="tabpanel"
                            aria-labelledby="pills-diary-tab">
                            <div className="row justify-content-between">
                                <div className="col-md-6">
                                    <h2>List Diary</h2>
                                    <h5 className="text-secondary">/
                                        Record the precious moments in your life{" "}
                                    </h5>
                                </div>
                                <div className="col-md-3 text-end">
                                    <a className="btn btn-primary" href="/add-diary">
                                        Add New
                                    </a>
                                </div>
                            </div>

                            <div className="row  mt-5 justify-content-between">
                                {diaries?.map((diary) => {
                                    return (
                                        <div className="col-md-4 diary-item" key={diary.id}>
                                            <div className="row">
                                                <div className="col-md">
                                                    <img
                                                        src={'http://127.0.0.1:8000/' + diary.cover_image}
                                                        className="img-fluid diary-image"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <h4 className="diary-title">{diary.title}</h4>
                                                    <h4 className="diary-date">{diary.created_at}</h4>
                                                    <p className="giveMeEllipsis">{diary.content}</p>

                                                    <div className="row d-inline ms-0">
                                                        <button className="btn btn-edit btn-warning" onClick={() => {
                                                            navigate('/edit-diary/' + diary.id)
                                                        }}>
                                                            Edit
                                                        </button>
                                                        <a href="" className="ms-4 text-decoration-none text-secondary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                            Delete
                                                        </a>

                                                        {/* Modal */}
                                                        <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModal" aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="deleteModalLabel">Konfirmasi</h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        Are you sure you delete this data?
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" onClick={() => {
                                                                            handleDelete(diary.id)
                                                                        }} className="btn btn-primary btn-sm">Delete</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* list class */}
                        <div
                            className="tab-pane fade"
                            id="pills-class"
                            role="tabpanel"
                            aria-labelledby="pills-class-tab"
                        >
                            <div className="row">
                                <div className="col-md-6">
                                    <h2>Your Class</h2>
                                    <h5 className="text-secondary">
                                        This is all yout class that you have after finish the
                                        transaction
                                    </h5>
                                </div>
                            </div>
                            <div className="row mt-5 courses">
                                {course?.map((course) => {
                                    return (
                                        <div className="col-md-3 mx-4 class-item">
                                            <img
                                                src={course['detail_transaction']['course']['thumbnail']}
                                                className="img-fluid square"
                                                alt=""
                                            />

                                            <div className="row">
                                                <h4 className="class-title">{course['detail_transaction']['course']['title']}</h4>
                                                <p className="giveMeEllipsis col-md-8"> Enroll Date:
                                                    {
                                                        course['detail_transaction']['created_at']?.split("T")[0].split("-").reverse().join("-")
                                                    }
                                                </p>

                                                <div className="col">
                                                    <button className="btn btn-primary btn-sm mt-2 mb-2">
                                                        Learn
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* list transaction */}
                        <div
                            className="tab-pane fade"
                            id="pills-transaction"
                            role="tabpanel"
                            aria-labelledby="pills-transaction-tab"
                        >
                            <div className="row">
                                <div className="col-md-6">
                                    <h2>Transactions</h2>
                                    <h5 className="text-secondary">
                                        This is all your transaction record
                                    </h5>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <p>List of transaction</p>
                            </div>
                        </div>
                        {/* profile */}
                        <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <div className="row justify-content-between">
                                <div className="col-md-6">
                                    <h2>Edit Profile</h2>
                                    <h5 className="text-secondary">
                                        Edit Your Profile{" "}
                                    </h5>
                                </div>
                            </div>


                            <div className="row mt-5">
                                <form>
                                    <div className="row">
                                        <div className="col-md-3">
                                            {
                                                (user?.photo) ? (
                                                    <img
                                                        src={'http://127.0.0.1:8000/' + user.photo}
                                                        width="175" height="175" className="rounded-circle"
                                                        alt=""
                                                    />
                                                ) : (
                                                        <img
                                                            src={'https://www.jobstreet.co.id/en/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}
                                                            width="175" height="175" className="rounded-circle"
                                                            alt=""
                                                        />
                                                )
                                            }
                                        </div>
                                        <div className="col">
                                            <div className="row g-5">
                                                <div className="col-md">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id="cover_image"
                                                        name="cover_image"
                                                        defaultValue={user?.cover_image}
                                                        placeholder="Drop Your File Profile Image"
                                                    />
                                                </div>
                                                <div className="col-md">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        name="email"
                                                        defaultValue={credential?.email}
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>

                                            <div className="row g-5 mt-0">
                                                <div className="col-md">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fullname"
                                                        name="fullname"
                                                        placeholder="Fullname"
                                                        defaultValue={user?.name}
                                                    />
                                                </div>
                                                <div className="col-md">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        defaultValue={credential?.password}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row g-5 mt-0">
                                                <div className="col-md">
                                                    <select
                                                        name="gender"
                                                        className="form-select"
                                                        id="gender">
                                                        {
                                                            ["L", "P"].map((item, index) => {
                                                                return (
                                                                    (item === user?.gender) ?
                                                                        <option key={index} value={item} selected>{item}</option>
                                                                        :
                                                                        <option key={index} value={item}>{item}</option> 
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-md">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="job"
                                                        name="job"
                                                        placeholder="Job"
                                                        defaultValue={user?.job}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row g-5 mt-0">
                                                <div className="col-md">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="birth"
                                                        name="birth"
                                                        placeholder="Birth"
                                                        defaultValue={user?.birth}
                                                    />
                                                </div>
                                                <div className="col-md">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        name="phone"
                                                        placeholder="Phone Number"
                                                        defaultValue={user?.phone}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row g-5 mt-0">
                                                <div className="col-md">
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Address"
                                                        name="address"
                                                        defaultValue={user?.address}
                                                        id="address"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="row mt-0 g-5 d-flex align-items-center">
                                                <div className="col">
                                                </div>
                                                <div className="col text-end">
                                                    <button className="btn btn-primary" type="submit">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 row">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardUser;
