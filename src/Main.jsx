import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Counseling from "./assets/pages/Counseling";
import Courses from "./assets/pages/Courses";
import AddDiary from "./assets/pages/Dashboard User/AddDiary";
import DashboardUser from "./assets/pages/Dashboard User/DashboardUser";
import DetailCourse from "./assets/pages/DetailCourse";
import DetailDiary from "./assets/pages/DetailDiary";
import Diaries from "./assets/pages/Diaries";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import Transaction from "./assets/pages/Transaction";

const Main = () => {

    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/diaries" element={<Diaries />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/counseling" element={<Counseling />} />
                    <Route path="/courses/:id" element={<DetailCourse />} />
                    <Route path="/diaries/:id" element={<DetailDiary />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/checkout/:id" element={<Transaction />} />
                    <Route path="/add-diary" element={<AddDiary />} />
                    <Route path="/edit-diary/:id" element={<AddDiary />} />
                    <Route path="/dashboard-user" element={<DashboardUser />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Main;