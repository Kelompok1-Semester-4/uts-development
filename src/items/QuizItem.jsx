import React from "react";
import { Link, Navigate, useHref } from "react-router-dom";

const QuizItem = (props) => {
    return (
        <div className=" col-md-2 col-sm-4 mt-4">
            <div div className="card custom-card-course" >
                <img src={`http://127.0.0.1:8000/` + props.gambar} className="card-img-top quiz-image" alt="..." />
                <div className="card-body conseling-body mt-3">
                    <div className="row d-flex justify-item-center m-2">
                        <div className="col-md d-flex justify-content-center">
                            <h5 className="card-title conselor-name giveMeEllipsis">{props.title}</h5>
                        </div>
                    </div>
                    <div className="row d-flex justify-item-center mb-4 ">
                        <div className="col-md d-flex justify-content-center">
                            <h6 className="text-secondary">{props.description}</h6>
                        </div>
                    </div>
                    <div className="row d-flex align-items-center ps-2 mb-2">
                        <div className="col-md d-flex justify-content-center">
                            <Link className="btn btn-primary btn-small" to={`${props.id}`}>
                                Start
                            </Link>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    );
}

export default QuizItem;
