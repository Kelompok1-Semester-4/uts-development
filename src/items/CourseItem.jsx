import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import IconPlay from "../assets/icon/light/Play.svg";
import IconUser from "../assets/icon/light/User.svg";
import { useNavigate } from "react-router-dom";

const CourseItem = (props) => {
  let navigate = useNavigate();
  return (
    <div className="col-md-4 col-sm-6">
      <div className="card custom-card-course">
        <img
          src={props.thumbnail}
          className="card-img-top course-image"
          alt="..."
        />
        <div className="card-body">
          <div className="row">
            <div className="col-md">
              <h5 className="card-title">{props.title}</h5>
            </div>
            <div className="col-md-4 text-end">
              <img
                src={props.user_photo}
                className="rounded-circle circle-image"
                alt=""
              />
            </div>
          </div>
          <p className="card-text giveMeEllipsis col-md-8">
            {props.description}
          </p>
          <div className="row d-flex align-items-center ps-2 mb-2">
            <div className="col-md-7">
              <img
                src={IconPlay}
                className="card-icon align-self-center"
                width={21}
                alt=""
              />
              <h4 className="mount d-inline ms-2">{props.count_of_videos} Videos</h4>

              <img
                src={IconUser}
                className="card-icon ms-2 align-self-center"
                width={21}
                alt=""
              />
              <h4 className="mount d-inline">{props.users} Users</h4>
            </div>
            <div className="col-md d-flex justify-content-end">
            <button onClick={() => {
              navigate(`/courses/${props.id}`);
            }} className="btn btn-primary btn-small mt-4">
              Learn Now
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
