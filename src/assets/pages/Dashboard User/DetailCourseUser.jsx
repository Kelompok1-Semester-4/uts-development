import React, { useEffect, useState } from "react";
import icon_play from "../../../assets/images/icon_play.svg";
import { Navigate, useParams } from "react-router-dom";
import Header from "./partials/Header";
import axios from "axios";

const DetailCourseUser = () => {

    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [course, setCourse] = useState({});
    const [detail_course_id, setDetailCourseId] = useState(0);
   
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/courses?id=${id}`)
            .then(res => {
                console.log(res.data);
                setCourse(res.data);
            });
    }, []);

    console.log(course);

    return (
        <div className="dashboard">
            <Header />
            <div className="container mt-5">
                <div className="row justify-content-center my-auto">
                    <div className="col-md-6">
                        {
                            course.detail_course?.map((item, index) => {
                                if (index == detail_course_id) {
                                    return (
                                        <>
                                            <iframe key={id} width={642} height={361} src={`https://www.youtube.com/embed/${item.video_link}`} title="YouTube video player" frame="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            <h4 className="mt-3">{item.title}</h4>
                                        </>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="col-md-3">
                        <h4 className="mb-4">Playlist</h4>
                        <div style={
                            {
                                height: "450px",
                                overflow: "auto"
                            }
                        }>
                            {
                                course.detail_course?.map((item, index) => {
                                    return (
                                        <div className="card mb-3 w-70" key={index}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-2 my-auto">
                                                        <img src={icon_play} alt="icon_play" onClick={() => {
                                                            setDetailCourseId(index);
                                                        }} style={
                                                            {
                                                                cursor: "pointer"
                                                            }
                                                        } />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h5 className="card-title"><b>{index + 1}</b></h5>
                                                        <p className="card-text text-truncate">{item.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailCourseUser;    