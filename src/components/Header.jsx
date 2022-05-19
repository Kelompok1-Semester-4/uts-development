import React, { useState, useEffect } from "react";
import Brand from "./../assets/images/speakup.jpg";
import "./../assets/mystyles.css";
import ChevronDown from "./../assets/icon/light/ChevronDown.svg";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Courses from "../assets/pages/Courses";
import Counseling from "../assets/pages/Counseling";
import Home from "../assets/pages/Home";
import Diaries from "../assets/pages/Diaries";
import axios from "axios";

const Header = () => {

  let token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  // logout with delete local storage
  const logout = () => {
    localStorage.removeItem('token');
    document.location.href = '/';
  }

  // fetch authenticated user by token
useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data.detailUser);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <header className="d-flex container my-navbar flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
      <a
        href=""
        className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
      >
        <img src={Brand} width={146} height={64} alt="" />
      </a>

      <ul className="nav my-menu col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <a href="/" className="nav-link px-2 me-5">
            Home
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle px-2 me-5 link-dark"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Services
            <img src={ChevronDown} className="dropdown-icon-in-menu" />
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a className="dropdown-item" href="/courses">
                Online Course
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/counseling">
                Counseling
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/diaries" className="nav-link px-2 me-5 link-dark">
            Diary
          </a>
        </li>
      </ul>

      <div className="col-md-3 text-end d-none d-xl-block">
        {(() => {
          if (user.photo) {
            return (
              <div>
                <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={'http://127.0.0.1:8000/' + user.photo} alt="mdo" width="32" height="32" className="rounded-circle" />
                </a>

                <ul className="dropdown-menu text-small mt-2" aria-labelledby="dropdownUser1">
                  <li><a className="dropdown-item" onClick={() => {
                    logout();
                  }}>Sign out</a></li>
                </ul>
              </div>
            );
          } else {
            return (
              <a href="/login" className="btn btn-primary btn-sm btn-block me-5">
                Login
              </a>
            );
          }
        })()}
      </div>
    </header>
  );
};

export default Header;
