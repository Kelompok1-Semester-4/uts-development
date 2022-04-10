import React from "react";
import Header from "../../components/Header";

import icon_info from "../../assets/images/icon_info.svg";
import Footer from "../../components/Footer";

const Register = () => {
    return (
        <div>
            <Header />
            <div className="container register">
                <center className="mt-5 mb-5">
                    <h1>Start Your Journey From Here</h1>
                    <h4>Please enter your detail and please be true</h4>
                </center>
                <div className="row justify-content-center">
                    <ul className="nav nav-pills mb-3 flex-column flex-sm-row nav-justified register-tab col-md-6" id="pills-tab" role="tablist">
                        <li className="nav-item flex-sm-fill me-4" role="presentation">
                            <button className="nav-link btn active" id="pills-user-tab" data-bs-toggle="pill" data-bs-target="#pills-user" type="button" role="tab" aria-controls="pills-user" aria-selected="true">Register as User</button>
                        </li>
                        <li className="nav-item flex-sm-fill" role="presentation">
                            <button className="nav-link btn" id="pills-conselor-tab" data-bs-toggle="pill" data-bs-target="#pills-conselor" type="button" role="tab" aria-controls="pills-conselor" aria-selected="false">Register as Conselor</button>
                        </li>
                    </ul>
                    <div className="tab-content col-md-8" id="pills-tabContent">
                        <div className="tab-pane fade show active row justify-content-center" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
                            <form className="form-register">
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" id="fullname" placeholder="Fullname" />
                                    </div>
                                    <div className="col">
                                        <input type="email" className="form-control" id="email" placeholder="Email Address" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <select id="inputState" className="form-select">
                                            <option selected>Gender</option>
                                            <option>L</option>
                                            <option>P</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <input type="password" className="form-control" id="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="date" className="form-control" id="birth" placeholder="Birth" />
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control" id="job" placeholder="Job" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Address" id="address"></textarea>
                                            <label htmlFor="address">Address</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control" id="phone-number" placeholder="Phone Number" />
                                    </div>
                                </div>
                            </form>
                            <div className="row d-flex align-items-end">
                                <div className="col">
                                    <div className="row p-2 mt-4">
                                        <img src={icon_info} className="icon" alt="" />
                                        <h5 className="d-flex my-auto">Please fill in the data correctly</h5>
                                    </div>
                                    <div className="row p-2">
                                        <img src={icon_info} className="icon" alt="" />
                                        <h5 className="d-flex my-auto">By placing an order, I agree to the applicable Terms and Conditions.</h5>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-primary float-end">Sign Up</button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade row justify-content-center" id="pills-conselor" role="tabpanel" aria-labelledby="pills-conselor-tab">
                            <form className="form-register">
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" id="fullname" placeholder="Fullname" />
                                    </div>
                                    <div className="col">
                                        <input type="email" className="form-control" id="email" placeholder="Email Address" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <select id="inputState" className="form-select">
                                            <option selected>Gender</option>
                                            <option>L</option>
                                            <option>P</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <input type="password" className="form-control" id="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="date" className="form-control" id="birth" placeholder="Birth" />
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control" id="job" placeholder="Job" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Address" id="address"></textarea>
                                            <label htmlFor="address">Address</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control" id="phone-number" placeholder="Phone Number" />
                                    </div>
                                </div>

                                <div className="row mt-4 border py-5 px-2 education-field justify-content-center">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control" id="institution" placeholder="Institution" />
                                        </div>
                                        <div className="col">
                                            <input type="file" className="form-control" id="file_url" placeholder="File Url" />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <input type="text" className="form-control" id="major" placeholder="Major" />
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" id="gpa" placeholder="GPA" />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <input type="text" className="form-control" id="study-field" placeholder="Study Field" />
                                        </div>
                                        <div className="col">
                                            <input type="date" className="form-control" id="graduation-year" placeholder="Graduation Year" />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Address" id="address-insititution"></textarea>
                                                <label htmlFor="address-insititution">Address</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                        </div>
                                    </div>
                                </div>

                            </form>
                            <div className="row d-flex align-items-end">
                                <div className="col">
                                    <div className="row p-2 mt-4">
                                        <img src={icon_info} className="icon" alt="" />
                                        <h5 className="d-flex my-auto">Please fill in the data correctly</h5>
                                    </div>
                                    <div className="row p-2">
                                        <img src={icon_info} className="icon" alt="" />
                                        <h5 className="d-flex my-auto">By placing an order, I agree to the applicable Terms and Conditions.</h5>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-primary float-end">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register;