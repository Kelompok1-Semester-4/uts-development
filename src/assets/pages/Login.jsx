import React from "react";
import Header from "../../components/Header";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";

import image_login from "../../assets/images/image_login.svg";

const Login = () => {
    return (
        <div>
            <Header />
            <div className="container login">
                <div className="row justify-content-center d-flex align-items-center mb-5">
                    <div className="col-md-6">
                        <img src={image_login} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <center>
                            <h1>Welcome Back!</h1>
                            <h4 className="mt-3">Please enter your detail and please be true</h4>

                            <form className="col-md-9 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email Address"
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Password"
                                />
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary" type="button">Sign In</button>
                                </div>
                            </form>
                            <div className="row">
                                <p>Don’t have account? <a href="/register" className="text-decoration-none">Sign Up</a></p>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;