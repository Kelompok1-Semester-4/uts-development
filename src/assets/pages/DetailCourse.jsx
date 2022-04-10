import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";

import icon_play from "../../assets/images/icon_play.svg";
import icon_check from "../../assets/images/icon_check.svg";

import CurrencyFormat from "react-currency-format";


const DetailCourse = () => {

    let navigate = useNavigate();

    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/courses?id=${id}`)
            .then(res => {
                console.log(res.data);
                setCourse(res.data);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className="container detail-course">
                {/* created at */}
                <p className="text-primary tags">Productivity • <span className="text-secondary">
                    {
                        // date format
                        course.created_at?.split("T")[0].split("-").reverse().join("-")
                    }
                </span></p>
                <h1 className="title">{course.title}</h1>

                {/* IMAGE | about */}
                <div className="row">
                    {/* TRACK */}
                    <div className="col-md-6">
                        {/* <img src={course.thumbnail} className="thumbnail" alt="" /> */}
                        {
                            course.detail_course?.map((item, index) => {
                                if (index == 0) {
                                    return <iframe key={item.id} width={620} height={315} src={"https://www.youtube.com/embed/" + item.video_link} title="YouTube video player" frame="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                }
                            })
                        }

                        {/* TRACK */}

                        <h4 className="mt-4">Track</h4>
                        <div className="row mt-3 justify-content-between">
                            {
                                course.detail_course?.map((course_item, index) => {
                                    if (index > 3) {
                                        return (
                                            <div className="col-md-12 col-lg-6 col-sm-6 track-item p-2 opacity-50" key={course_item.id} >
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-3 me-2">
                                                        <img src={icon_play} className="ms-2" alt="" />
                                                    </div>
                                                    <div className="col">
                                                        <p className="d-flex my-auto">{index + 1}</p>
                                                        <span className="giveMeEllipsis">{course_item.title}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="col-md-12 col-lg-6 col-sm-6 track-item p-2" key={course_item.id} >
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-3 me-2">
                                                        <img src={icon_play} className="ms-2" alt="" />
                                                    </div>
                                                    <div className="col">
                                                        <p className="d-flex my-auto">{index + 1}</p>
                                                        <span className="giveMeEllipsis">{course_item.title}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })
                            }
                        </div>

                        {/* BENEFIT & PRICE */}
                        <div className="row bp">
                            <h4>Benefit & Price</h4>
                            <p className="desc text-secondary">By buying this you will enjoy the following benefits</p>

                            <div className="col-md-8 mt-2">
                                <div className="row mx-0">
                                    {
                                        course.benefit?.split(',').map((item, index) => {
                                            return (
                                                <div className="col-md-6 mb-2" key={item}>
                                                    <div className="row d-flex align-items-center">
                                                        <img src={icon_check} className="icon_check align-self-center" alt="" />
                                                        <h5 className="benefit-item my-auto giveMeEllipsis">{
                                                            item
                                                        }</h5>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                            <div className="row mt-4 d-flex align-items-end">
                                <div className="col-md-4">
                                    <h3 className="price d-flex my-auto">
                                        <CurrencyFormat value={course.price} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                                    </h3>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-primary btn-small" onClick={() => {
                                        navigate("/checkout/" + course.id);
                                    }}>Enroll Now</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* ABOUT */}
                    <div className="col-md-6 about">
                        <h4 className="mb-2">About This Course</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dignissimos voluptatibus saepe velit nobis nemo! Velit inventore animi esse odio fugiat quas vero! Aperiam, rerum nemo. Quo provident nihil incidunt soluta, voluptate repellendus temporibus quaerat id odit voluptates, dolore eaque!
                        </p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut exercitationem, tempore dolorem saepe provident, aut sunt laudantium ullam dignissimos accusantium eaque consequatur? Necessitatibus voluptas voluptatem placeat quis dolor eaque ducimus.</p>

                        <h4 className="mb-2">Experts</h4>
                        <div className="row expert mt-3">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={course.detail_user?.photo} className="conselor-img img-fluid" alt="" />
                                    </div>
                                    <div className="col-md-8 profile d-block mt-2">
                                        <h6>Alisiana Route</h6>
                                        <p>{course.detail_user?.job} • {course.detail_user?.address}</p>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <p className="about-me">Saya merupakan seorang {course.detail_user?.job}. Tempat kerja saya berada di {course.detail_user?.work_address}. <br /><br /> Berikut adalah nomor yang bisa anda hubungi : {course.detail_user?.office_phone_number}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Faq />
            <Footer />
        </div>
    );
}

export default DetailCourse;