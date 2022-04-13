import React from "react";
import HeroImage from "../../assets/images/hero.png";
import icon_lifetime_access from "../../assets/images/icon_lifetime_access.png";
import icon_online_counseling from "../../assets/images/icon_online_counseling.png";
import icon_diary from "../../assets/images/icon_diary.png";
import icon_mentorship from "../../assets/images/icon_mentor.png";
import PopularCourseItem from "../../items/PopularCourseItem";
import ConselorItems from "../../items/ConselorItems";

import Header from "../../components/Header";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";

class Home extends React.Component {
  // store data form api
  state = {
    courses: [],
    conselors: [],
  };

  getDataApi = () => {
    fetch("http://127.0.0.1:8000/api/courses")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          courses: response,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getApiconselors = () => {
    fetch("http://127.0.0.1:8000/api/users?role.id=2")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          conselors: response,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getDataApi();
    this.getApiconselors();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="home container">
          {/* HERO */}
          <div className="row ">
            <div className="col-md-5 align-self-center">
              <h1 className="title">Consultation Is Easier With Speak UP</h1>
              <p className="desc">
                Speak Up is a digital counseling service provider platform that
                aims to help people solve mental health problems
              </p>
              <button className="btn btn-primary mt-3">Get Started →</button>
            </div>
            <div className="col-md"></div>
            <div className="col-md-5 d-flex align-self-center">
              <img src={HeroImage} className="ml-auto img-fluid" alt="" />
            </div>
          </div>

          {/* FEATURE */}
          <div className="row mx-4 feature">
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

          {/* POPULAR COURSE */}
          <div className="row d-flex justify-content-between align-items-center popular-course">
            <h1>Popular Course</h1>
            <h3>
              <a
                href="/courses"
                className="text-decoration-none text-secondary"
              >
                See all →
              </a>
            </h3>

            <div className="row popular-course-items mt-4 flex-row flex-nowrap flex-row flex-nowrap overflow-scroll">
              {this.state.courses.map((course, index) => {
                if (index < 3) {
                  return (
                    <PopularCourseItem
                      key={course.id}
                      id={course.id}
                      img={course.thumbnail}
                      title={course.title}
                      desc={course.detail_course[0].description}
                    />
                  );
                }
              })}
            </div>
          </div>

          <div className="row d-flex justify-content-between align-items-center popular-course">
            <div className="col-md-5 ">
              <h1>Our Best conselors</h1>
              <p className="text-secondary mt-3">
                We have a wide network of relationships so that we can meet the
                various needs of our customers and partners.
              </p>
            </div>
            <h3>
              <a
                href="/counseling"
                className="text-decoration-none text-secondary"
              >
                See all →
              </a>
            </h3>
          </div>

          {/* conselors LIST */}
          <div className="row conselors mt-4">
            {this.state.conselors.map((conselors) => {
              return (
                <ConselorItems
                  key={conselors.id}
                  img={conselors.detail_user.photo}
                  name={conselors.detail_user.name}
                  position={
                    (conselors.detail_user.job == ""
                      ? "None"
                      : conselors.detail_user.job) +
                    " • " +
                    conselors.detail_user.address
                  }
                />
              );
            })}
          </div>
        </div>
        <Faq />
        <Footer />
      </div>
    );
  }
}

export default Home;
