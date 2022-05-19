import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Header from "../../components/Header";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";

import { useNavigate } from "react-router-dom";


const DetailDiary = (props) => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [diary, setDiary] = React.useState([]);
    const [diaries, setDiaries] = React.useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/diaries?id=${id}`)
            .then(res => {
                setDiary(res.data);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/diaries`)
            .then(res => {
                setDiaries(res.data);
            });
    })


    return (
        <div>
            <Header />
            <div className="container detail-diary">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <a className="text-decoration-none text-secondary back-link" onClick={() => {
                            navigate("/diaries")
                        }}>← Back</a>

                        <div className="row">
                            <img src={"http://127.0.0.1:8000/" + diary?.cover_image} alt="" className="img-fluid diary-image" />

                            <h2 className="title">{diary?.title}</h2>

                            <p className="text-primary tags">{diary?.detail_user?.name} • <span className="text-secondary">
                                {
                                    // date format
                                    diary?.created_at?.split("T")[0].split("-").reverse().join("-")
                                }
                            </span></p>

                            <p className="content">{diary?.content}</p>

                            <p className="topic">Topic: <span className="text-primary">{diary?.diary_type?.name}</span></p>

                            <h4>Other Topic</h4>

                            <div className="row other-diary">
                                {
                                    diaries?.map((diary, index) => {
                                        if (index < 7) {
                                            return <div onClick={() => {
                                                navigate(`/diaries/${diary.id}`)
                                            }} className="col-lg-4 my-3" key={diary?.id}>
                                                <img src={"http://127.0.0.1:8000/" + diary?.cover_image} className="img-fluid" alt="" />

                                                <h3 className="diary-title mt-3">{diary?.title}</h3>
                                                <p className="diary-body giveMeEllipsis">These findings suggest certain types of music can help boost memorization abilities and other cognitive functions ...</p>
                                            </div>
                                        }
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

export default DetailDiary;