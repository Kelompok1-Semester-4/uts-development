import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Counseling from "./assets/pages/Counseling";
import Courses from "./assets/pages/Courses";
import ConselorProfile from "./assets/pages/Dashboard Admin/ConselorProfile";
import DashboardAdmin from "./assets/pages/Dashboard Admin/DashboardAdmin";
import Quizzes from "./assets/pages/Dashboard Admin/Quizzes";
import DashboardConselor from "./assets/pages/Dashboard Conselor/DashboardConselor";
import AddDiary from "./assets/pages/Dashboard User/AddDiary";
import AddDiaryConselor from "./assets/pages/Dashboard User/AddDiaryConselor";
import DashboardUser from "./assets/pages/Dashboard User/DashboardUser";
import DetailCourse from "./assets/pages/DetailCourse";
import DetailDiary from "./assets/pages/DetailDiary";
import Diaries from "./assets/pages/Diaries";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import PublicQuizzes from "./assets/pages/PublicQuizzes";
import Register from "./assets/pages/Register";
import StartQuiz from "./assets/pages/StartQuiz";
import Transaction from "./assets/pages/Transaction";
import DetailCourseConselor from "./assets/pages/Dashboard Conselor/DetailCourse";

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
                    <Route path="/add-diary-conselor" element={<AddDiary />} />
                    <Route path="/edit-diary/:id" element={<AddDiary />} />
                    <Route path="/edit-diary-conselor/:id" element={<AddDiaryConselor />} />
                    <Route path="/dashboard-conselor" element={<DashboardConselor />} />
                    <Route path="/dashboard-user" element={<DashboardUser />} />
                    <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                    <Route path="/admin-quizzes/:id" element={<Quizzes />} />
                    <Route path="/dashboard-admin/conselor/:id" element={<ConselorProfile />} />
                    <Route path="/quiz" element={<PublicQuizzes />} />
                    <Route path="/quiz/:id" element={<StartQuiz />} />
                    <Route path="/dashboard-conselor/course/:id" element={<DetailCourseConselor />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Main;