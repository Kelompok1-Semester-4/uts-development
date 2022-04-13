import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./partials/Header";

const AddDiary = () => {
    const [file, setFile] = useState("");
    const [diaryType, setDiaryType] = useState("");
    const [durationRead, setDurationRead] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [cover_image, setCoverImage] = useState("");

    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [diary, setDiary] = useState({});
    const insertDiary = async (e) => {
        e.preventDefault();
        await fetch("http://127.0.0.1:8000/api/diary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                content: content,
                duration_read: durationRead,
                cover_image: cover_image,
                diary_type_id: diaryType,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.meta.code == 200) {
                    alert("data inserted");
                    window.location.href = "/dashboard-user";
                }
            });
    };

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

    // edit diary by id
    const editDiary = async (e) => {
        e.preventDefault();
        await fetch(`http://127.0.0.1:8000/api/diary/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                content: content,
                duration_read: durationRead,
                cover_image: cover_image,
                diary_type_id: diaryType,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.meta.code == 200) {
                    alert("Edit diary success");
                    // back to dashboard user
                    window.location.href = "/dashboard-user";   
                } else {
                    alert("Edit diary failed");
                }
            });
    };



    return (
        <div className="dashboard add-diary">
            <Header />
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
                        <div
                            className="tab-pane fade show active"
                            id="pills-diary"
                            role="tabpanel"
                            aria-labelledby="pills-diary-tab"
                        >
                            <div className="row justify-content-between">
                                <div className="col-md-6">
                                    <h2>Form Diary</h2>
                                    <h5 className="text-secondary">
                                        Record the precious moments in your life{" "}
                                    </h5>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <form onSubmit={(
                                    // check if url edit diary
                                    diary.id ? editDiary : insertDiary
                                )}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img
                                                src="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/09/12/2909439885.jpg"
                                                className="img-fluid diary-image"
                                                alt=""
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row g-5">
                                                <div className="col-md">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="cover_image"
                                                        name="cover_image"
                                                        defaultValue={diary.cover_image}
                                                        onChange={(e) => {
                                                            setCoverImage(e.target.value);
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
                        <div
                            className="tab-pane fade"
                            id="pills-class"
                            role="tabpanel"
                            aria-labelledby="pills-class-tab"
                        ></div>
                        <div
                            className="tab-pane fade"
                            id="pills-transaction"
                            role="tabpanel"
                            aria-labelledby="pills-transaction-tab"
                        >
                            <h1>Transaction</h1>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <h1>profile</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <span></span>
            </div>
        </div>
    );
};

export default AddDiary;
