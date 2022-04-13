import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import Header from "../../components/Header";

import icon_info from "../../assets/images/icon_info.svg";
import Footer from "../../components/Footer";

const Register = () => {
    // required fields
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [job, setJob] = useState("");
    const [phone, setPhone] = useState("");
    // education required fields
    const [level, setLevel] = useState("");
    const [institution, setInstitution] = useState("");
    const [institution_address, setInstitutionAddress] = useState("");
    const [major, setMajor] = useState("");
    const [study_field, setStudyField] = useState("");
    const [graduation_year, setGraduationYear] = useState("");
    const [gpa, setGpa] = useState("");
    const [file_url, setFileUrl] = useState("");

    const [role_id, setRole] = useState("");

    const [navigate, setNavigate] = useState(false);

    // Register As User
    const registerAsUser = async (e) => {
        e.preventDefault();
        console.log({
            name,
            gender,
            birth,
            address,
            email,
            password,
            job,
            phone,
            role_id,
        });
        await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                gender: gender,
                birth: birth,
                address: address,
                email: email,
                password: password,
                job: job,
                phone: phone,
                role_id: role_id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.meta.code == 200) {
                    setNavigate(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Register As Conselor
    const registerAsConselor = async (e) => {
        e.preventDefault();
        console.log({
            name,
            gender,
            birth,
            address,
            email,
            password,
            job,
            phone,
            role_id,
            level,
            institution,
            institution_address,
            major,
            study_field,
            graduation_year,
            gpa,
            file_url,
        });

        await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                gender: gender,
                birth: birth,
                address: address,
                job: job,
                email: email,
                password: password,
                phone: phone,
                role_id: role_id,
                level: level,
                institution: institution,
                institution_address: institution_address,
                major: major,
                study_field: study_field,
                graduation_year: graduation_year,
                gpa: gpa,
                file_url: file_url,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.meta.code == 200) {
                    setNavigate(true);
                    console.log(data);
                } else if (data.meta.code == 400) {
                    setNavigate(false);
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log(err);
                setNavigate(false);
            });
    };

    return (
        <div>
            <Header />
            <div className="container register">
                <center className="mt-5 mb-5">
                    <h1>Start Your Journey From Here</h1>
                    <h4>Please enter your detail and please be true</h4>
                </center>
                <div className="row justify-content-center">
                    <ul
                        className="nav nav-pills mb-3 flex-column flex-sm-row nav-justified register-tab col-md-6"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item flex-sm-fill me-4" role="presentation">
                            <button
                                className="nav-link btn active"
                                id="pills-user-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-user"
                                type="button"
                                role="tab"
                                aria-controls="pills-user"
                                aria-selected="true"
                                onClick={() => {
                                    setRole(1);
                                }}
                            >
                                Register as User
                            </button>
                        </li>
                        <li className="nav-item flex-sm-fill" role="presentation">
                            <button
                                className="nav-link btn"
                                id="pills-conselor-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-conselor"
                                type="button"
                                role="tab"
                                aria-controls="pills-conselor"
                                aria-selected="false"
                                onClick={() => {
                                    setRole(2);
                                }}
                            >
                                Register as Conselor
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content col-md-8" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active row justify-content-center"
                            id="pills-user"
                            role="tabpanel"
                            aria-labelledby="pills-user-tab"
                        >
                            <form className="form-register" onSubmit={registerAsUser}>
                                <div className="row">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => {
                                                setName(event.target.value);
                                            }}
                                            placeholder="Fullname"
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email Address"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <select
                                            className="form-select"
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                setGender(selectedValue);
                                                console.log(selectedValue);
                                            }}
                                        >
                                            <option selected value={"L"}>
                                                L
                                            </option>
                                            <option value={"P"}>P</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <input
                                            type="password"
                                            className="form-control"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input
                                            type="date"
                                            className="form-control"
                                            onChange={(e) => {
                                                setBirth(e.target.value);
                                            }}
                                            placeholder="Birth"
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Job"
                                            onChange={(e) => {
                                                setJob(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                placeholder="Address"
                                                onChange={(e) => {
                                                    setAddress(e.target.value);
                                                }}
                                            ></textarea>
                                            <label htmlFor="address">Address</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Phone Number"
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
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
                                                By placing an order, I agree to the applicable Terms and
                                                Conditions.
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary float-end" type="submit">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div
                            className="tab-pane fade row justify-content-center"
                            id="pills-conselor"
                            role="tabpanel"
                            aria-labelledby="pills-conselor-tab"
                        >
                            <form className="form-register" onSubmit={registerAsConselor}>
                                <div className="row">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => {
                                                setName(event.target.value);
                                            }}
                                            placeholder="Fullname"
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email Address"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <select
                                            className="form-select"
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                setGender(selectedValue);
                                                console.log(selectedValue);
                                            }}
                                        >
                                            <option selected value={"L"}>
                                                L
                                            </option>
                                            <option value={"P"}>P</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <input
                                            type="password"
                                            className="form-control"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input
                                            type="date"
                                            className="form-control"
                                            onChange={(e) => {
                                                setBirth(e.target.value);
                                            }}
                                            placeholder="Birth"
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Job"
                                            onChange={(e) => {
                                                setJob(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                placeholder="Address"
                                                onChange={(e) => {
                                                    setAddress(e.target.value);
                                                }}
                                            ></textarea>
                                            <label htmlFor="address">Address</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Phone Number"
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="row mt-4 border py-5 px-2 education-field justify-content-center">
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Institution"
                                                onChange={(e) => {
                                                    setInstitution(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="File Url Link"
                                                onChange={(e) => {
                                                    setFileUrl(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Major"
                                                onChange={(e) => {
                                                    setMajor(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="GPA"
                                                onChange={(e) => {
                                                    setGpa(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Study Field"
                                                onChange={(e) => {
                                                    setStudyField(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Graduation Year"
                                                onChange={(e) => {
                                                    setGraduationYear(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Address"
                                                    onChange={(e) => {
                                                        setInstitutionAddress(e.target.value);
                                                    }}
                                                ></textarea>
                                                <label htmlFor="address-insititution">Address</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => {
                                                    setLevel(e.target.value);
                                                }}
                                                placeholder="Level : SMA"
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                                By placing an order, I agree to the applicable Terms and
                                                Conditions.
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary float-end" type="submit">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
