import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Header from "./partials/Header";

const AddDiary = () => {

    const [diaryType, setDiaryType] = useState("");
    const [durationRead, setDurationRead] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [cover_image, setCoverImage] = useState();

    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [diary, setDiary] = useState({});
    const [role, setRole] = useState("");

    const handleUpload = (e) => {
        setCoverImage(e.target.files[0]);
    }

    const resetFields = () => {
        setDiaryType("");
        setDurationRead("");
        setContent("");
        setTitle("");
        setCoverImage("");
    }

    const insertDiary = async (e) => {
        e.preventDefault();
        const diaryData = new FormData();
        diaryData.append("diary_type_id", diaryType);
        diaryData.append("duration_read", durationRead);
        diaryData.append("content", content);
        diaryData.append("title", title);
        diaryData.append("cover_image", cover_image);

        await fetch('http://127.0.0.1:8000/api/diary', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: diaryData
        })
            .then(res => res.json())
            .then(res => {
                if (res.meta.code === 200) {
                    swal("Success", "Diary has been added", "success").then(() => {
                        resetFields();
                        window.history.back();
                    });
                } else {
                    swal("Error", res.data, "error");
                }
            })
    };

    const editDiary = async (e) => {
        e.preventDefault();
        const diaryData = new FormData();
        diaryData.append("diary_type_id", diaryType);
        diaryData.append("duration_read", durationRead);
        diaryData.append("content", content);
        diaryData.append("title", title);
        diaryData.append("cover_image", cover_image);

        await fetch(`http://127.0.0.1:8000/api/diary/edit/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: diaryData
        })
            .then(res => res.json())
            .then(res => {
                if (res.meta.code === 200) {
                    swal("Success", "Diary has been updated", "success").then(() => {
                        resetFields();
                        window.history.back();
                    });
                } else {
                    swal("Error", res.data, "error");
                }
            })
    };

    // fetch authenticated user by token
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data.data.detailUser);
                setRole(res.data.data.user.role);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // fetch data diary by id
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/diaries?id=${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDiary(data);
                setTitle(data.title);
                setContent(data.content);
                setDurationRead(data.duration_read);
                setCoverImage(data.cover_image);
                setDiaryType(data.diary_type_id);
            });
    }, [id]);



    return (
        <div className="dashboard add-diary">
            <Header photo={
                user.photo == '' ?
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' :
                    `http://127.0.0.1:8000/${user.photo}`
            } />

            <div className="container">
                <div className="row mt-5">
                    <div className="row justify-content-between">
                        <div className="col-md-6">
                            <h2>Form Diary</h2>
                            <h5 className="text-secondary">
                                Record the precious moments in your life{" "}
                            </h5>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <form
                            encType="multipart/form-data"
                            onSubmit={
                                // check if url edit diary
                                diary.id ? editDiary : insertDiary
                            }
                        >
                            <div className="row">
                                <div className="col-md-3">
                                    <img
                                        src={
                                            cover_image == null ?
                                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' :
                                                `http://127.0.0.1:8000/${cover_image}`
                                        }
                                        className="img-fluid diary-image"
                                        alt=""
                                    />
                                </div>
                                <div className="col">
                                    <div className="row g-5">
                                        <div className="col-md">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="cover_image"
                                                name="cover_image"
                                                defaultValue={cover_image}
                                                onChange={(e) => {
                                                    handleUpload(e);
                                                }}
                                                placeholder="Url Cover Image"
                                            />
                                        </div>
                                        <div className="col-md">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                name="title"
                                                defaultValue={diary.title}
                                                placeholder="Title"
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-5 mt-0">
                                        <div className="col-md">
                                            <select
                                                name="diary-type"
                                                className="form-select"
                                                id="diary-type"
                                                onChange={(e) => {
                                                    const selected = e.target.value;
                                                    setDiaryType(selected);
                                                }}
                                            >
                                                <option value="">Diary Type</option>
                                                <option value="1">Productivity</option>
                                                <option value="2">Mental Health</option>
                                            </select>
                                        </div>
                                        <div className="col-md">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="duration_read"
                                                name="duration_read"
                                                defaultValue={diary.duration_read}
                                                placeholder="Duration Read / minute"
                                                onChange={(e) => {
                                                    setDurationRead(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-0 g-5">
                                        <div className="col">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="content"
                                                    id="content"
                                                    defaultValue={diary.content}
                                                    onChange={(e) => {
                                                        setContent(e.target.value);
                                                    }}
                                                ></textarea>
                                                <label htmlFor="content">Content</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-0 g-5 d-flex align-items-center">
                                        <div className="col">
                                            <a
                                                href="/dashboard-user"
                                                className="text-decoration-none text-secondary"
                                            >
                                                ← Back
                                            </a>
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
        </div>
    );
};

export default AddDiary;