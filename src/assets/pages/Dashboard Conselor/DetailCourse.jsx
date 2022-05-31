import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Dashboard User/partials/Header";
import swal from "sweetalert";

const DetailCourse = () => {

    const token = localStorage.getItem("token");
    const { id } = useParams(); // use for course_id
    const [detailCourses, setDetailCourses] = useState([]);

    // form field
    const [detail_course_id, setDetail_course_id] = useState("");
    const [cover_image, setCoverImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video_link, setVideoLink] = useState("");
    const [duration, setDuration] = useState("");

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/courses?id=${id}`)
            .then(res => {
                setDetailCourses(res.data);
            })
    }, []);

    // add  sub course
    const addSubCourse = async () => {
        const formData = new FormData();
        formData.append("course_id", id);
        formData.append("cover_image", cover_image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video_link", video_link);
        formData.append("duration", duration);

        await axios.post(`http://127.0.0.1:8000/api/detailcourse/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                swal("Success", "Add detail course success", "success").then(() => {
                    window.location.reload();
                    // reset form
                    setCoverImage("");
                    setTitle("");
                    setDescription("");
                    setVideoLink("");
                    setDuration("");
                })
            })
            .catch(err => {
                swal("Error", "Add detail course failed", "error");
            })
    }

    // update  sub course
    const updateSubCourse = async () => {
        const formData = new FormData();
        formData.append("course_id", id);
        formData.append("cover_image", cover_image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video_link", video_link);
        formData.append("duration", duration);

        await axios.post(`http://127.0.0.1:8000/api/updatedetailcourse/${detail_course_id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                swal("Success", "Update detail course success", "success").then(() => {
                    window.location.reload();
                    // reset form
                    setCoverImage("");
                    setTitle("");
                    setDescription("");
                    setVideoLink("");
                    setDuration("");
                })
            })
            .catch(err => {
                swal("Error", "Update detail course failed", "error");
            })
    }

    // delete  sub course
    const deleteSubCourse = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/deletedetailcourse/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                swal("Success", "Delete detail course success", "success").then(() => {
                    window.location.reload();
                })
            })
            .catch(err => {
                swal("Error", "Delete detail course failed", "error");
            })
    }
    
    // get detail sub course
    const getDetailSubCourse = async (id) => {
        await axios.get(`http://127.0.0.1:8000/api/detailsubcourse/${id}`)
            .then(res => {
                setDetail_course_id(res.data.data.id);
                setCoverImage(res.data.data.cover_image);
                setTitle(res.data.data.title);
                setDescription(res.data.data.description);
                setVideoLink(res.data.data.video_link);
                setDuration(res.data.data.duration);
            })
    }

    // if(detailCourses !== null) {
    //     console.log(detailCourses);
    // }

    return (
        <div className="dashboard">
            {/* HEADER */}
            <Header photo='https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg' />
            {/* Content */}
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-6">
                        <h2>{detailCourses?.title}</h2>
                        <h5 className="text-secondary">
                            Your Courses
                        </h5>
                    </div>
                    <div className="col-md-6 text-end">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSubCourse">Add Sub Course</button>
                    </div>
                    {/* modal */}
                    <div className="modal fade" id="addSubCourse" tabIndex="-1" aria-labelledby="addSubCourseLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="addSubCourseLabel">Add Sub Course</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Cover Image</label>
                                        <input type="file" onChange={(e) => {
                                            setCoverImage(e.target.files[0])
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Title</label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Description</label>
                                        <textarea className="form-control" onChange={(e) => {
                                            setDescription(e.target.value)
                                        }} rows="3"></textarea>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Video Link</label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setVideoLink(e.target.value)
                                        }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Duration</label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setDuration(e.target.value)
                                        }} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => {
                                        addSubCourse()
                                    }}>Add Sub Course</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detailCourses?.detail_course?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <img src={
                                                        item.cover_image == '' ?
                                                            'https://www.pngitem.com/pimgs/m/5-53986_course-icon-png-transparent-png.png' :
                                                            `http://127.0.0.1:8000/${item.cover_image}`
                                                    } width={50} height={50} alt="" />
                                                </th>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.video_link}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Menu
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#updateSubCourse" onClick={() => {
                                                                getDetailSubCourse(item.id)
                                                            }}>Edit</a></li>
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
                                                                            deleteSubCourse(item.id)
                                                                        }
                                                                    })
                                                            }}>Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* update sub course modal */}
                    {/* modal */}
                    <div className="modal fade" id="updateSubCourse" tabIndex="-1" aria-labelledby="updateSubCourseLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="updateSubCourseLabel">Update Sub Course</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Cover Image</label>
                                        <input type="file" defaultValue={cover_image} onChange={(e) => {
                                            setCoverImage(e.target.files[0])
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Title</label>
                                        <input type="text" defaultValue={title} className="form-control" onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Description</label>
                                        <textarea className="form-control" defaultValue={description} onChange={(e) => {
                                            setDescription(e.target.value)
                                        }} rows="3"></textarea>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Video Link</label>
                                        <input type="text" className="form-control" defaultValue={video_link} onChange={(e) => {
                                            setVideoLink(e.target.value)
                                        }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Duration</label>
                                        <input type="text" className="form-control" defaultValue={duration} onChange={(e) => {
                                            setDuration(e.target.value)
                                        }} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => {
                                        updateSubCourse()
                                    }}>Update Sub Course</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailCourse;