import React from "react";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import swal from "sweetalert";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import image_transaction from "../../assets/images/image_transaction.svg";
import icon_info from "../../assets/images/icon_info.svg";

const Transaction = () => {
  let { id } = useParams();
  const [course, setCourse] = useState({});
  let token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/courses?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  if (!token) {
    swal("Oops...", "You must login first!", "error").then(() => {
      document.location.href = "/login";
    });
  }

  // fetch authenticated user by token
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data.detailUser);
        console.log(res.data.data.detailUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="container transaction">
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            <h5>Transaction Form</h5>
            <h2>{course.title}</h2>

            <img
              src={image_transaction}
              className="transaction-image mt-5"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <p className="text-secondary">
              <b className="text-black">Profile</b> • Please fill in your data
              correctl{" "}
            </p>

            <div className="row">
              <form className="form-register">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      placeholder="Fullname"
                      defaultValue={user.name}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="phone-number"
                      placeholder="Phone Number"
                      defaultValue={user.phone}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <select id="inputState" className="form-select">
                      <option>L</option>
                      <option>P</option>
                    </select>
                  </div>
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      id="birth"
                      placeholder="Birth"
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </form>
              <div className="row d-flex align-items-end">
                <div className="col">
                  <div className="row p-2 mt-4">
                    <img src={icon_info} className="icon" alt="" />
                    <h5 className="d-flex my-auto">
                      Please fill in the data correctly
                    </h5>
                  </div>
                  <div className="row p-2">
                    <img src={icon_info} className="icon" alt="" />
                    <h5 className="d-flex my-auto">
                      I agree to the applicable Terms and Conditions.
                    </h5>
                  </div>
                </div>
                <div className="col-md-4 text-end p-0 mx-0">
                  <button className="btn btn-primary float-end">Submit</button>
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
};

export default Transaction;
