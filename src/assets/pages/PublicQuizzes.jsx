import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CounselingItem from "../../items/CounselingItem";
import QuizItem from "../../items/QuizItem";

const PublicQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/quizzes')
            .then(res => {
                setQuizzes(res.data.data);
                console.log(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div>
            <Header />
            <div className="counseling container">
                {/* HERO */}
                <div className="row mb-5">
                    <div className="col-md-6 align-self-center">
                        <h1 className="title">
                            Find Your Current Condition
                        </h1>
                        <form className="mt-5">
                            {/*search  */}
                            <input type="text" placeholder="Search" className="form-control" />
                        </form>
                    </div>
                    <div className="col-md"></div>
                    <div className="col-md-5 d-flex align-self-center">
                        <img src="" className="d-block ms-auto img-fluid" alt="" />
                    </div>
                </div>
                {/* Quizz */}
                <div className="row popular-counseling md-5">
                    <h1>Start your quiz </h1>
                    <div className="row">
                        {/* <QuizItem /> */}
                        {
                            quizzes.map((quiz) => {
                                return (
                                    <QuizItem
                                        key={quiz.id}
                                        id={quiz.id}
                                        gambar={quiz.photo}
                                        title={quiz.title}
                                        description={quiz.description}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Faq />
            <Footer />
        </div>
    );
}

export default PublicQuizzes;