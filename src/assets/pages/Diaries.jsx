import React, { Component, useEffect } from "react";

import Header from "../../components/Header";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import DiaryItems from "../../items/DiaryItems";

import axios from "axios";
import { useState } from "react";

const Diaries = (props) => {

    // get all date diary type
    const [diaryTypes, setDiaryType] = useState([]);
    const [diaries, setDiaries] = React.useState([]);
    const [searchTerm, setSearch] = useState("");
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/diary-types')
            .then(res => {
                setDiaryType(res.data);
                console.log(res.data);
            });
    }, [diaries]);

    // get all data from diaries api
    // get search data
    // get id
    const [id, setId] = useState("");
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/diaries?diary_type_id=${id}`)
            .then(res => {
                console.log(res.data);
                setDiaries(res.data);
            });
    }, [id]);

    return (
        <div>
            <Header />
            <div className="container diaries">
                <div className="row diary-header justify-content-center">
                    <h1>Browse Your Favorite Diary</h1>
                    <p className="text-center">The best diaries are made by users for other users to enjoy</p>

                    <form className="col-md-6 mt-3">
                        <input type="text" placeholder="Search by title or author" className="form-control" onChange={(event) => {
                            setSearch(event.target.value);
                        }} />
                    </form>
                </div>

                <center>
                    <ul className="nav nav-pills mb-5 flex-column flex-sm-row" id="pills-tab" role="tablist">
                        {
                            diaryTypes.map((diaryType, index) => {
                                return (
                                    <li className="nav-item flex-sm-fill" role="presentation" key={diaryType.id}>
                                        <button className="nav-link btn" id={diaryType.id} data-bs-toggle="pill" data-bs-target="#pills-tips" type="button" role="tab" aria-controls="pills-tips" onClick={(e) => setId(e.target.id)}>{diaryType.name}</button>
                                    </li>
                                );
                            })
                        }
                        <li className="nav-item flex-sm-fill" role="presentation">
                            <button className="nav-link btn" id="pills-tips-tab" data-bs-toggle="pill" data-bs-target="#pills-tips" type="button" role="tab" aria-controls="pills-tips" aria-selected="false" onClick={(e) => setId(0)}>All</button>
                        </li>
                    </ul>
                </center>

                <div className="row list-diary">
                    <h1>List Of Diary</h1>

                    <div className="row diary-items">
                        {
                            diaries?.filter((val) => {
                                if(searchTerm == "") {
                                    return val;
                                } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val;
                                }
                            }).map((diary) => {
                                if (diaries.length > 0) {
                                    return (
                                        <DiaryItems
                                            key={diary.id}
                                            id={diary.id}
                                            title={diary.title}
                                            gambar={"http://127.0.0.1:8000/" + diary.cover_image}
                                            nama={diary.detail_user?.name}
                                        />
                                    )
                                } else if(diary == null) {
                                    return (
                                        <div className="col-md-12">
                                            <div className="alert alert-danger" role="alert">
                                                <h4 className="alert-heading">Oops!</h4>
                                                <p>No diary found</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <Faq />
            <Footer />
        </div>
    )
}

export default Diaries;