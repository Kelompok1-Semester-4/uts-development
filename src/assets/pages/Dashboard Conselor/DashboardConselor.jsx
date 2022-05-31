import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import CoursesConselor from "../../../items/CoursesConselor";
import DiariesUser from "../../../items/DiariesUser";
import Header from "../Dashboard User/partials/Header";

const DashboardConselor = () => {

    let token = localStorage.getItem("token");
    let navigate = useNavigate();
    if (!token) { window.location.replace("/login") }
    const [user, setUser] = useState({});
    const [diaries, setDiaries] = useState([]);
    const [course, setCourse] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [detailTransaction, setDetailTransaction] = useState({});
    const [role, setRole] = useState("");

    // get detail transaction
    const getDetailTransaction = async (id) => {
        await axios.get(`http://127.0.0.1:8000/api/conselor-transaction/detail/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setDetailTransaction(res.data.data);
            console.log(detailTransaction);
        }, [])
    }

    // get transaction
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/conselor-transaction`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setTransaction(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    // fetch authenticated user by token
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUser(res.data.data.detailUser);
                setRole(res.data.data.user.role_id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // get diaries by user id
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

    // delete diary by id
    const handleDelete = (id) => {
        axios.delete('http://127.0.0.1:8000/api/diary/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(res);
            swal("Deleted!", "Your diary has been deleted.", "success").then(() => {
                window.location.reload();
            });
        }).catch((err) => {
            console.log(err);
        });
    };


    if (role == 1 || role == 3) {
        window.location.href = "/login";
        localStorage.clear();
    }

    // if(user !== null && transaction !== null) {
    //     console.log(user);
    //     console.log(transaction);
    // }


    return (
        <div className="dashboard">
            {/* HEADER */}
            <Header photo='https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg' />
            {/* MENU */}
            <div className="container">
                <div className="row justify-content-center menu">
                    {/* MENU */}
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
                                    <a className="btn btn-primary" href="/add-diary-conselor">
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
                                                            navigate('/edit-diary-conselor/' + diary.id)
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
                                {/* <div className="col-md-3 text-end">
                                    <a className="btn btn-primary" href="/add-course">
                                        Add New
                                    </a>
                                </div> */}
                            </div>
                            {/* <div className="row justify-content-between mt-5 d-flex align-items-center mb-5">
                                <div className="col-md-8">
                                    <p>
                                        Shows Entries
                                    </p>
                                </div>
                                <label htmlFor="Search" className="col-sm-1 col-form-label text-end ">Search</label>
                                <div className="col-md-3 text-end">
                                    <input className="form-control form-control-sm" type="text" id="Search" placeholder="" aria-label="default input example" />
                                </div>
                            </div> */}
                            <div className="table-responsive-md mb-5 mt-5">
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Transaction Date</th>
                                            <td scope="col">Course Title</td>
                                            <td scope="col" className="text-center">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            transaction?.map((trans, index) => {
                                                return (
                                                    <tr key={trans.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{trans.user.detail_user.name}</td>
                                                        <td>{trans.created_at.split("T")[0].split("-").reverse().join("-")}</td>
                                                        <td>{trans.course.title}</td>
                                                        <td className="text-center">
                                                            <div className="dropdown">
                                                                <button className="btn btn-primary btn-small dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    Menu
                                                                </button>
                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#detailTransaction" onClick={() => {
                                                                        getDetailTransaction(trans.id);
                                                                    }}>Detail</a></li>
                                                                    <li><a className="dropdown-item" href="#">Delete</a></li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="modal fade" id="detailTransaction" tabIndex="-1" aria-labelledby="detailTransactionLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title" id="detailTransactionLabel">Detail Transaction</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                ...
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
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
};

export default DashboardConselor;