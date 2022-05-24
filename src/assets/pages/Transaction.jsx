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
import CurrencyFormat from "react-currency-format";

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
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUser(res.data.data);
        console.log(res.data.data);
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
                      defaultValue={user.detailUser?.name}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="phone-number"
                      placeholder="Phone Number"
                      defaultValue={user.detailUser?.phone}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <select id="inputState" className="form-select">
                      {
                        ["L", "P"].map((item, index) => {
                          return (
                            (item === user.detailUser?.gender) ?
                              <option key={index} value={item} selected>{item}</option>
                              :
                              <option key={index} value={item}>{item}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      id="birth"
                      defaultValue={user.detailUser?.birth}
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
                      defaultValue={user.user?.email}
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
              </div>
              <div className="row mt-5">
                <div className="col">
                  <span>Total</span>
                  <h3 className="price d-flex my-auto">
                    <CurrencyFormat value={course.price} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                  </h3>
                </div>
                <div className="col">
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
