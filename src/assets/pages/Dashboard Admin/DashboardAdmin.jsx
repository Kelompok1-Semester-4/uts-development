import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "../Dashboard User/partials/Header";

const DashboardAdmin = () => {

    const navigate = useNavigate();

    const [conselors, setConselor] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [quizzes, setQuizzes] = useState([]);

    // form quiz field
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [quiz_id, setQuizId] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users?role_id=2')
            .then(res => {
                setConselor(res.data);
                console.log(res.data);
            });
    }, []);

    const deleteConselor = (id) => {
        try {
            axios.delete(`http://127.0.0.1:8000/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    swal("Deleted!", "Your file has been deleted.", "success");
                    window.location.reload();
                })
        } catch (error) {
            swal("Oops!", "Something went wrong!", "error");
        }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/quizzes')
            .then(res => {
                setQuizzes(res.data.data);
            });
    }, []);

    const resetField = () => {
        setTitle("");
        setPhoto("");
        setDescription("");
        setQuizId("");
    }

    const getQuiz = (id) => {
        axios.get(`http://127.0.0.1:8000/api/detail-quiz/${id}`)
            .then(res => {
                setTitle(res.data.data.title);
                setPhoto(res.data.data.photo);
                setDescription(res.data.data.description);
                setQuizId(res.data.data.id);
            });
    }

    // add quiz
    const addQuiz = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("photo", photo);
        formData.append("description", description);
        try {
            await axios.post(`http://127.0.0.1:8000/api/quiz/store`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            swal("Success!", "Your file has been added.", "success").then(() => {
                window.location.reload();
            });
        } catch (error) {
            swal("Oops!", "Something went wrong!", "error");
        }
    }

    // update quiz
    const updateQuiz = async (id) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("photo", photo);
        formData.append("description", description);
        try {
            await axios.post(`http://127.0.0.1:8000/api/quiz/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            swal("Success!", "Your file has been updated.", "success").then(() => {
                window.location.reload();
                resetField();
            });
        } catch (error) {
            swal("Oops!", "Something went wrong!", "error");
        }
    }

    // delete quiz
    const deleteQuiz = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/quiz/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            swal("Deleted!", "Your file has been deleted.", "success").then(() => {
                window.location.reload();
            });
        } catch (error) {
            swal("Oops!", "Something went wrong!", "error");
        }
    }

    return (
        <div>
            <div className="dashboard">
                {/* HEADER */}
                <Header photo='https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg' />
                {/* MENU */}
                <div className="container">
                    <div className="row justify-content-center menu">
                        <ul className="nav nav-pills mb-3 flex-column col-md-6 flex-sm-row nav-justified dashboard-tab" id="pills-tab" role="tablist">
                            <li className="nav-item me-4 flex-sm-fill" role="presentation">

                                <button className="nav-link btn active"
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
                                        <a className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addQuiz">Add New</a>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start">
                                    {
                                        quizzes.map((quiz) => {
                                            return (
                                                <div className=" col-md-2 col-sm-4 mt-4 me-5" key={quiz.id}>
                                                    <div div className="card custom-card-course" >
                                                        <img src={`http://127.0.0.1:8000/` + quiz.photo} className="card-img-top quiz-image" alt="..." />
                                                        <div className="card-body conseling-body mt-3">
                                                            <div className="row d-flex justify-item-center m-2">
                                                                <div className="col-md d-flex justify-content-center">
                                                                    <h5 className="card-title conselor-name giveMeEllipsis">{quiz.title}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-item-center mb-4 ">
                                                                <div className="col-md d-flex justify-content-center">
                                                                    <h6 className="text-secondary">{
                                                                        quiz.created_at.split("T")[0].split("-").reverse().join("-")
                                                                    }</h6>
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex align-items-center ps-2 mb-2">
                                                                <div className="col-md d-flex justify-content-center">
                                                                    {/* <button className="btn btn-primary btn-small">Detail Quiz</button> */}
                                                                    <div className="btn-group">
                                                                        <button type="button" className="btn btn-small btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Menu
                                                                        </button>
                                                                        <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="" onClick={() => {
                                                                                navigate('/admin-quizzes/' + quiz.id);
                                                                            }}>Detail</a></li>
                                                                            <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#updateQuiz" onClick={() => {
                                                                                getQuiz(quiz.id);
                                                                            }}>Update</a></li>
                                                                            <li><a className="dropdown-item" href="#" onClick={() => {
                                                                                swal({
                                                                                    title: "Are you sure?",
                                                                                    text: "Once deleted, you will not be able to recover this imaginary file!",
                                                                                    icon: "warning",
                                                                                    buttons: true,
                                                                                    dangerMode: true,
                                                                                })
                                                                                    .then((willDelete) => {
                                                                                        if (willDelete) {
                                                                                            deleteQuiz(quiz.id);
                                                                                        }
                                                                                    });
                                                                            }}>Delete</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="modal fade" id="updateQuiz" tabIndex="-1" aria-labelledby="updateQuizLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="updateQuizLabel">Update Quiz</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="form-group mb-3">
                                                                        <label htmlFor="title">Title</label>
                                                                        <input type="text" className="form-control" id="title" placeholder="Title" defaultValue={title} onChange={(e) => {
                                                                            setTitle(e.target.value);
                                                                        }} />
                                                                    </div>
                                                                    <div className="form-group mb-3">
                                                                        <label htmlFor="photo">Photo</label>
                                                                        <input type="file" className="form-control" defaultValue={photo} onChange={(e) => {
                                                                            setPhoto(e.target.files[0]);
                                                                        }} />
                                                                    </div>
                                                                    <div className="form-group mb-3">
                                                                        <label htmlFor="description">Description</label>
                                                                        <textarea className="form-control" id="description" placeholder="Description" defaultValue={description} onChange={(e) => {
                                                                            setDescription(e.target.value);
                                                                        }}></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="button" className="btn btn-primary" onClick={() => {
                                                                        updateQuiz(quiz_id);
                                                                    }}>Save changes</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>

                                {/* Modal Add Quiz */}
                                <div className="modal fade" id="addQuiz" tabIndex="-1" aria-labelledby="addQuizLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="addQuizLabel">Add New Quiz</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="title" className="form-label">Title</label>
                                                    <input type="email" className="form-control" id="title" onChange={(e) => {
                                                        setTitle(e.target.value);
                                                    }} placeholder="Quiz xxx" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="photo" className="form-label">Photo</label>
                                                    <input type="file" className="form-control" onChange={(e) => {
                                                        setPhoto(e.target.files[0]);
                                                    }} id="photo" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="description" className="form-label">Description</label>
                                                    <textarea className="form-control" id="description" rows="3" onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }}></textarea>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={addQuiz}>Add New</button>
                                            </div>
                                        </div>
                                    </div>
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
                                                    <th scope="col">Action</th>
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
                                                                <td>
                                                                    {
                                                                        item.detail_user.is_verified == 1 ?
                                                                            <span className="text-success">Verified</span>
                                                                            :
                                                                            <span className="text-danger">Not Verified</span>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <a href="" className="text-primary">Info</a> &nbsp;
                                                                    {/* link confirmation delete */}
                                                                    <a className="text-danger" onClick={() => {
                                                                        swal({
                                                                            title: "Are you sure?",
                                                                            text: "Once deleted, you will not be able to recover this imaginary file!",
                                                                            icon: "warning",
                                                                            buttons: true,
                                                                            dangerMode: true,
                                                                        })
                                                                            .then((willDelete) => {
                                                                                if (willDelete) {
                                                                                    swal("Poof! Your imaginary file has been deleted!", {
                                                                                        icon: "success",
                                                                                    });
                                                                                    deleteConselor(item.id)
                                                                                } else {
                                                                                    swal("Your imaginary file is safe!");
                                                                                }
                                                                            }
                                                                            );
                                                                    }}>Delete</a>
                                                                </td>
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