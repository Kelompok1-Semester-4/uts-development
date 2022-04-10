import React from "react";
import HeroImage from "../../assets/images/counseling-hero.svg";
import icon_check from "../../assets/images/icon_check.svg";
import CounselingItem from "../../items/CounselingItem";
import Header from "../../components/Header";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";

class Counseling extends React.Component {

    state = {
        users: [],
    }

    fetchData = () => {
        fetch("http://127.0.0.1:8000/api/users?role_id=2")
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    users: response,
                });
            }
            )
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="counseling container">
                    {/* HERO */}
                    <div className="row mb-5">
                        <div className="col-md-6 align-self-center">
                            <h1 className="title">
                                Discover The Best Counseling Experience For You
                            </h1>
                            <form className="mt-5">
                                {/*search  */}
                                <input type="text" placeholder="Search" className="form-control" />
                            </form>
                        </div>
                        <div className="col-md"></div>
                        <div className="col-md-5 d-flex align-self-center">
                            <img src={HeroImage} className="d-block ms-auto img-fluid" alt="" />
                        </div>
                    </div>
                    {/* POPULAR COURSE */}
                    <div className="row popular-counseling md-5">
                        <h1>Popular Counseling</h1>
                        <div className="row">
                            {
                                this.state.users.map((user) => {
                                    return (
                                        <CounselingItem
                                            key={user.id}
                                            name={user.detail_user.name}
                                            photo={user.detail_user.photo}
                                            job={user.detail_user.job}
                                            benefits={user.detail_user.benefits}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Faq />
                <Footer />
            </div>
        );
    }
}
export default Counseling;