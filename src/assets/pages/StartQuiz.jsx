import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import QuizItem from "../../items/QuizItem";

const StartQuiz = () => {
    const [quizzes, setQuizzes] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/detail-quiz/' + id)
            .then(res => {
                setQuizzes(res.data.data);
                console.log(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className=" col-lg-8" key={quizzes?.id}>
                        <div div className="card custom-card-course" >
                            <img src={`http://127.0.0.1:8000/${quizzes?.photo}`} className="card-img-top" style={
                                {
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover'
                                }
                            } alt="..." />
                            <div className="card-body conseling-body mt-3">
                                {
                                    quizzes?.detail_quiz?.map((detail, index) => {
                                        return (
                                            <div className="container col-lg-12">
                                                <div className="row d-flex justify-item-center mb-5 mt-5">
                                                    <div className="col-md-10 d-flex justify-content-start">
                                                        <h5 className="card-title conselor-name">{detail.title}</h5>
                                                    </div>
                                                    <div className="col-md d-flex justify-content-end">
                                                        <h5 className="text-secondary">{index + 1}</h5>
                                                    </div>
                                                </div>
                                                {
                                                    detail.question1 == '' || detail.question1 == 'undefined' || detail.question1 == null ? null :
                                                        <div className="row d-flex justify-content-center mb-2 ">
                                                            <input type="radio" className="btn-check" name={`${index}`} id={`${index}, 1`} autocomplete="off" />
                                                            <label className="btn btn-outline-success" for={`${index}, 1`}>{detail.question1}</label>
                                                        </div>
                                                }
                                                {
                                                    detail.question2 == '' || detail.question2 == 'undefined' || detail.question2 == null ? null :
                                                        <div className="row d-flex justify-content-center mb-2 ">
                                                            <input type="radio" className="btn-check" name={`${index}`} id={`${index}, 2`} autocomplete="off" />
                                                            <label className="btn btn-outline-success" for={`${index}, 2`}>{detail.question2}</label>
                                                        </div>
                                                }
                                                {
                                                    detail.question3 == '' || detail.question3 == 'undefined' || detail.question3 == null ? null :
                                                        <div className="row d-flex justify-content-center mb-3 ">
                                                            <input type="radio" className="btn-check" name={`${index}`} id={`${index}, 3`} autocomplete="off" />
                                                            <label className="btn btn-outline-success" for={`${index}, 3`}>{detail.question3}</label>
                                                        </div>
                                                }
                                                {
                                                    detail.question4 == '' || detail.question4 == 'undefined' || detail.question4 == null ? null :
                                                        <div className="row d-flex justify-content-center mb-4 ">
                                                            <input type="radio" className="btn-check" name={`${index}`} id={`${index}, 4`} autocomplete="off" />
                                                            <label className="btn btn-outline-success" for={`${index}, 4`}>{detail.question4}</label>
                                                        </div>
                                                }
                                            </div>

                                        )
                                    })
                                }
                                <div className="row justify-content-end mt-5 me-1 mb-2">
                                    <div className="m-0 col-lg-6 text-end">
                                        <button className="btn btn-success me-0" onClick={
                                            () => {
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "Once submitted, you will not be able to edit your answers!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {

                                                            swal("Your answers has been submitted!", {
                                                                icon: "success",
                                                            });
                                                            window.location.href = `/courses`;
                                                        } else {
                                                            swal("Your answers has been canceled!");
                                                        }
                                                    });
                                            }
                                        }>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </div>
            </div >
            <Faq />
            <Footer />
        </div >
    )
}

export default StartQuiz;