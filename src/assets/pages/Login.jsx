import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import image_login from "../../assets/images/image_login.svg";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import DashboardUser from "./Dashboard User/DashboardUser";

const Login = () => {
  // required fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [navigate, setNavigate] = useState(false);

  console.log(navigate);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });

    // call api
    await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.meta.code == 200) {
          localStorage.setItem("token", data.data.token);
          setUser(data.user);
          setNavigate(true);
        }
      });
  };

  if (navigate) {
    // navigate to dashboard-user and pass the data
    return (
      <Navigate
        to={{
          pathname: "/dashboard-user",
          state: {
            user,
          },
        }}
      />
    );
  }

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
              <h4 className="mt-3">
                Please enter your detail and please be true
              </h4>

              <form className="col-md-9" onSubmit={handleLogin}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Sign In
                  </button>
                </div>
              </form>
              <div className="row">
                <p>
                  Don’t have account?{" "}
                  <a href="/register" className="text-decoration-none">
                    Sign Up
                  </a>
                </p>
              </div>
            </center>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
