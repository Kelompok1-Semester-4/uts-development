import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icon_check from "../../assets/images/icon_check.svg";
import IconPlay from "../../assets/icon/light/Play.svg";
import IconUser from "../../assets/icon/light/User.svg";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CurrencyFormat from "react-currency-format";

const DetailConseling = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [courses, setCourses] = useState([]);
    const [diaries, setDiaries] = useState([]);

    const getUser = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/users/detail/${id}`);
        const data = await response.json();
        setUser(data.data);
    }

    const getAllDetailConselor = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/all-detail-conselor/${id}`);
        const data = await response.json();
        setCourses(data.data.courses);
        setDiaries(data.data.diaries);
    }

    useEffect(() => {
        getUser();
        getAllDetailConselor();
    }, [id])

    if (courses !== null) {
        console.log(courses);
    }

    return (
        <div>
            <Header />
            <div className="counseling container diaries">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-4">
                                <img src={
                                    user.detail_user?.photo == '' ?
                                        'https://via.placeholder.com/150' :
                                        `http://127.0.0.1:8000/${user.detail_user?.photo}`
                                } className="rounded-circle" width={200} height={200} />
                            </div>
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5 className="text-muted">Courses</h5>
                                        <h1>{ courses.length }</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5 className="text-muted">Price</h5>
                                        <h1>{
                                            <CurrencyFormat value={user.detail_user?.price} displayType={'text'} thousandSeparator={true} prefix={''} />
                                        }</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md ms-5">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5 className="text-muted">Diaries</h5>
                                        <h1>{ diaries.length }</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col">
                                    <div className="row">
                                        <div className="col col-md-6">
                                            <h1>{user.detail_user?.name}</h1>
                                            <p className="mb-4"><b>Contact Person:</b> {user.detail_user?.phone}</p>
                                        </div>
                                        <div className="col text-end col-md-4">
                                            <button className="btn-dark btn" onClick={() => {
                                                /* 
                                                redirect to whatsapp chat with default message
                                                Good evening, I am interested in joining the counseling program that you offer. Guess how I can follow it?    
                                                */
                                                window.open(`https://api.whatsapp.com/send?phone=${user.detail_user?.phone}&text=Good%20evening%2C%20I%20am%20interested%20in%20joining%20the%20counseling%20program%20that%20you%20offer.%20Guess%20how%20I%20can%20follow%20it%3F`)
                                            }}>Book Now</button>
                                        </div>
                                    </div>
                                    <div className="row px-2 mt-3">
                                        {
                                            user.detail_user?.benefits?.split(',').map((benefit, index) => {
                                                return (
                                                    <div className="col-md-4 mb-2" key={benefit}>
                                                        <div className="row d-flex align-items-center">
                                                            <img src={icon_check} className="icon_check align-self-center" alt="" />
                                                            <h6 className="my-auto giveMeEllipsis">{
                                                                benefit
                                                            }</h6>
                                                        </div>
                                                    </div>
                                                );  // return
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row justify-content-center diary-header mt-5">
                    <div className="col-md-4">
                        <ul className="nav nav-pills mb-5 flex-column flex-sm-row" id="pills-tab" role="tablist">
                            <li className="nav-item flex-sm-fill" role="presentation">
                                <button className="nav-link btn active" data-bs-toggle="pill" data-bs-target="#pills-courses" type="button" role="tab" aria-controls="pills-courses">
                                    Courses
                                </button>
                            </li>
                            <li className="nav-item flex-sm-fill" role="presentation">
                                <button className="nav-link btn" data-bs-toggle="pill" data-bs-target="#pills-diaries" type="button" role="tab" aria-controls="pills-diaries">
                                    Diaries
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-courses" role="tabpanel" aria-labelledby="pills-courses-tab">
                                {
                                    courses.map((course, index) => {
                                        return (
                                            <div className="col-md-4 col-sm-6">
                                                <div className="card custom-card-course">
                                                    <img
                                                        src={
                                                            course.thumbnail == '' ?
                                                                'https://via.placeholder.com/150' :
                                                                'http://127.0.0.1:8000/' + course.thumbnail
                                                        }
                                                        className="card-img-top course-image"
                                                        alt="..."
                                                    />
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md">
                                                                <h5 className="card-title">{course.title}</h5>
                                                            </div>
                                                            <div className="col-md-4 text-end">
                                                                <img
                                                                    src={
                                                                        course.detail_user?.photo == '' ?
                                                                            'https://via.placeholder.com/150' :
                                                                            'http://127.0.0.1:8000/' + course.detail_user?.photo
                                                                    }
                                                                    className="rounded-circle circle-image"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                        <p className="card-text giveMeEllipsis col-md-8">
                                                            {course.description}
                                                        </p>
                                                        <div className="row d-flex align-items-center mb-2">
                                                            <div className="col-md-7">
                                                                <img
                                                                    src={IconPlay}
                                                                    className="card-icon align-self-center"
                                                                    width={21}
                                                                    alt=""
                                                                />
                                                                <h4 className="mount d-inline ms-2">{course.detail_course.length} Videos</h4>
                                                            </div>
                                                            <div className="col-md d-flex justify-content-end">
                                                                <button onClick={() => {
                                                                    window.location.href = `/courses/${course.id}`;
                                                                }} className="btn btn-primary btn-small mt-4">
                                                                    Learn Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div class="tab-pane fade" id="pills-diaries" role="tabpanel" aria-labelledby="pills-diaries-tab">
                                {
                                    diaries.map((diary, index) => {
                                        return (
                                            <div className="col-md-3 col-sm-6 my-3">
                                                <img src={
                                                    diary.cover_image == '' ?
                                                        'https://via.placeholder.com/150' :
                                                        'http://127.0.0.1:8000/' + diary.cover_image
                                                } className="diary-item" alt="" />

                                                <h3 className="diary-title">{diary.title}</h3>
                                                <p className="diary-body giveMeEllipsis">These findings suggest certain types of music can help boost memorization abilities and other cognitive functions ...</p>

                                                <div className="row mt-4 d-flex align-items-end">
                                                    <div className="col-md-4 d-flex diary-info">
                                                        <span className="d-inline-block text-truncate" style={{ maxWidth: 80 }}>{diary.detail_user?.name}</span>
                                                        <p className="created-at">{
                                                            diary.created_at.split('T')[0].split('-').reverse().join('/')
                                                        }</p>
                                                    </div>
                                                    <div className="col text-end">
                                                        <button className="btn btn-primary btn-sm" onClick={() => {
                                                            window.location.href = `/diaries/${diary.id}`
                                                        }}>Read</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
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

export default DetailConseling;