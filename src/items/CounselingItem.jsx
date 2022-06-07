import React from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import icon_check from "../assets/images/icon_check.svg";

const CounselingItem = (props) => {
    return (
        <div className="col-md-4 col-sm-6">
            <div className="card custom-card-course">
                <img src={props.photo} className="card-img-top conselor-image" alt="..." />
                <div className="card-body conseling-body mt-3">
                    <div className="row">
                        <div className="col-md">
                            <h5 className="card-title conselor-name giveMeEllipsis">{props.name}</h5>
                            <h6 className="conselor-job">{props.job}</h6>
                        </div>
                        <div className="col-md-4 text-end">
                            <p className="text-primary text-via">Via: Zoom</p>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="row px-2">
                        {
                            props.benefits.split(',').map((benefit, index) => {
                                return (
                                    <div className="col-md-6 mb-2" key={benefit}>
                                        <div className="row d-flex align-items-center">
                                            <img src={icon_check} className="icon_check align-self-center" alt="" />
                                            <h4 className="benefit-item my-auto giveMeEllipsis">{
                                                benefit
                                            }</h4>
                                        </div>
                                    </div>
                                );  // return
                            })
                        }
                    </div>
                    <hr className="my-3" />
                    <div className="row d-flex align-items-center ps-2 mb-2">
                        <h3 className="my-auto p-0 mx-0 counseling-price">{
                            <CurrencyFormat value={props.price} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                        }</h3>
                        <div className="col-md d-flex justify-content-end">
                            <button className="btn btn-primary btn-small" onClick={() => {
                                window.location.href = '/conselor/detail/' + props.id;
                            }}>Enroll Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CounselingItem;