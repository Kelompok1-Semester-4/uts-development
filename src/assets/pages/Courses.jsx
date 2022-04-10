import React from "react";

import CoursesImage from "../../assets/images/course-hero.svg";
import icon_lifetime_access from "../../assets/images/icon_lifetime_access.png";
import icon_online_counseling from "../../assets/images/icon_online_counseling.png";
import icon_diary from "../../assets/images/icon_diary.png";
import icon_mentorship from "../../assets/images/icon_mentor.png";
import CourseItem from "../../items/CourseItem";

import Header from "../../components/Header";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";

class Courses extends React.Component {
  state = {
    courses: [],
  };

  getDataApi = () => {
    fetch("http://127.0.0.1:8000/api/courses")
      .then((response) => response.json())
      .then((jsonHasilAmbilDariAPI) => {
        this.setState({
          courses: jsonHasilAmbilDariAPI,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getDataApi();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="courses container">
          {/* HERO */}
          <div className="row ">
            <div className="col-md-6 align-self-center">
              <h1 className="title">
                Discover The Best Course According To Your Needs
              </h1>
              <form action="">
                <div className="row">
                  <div className="col-md-7">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for a course"
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="Productivity">Productivity</option>
                      <option value="Relationship">Relationship</option>
                      <option value="Career">Career</option>
                      <option value="Mental Health">Mental Health</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md"></div>
            <div className="col-md-5 d-flex align-self-center">
              <img
                src={CoursesImage}
                className="ms-auto d-flex  img-fluid"
                alt=""
              />
            </div>
          </div>

          {/* FEATURE */}
          <div className="row d-flex justify-content-center feature">
            <div className="col-md feature-item d-flex">
              <img src={icon_lifetime_access} className="feature_icon" />
              <h3 className="feature_title my-auto">Lifetime Access</h3>
            </div>
            <div className="col-md feature-item">
              <img src={icon_online_counseling} className="feature_icon" />
              <h3 className="feature_title">Online Counseling</h3>
            </div>
            <div className="col-md feature-item">
              <img src={icon_diary} className="feature_icon" />
              <h3 className="feature_title">Diary Maker</h3>
            </div>
            <div className="col-md feature-item">
              <img src={icon_mentorship} className="feature_icon" />
              <h3 className="feature_title">Expert Mentor</h3>
            </div>
          </div>

          {/* LIST OF COURSE */}
          <div className="row courses">
            <h1 className="mb-5">List Of Course</h1>

            <div className="row">
              {this.state.courses.map((course) => {
                return (
                  <CourseItem
                    key={course.id}
                    id={course.id}
                    thumbnail={course.thumbnail}
                    title={course.title}
                    user_photo={course.detail_user.photo}
                    description={course.detail_course[0].description}
                    count_of_videos = {course.detail_course.length}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <Faq />
        <Footer />
      </div>
    );
  }
}

export default Courses;
