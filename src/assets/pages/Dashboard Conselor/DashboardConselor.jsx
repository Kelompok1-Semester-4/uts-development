import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import iconPlay from "./../../../assets/icon/light/Play.svg";
import Header from "../Dashboard User/partials/Header";

const DashboardConselor = () => {
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  if (!token) {
    window.location.replace("/login");
  }
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [courses, setCourse] = useState([]);
  const [course_id, setCourseId] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [detailTransaction, setDetailTransaction] = useState({});
  const [role, setRole] = useState("");
  const [messages, setMessages] = useState("");
  const [user_phone, setUserPhone] = useState("");

  if (user_phone.length !== 0) {
    console.log(user_phone);
  }

  // share invitation
  const shareInvitation = async () => {
    let encoded = encodeURIComponent(messages);
    let valid_phone = user_phone.replace(/^0/, "+62");
    window.open(
      `https://api.whatsapp.com/send?phone=${valid_phone}&text=${encoded}`
    );
  };

  // form field course
  const [thumbnail, setThumbnail] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [benefit, setBenefit] = useState("");
  const [course_type_id, setCourseTypeId] = useState("");

  const handleUploadThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // form field conselor
  const [photo, setPhoto] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("");
  const [work_address, setWorkAddress] = useState("");
  const [practice_place_address, setPracticePlaceAddress] = useState("");
  const [office_phone_number, setOfficePhoneNumber] = useState("");
  const [benefits, setBenefits] = useState("");
  const [conselor_price, setConselorPrice] = useState(""); // price
  const [phone, setPhone] = useState("");
  const [credit_card_number, setCreditCardNumber] = useState("");

  const handleuploadPhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  // form field conseling
  const [user_id, setUserId] = useState("");
  const [conseling_price, setConselingPrice] = useState("");
  const [pay_status, setPayStatus] = useState("");
  const [conseling_status, setConselingStatus] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [conseling_date, setConselingDate] = useState();

  // get all users
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  // add conseling
  const addConseling = async () => {
    await fetch("http://127.0.0.1:8000/api/conseling-transaction/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: user_id,
        price: user["price"],
        pay_status: pay_status,
        conseling_status: conseling_status,
        start_time: start_time,
        end_time: end_time,
        conseling_date: conseling_date,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.meta.code == 200) {
          swal("Success", "Successfully added conseling", "success").then(
            () => {
              window.location.reload();
              setUserId("");
              setConselingPrice("");
              setPayStatus("");
              setConselingStatus("");
              setStartTime("");
              setEndTime("");
              setConselingDate("");
            }
          );
        } else {
          swal("Error", res.data, "error");
        }
      });
  };

  // get detail conseling
  const [detail_conseling, setDetailConseling] = useState({});
  const getDetailConseling = async (id) => {
    await axios
      .get(`http://127.0.0.1:8000/api/user-conseling-transaction?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetailConseling(res.data.data);
        setPayStatus(res.data.data.pay_status);
        setConselingStatus(res.data.data.conseling_status);
        setStartTime(res.data.data.start_time);
        setEndTime(res.data.data.end_time);
        setConselingDate(res.data.data.conseling_date);
      }, []);
  };

  // update conseling
  const updateConseling = async (id) => {
    await fetch(
      `http://127.0.0.1:8000/api/conseling-transaction/update/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // user_id: user_id,
          price: user["price"],
          pay_status: pay_status,
          conseling_status: conseling_status,
          start_time: start_time,
          end_time: end_time,
          conseling_date: conseling_date,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.meta.code == 200) {
          swal("Success", "Successfully updated conseling", "success").then(
            () => {
              window.location.reload();
              setUserId("");
              setConselingPrice("");
              setPayStatus("");
              setConselingStatus("");
              setStartTime("");
              setEndTime("");
              setConselingDate("");
            }
          );
        } else {
          swal("Error", res.data, "error");
        }
      })
      .catch((err) => {
        swal("Error", "Failed to update conseling", "error");
      });
  };

  // delete conseling
  const deleteConseling = async (id) => {
    await fetch(
      `http://127.0.0.1:8000/api/conseling-transaction/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      swal("Success", "Successfully deleted conseling", "success").then(() => {
        window.location.reload();
      });
    });
  };

  // update conselor
  const updateConselor = async () => {
    const data = new FormData();
    data.append("photo", photo);
    data.append("name", name);
    data.append("gender", gender);
    data.append("birth", birth);
    data.append("address", address);
    data.append("job", job);
    data.append("phone", phone);
    data.append("work_address", work_address);
    data.append("practice_place_address", practice_place_address);
    data.append("office_phone_number", office_phone_number);
    data.append("benefits", benefits);
    data.append("price", conselor_price);
    data.append("credit_card_number", credit_card_number);

    await fetch("http://127.0.0.1:8000/api/user/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        // check if success
        if (res.meta.code == 200) {
          swal("Success", "Successfully updated conselor", "success").then(
            () => {
              window.location.reload();
            }
          );
        } else {
          swal("Error", res.data, "error");
        }
      });
  };

  // get detail course
  const getDetailCourse = async (id) => {
    await axios
      .get(`http://127.0.0.1:8000/api/courses?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setThumbnail(res.data.thumbnail);
        setTitle(res.data.title);
        setPrice(res.data.price);
        setBenefit(res.data.benefit);
        setCourseTypeId(res.data.course_type_id);
      }, []);
  };

  // add course
  const addCourse = async () => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("course_type_id", course_type_id);
    formData.append("benefit", benefit);

    await fetch("http://127.0.0.1:8000/api/course", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        // check if success
        if (res.meta.code == 200) {
          swal("Success", "Successfully added course", "success").then(() => {
            window.location.reload();
          });
        } else {
          swal("Error", res.data, "error");
        }
      });
  };

  // update course
  const updateCourse = async (id) => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("course_type_id", course_type_id);
    formData.append("benefit", benefit);

    await fetch(`http://127.0.0.1:8000/api/course/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        // check if success
        if (res.meta.code == 200) {
          swal("Success", "Successfully updated course", "success").then(() => {
            window.location.reload();
          });
        } else {
          swal("Error", res.data, "error");
        }
      });
  };

  // delete course
  const deleteCourse = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        swal("Success", "Delete course success", "success").then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        swal("Error", "Delete course failed", "error");
      });
  };

  // update transaction status
  const updateTransaction = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/update-transaction/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      swal("Success", "Transaction has been updated", "success").then(() => {
        window.location.reload();
      });
    });
  };

  // get detail transaction
  const getDetailTransaction = async (id) => {
    await axios
      .get(`http://127.0.0.1:8000/api/conselor-transaction/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetailTransaction(res.data.data);
        console.log(detailTransaction);
      }, []);
  };

  // get transaction
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/conselor-transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTransaction(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        setRole(res.data.data.user.role_id);

        // get photo
        setPhoto(res.data.data.detailUser.photo);

        console.log(photo);

        setName(res.data.data.detailUser.name);
        setGender(res.data.data.detailUser.gender);
        setBirth(res.data.data.detailUser.birth);
        setAddress(res.data.data.detailUser.address);
        setJob(res.data.data.detailUser.job);
        setWorkAddress(res.data.data.detailUser.work_address);
        setPracticePlaceAddress(
          res.data.data.detailUser.practice_place_address
        );
        setOfficePhoneNumber(res.data.data.detailUser.office_phone_number);
        setBenefits(res.data.data.detailUser.benefits);
        setConselorPrice(res.data.data.detailUser.price);
        setPhone(res.data.data.detailUser.phone);
        setCreditCardNumber(res.data.data.detailUser.credit_card_number);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get diaries by user id
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/diaries-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDiaries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // delete diary by id
  const handleDelete = (id) => {
    axios
      .delete("http://127.0.0.1:8000/api/diary/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        swal("Deleted!", "Your diary has been deleted.", "success").then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (role == 1 || role == 3) {
    window.location.href = "/login";
    localStorage.clear();
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/conselor-courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourse(res.data.data);
      });
  }, []);

  const [conseling_transaction, setConselingTransaction] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user-conseling-transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setConselingTransaction(res.data.data);
      });
  }, []);

  return (
    <div className="dashboard">
      {/* HEADER */}
      <Header
        photo={
          user.photo == ""
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            : `http://127.0.0.1:8000/${user.photo}`
        }
      />
      {/* MENU */}
      <div className="container">
        <div className="row justify-content-center menu">
          {/* MENU */}
          <ul
            className="nav nav-pills mb-3 flex-column flex-sm-row nav-justified dashboard-tab"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item me-4 flex-sm-fill" role="presentation">
              <button
                className="nav-link btn active"
                id="pills-diary-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-diary"
                type="button"
                role="tab"
                aria-controls="pills-diary"
                aria-selected="true"
              >
                Diaries
              </button>
            </li>
            <li className="nav-item me-4 flex-sm-fill" role="presentation">
              <button
                className="nav-link btn"
                id="pills-course-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-course"
                type="button"
                role="tab"
                aria-controls="pills-course"
                aria-selected="false"
              >
                Your Course
              </button>
            </li>
            <li className="nav-item me-4 flex-sm-fill" role="presentation">
              <button
                className="nav-link btn"
                id="pills-transaction-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-transaction"
                type="button"
                role="tab"
                aria-controls="pills-transaction"
                aria-selected="false"
              >
                Transaction
              </button>
            </li>
            <li className="nav-item me-4 flex-sm-fill" role="presentation">
              <button
                className="nav-link btn"
                id="pills-conseling-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-conseling"
                type="button"
                role="tab"
                aria-controls="pills-conseling"
                aria-selected="false"
              >
                Conseling
              </button>
            </li>
            <li className="nav-item flex-sm-fill" role="presentation">
              <button
                className="nav-link btn"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Profile
              </button>
            </li>
          </ul>
          {/* CONTENT */}
          <div className="tab-content p-0 content" id="pills-tabContent">
            {/* diary ✅*/}
            <div
              className="tab-pane fade show active"
              id="pills-diary"
              role="tabpanel"
              aria-labelledby="pills-diary-tab"
            >
              <div className="row justify-content-between">
                <div className="col-md-6">
                  <h2>List Diary</h2>
                  <h5 className="text-secondary">
                    Record the precious moments in your life{" "}
                  </h5>
                </div>
                <div className="col-md-3 text-end">
                  <a className="btn btn-primary" href="/add-diary-conselor">
                    Add New
                  </a>
                </div>
              </div>
              <div className="row  mt-5 justify-content-between">
                {diaries?.map((diary) => {
                  return (
                    <div className="col-md-4 diary-item" key={diary?.id}>
                      <div className="row">
                        <div className="col-md">
                          <img
                            src={"http://127.0.0.1:8000/" + diary?.cover_image}
                            className="img-fluid diary-image"
                            alt=""
                          />
                        </div>
                        <div className="col-md-8">
                          <h4 className="diary-title">{diary?.title}</h4>
                          <h4 className="diary-date">
                            {diary?.created_at
                              ?.split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
                          </h4>
                          <p className="giveMeEllipsis">{diary?.content}</p>

                          <div className="row d-inline ms-0">
                            <button
                              className="btn btn-edit btn-warning"
                              onClick={() => {
                                navigate("/edit-diary-conselor/" + diary?.id);
                              }}
                            >
                              Edit
                            </button>
                            <a
                              href=""
                              className="ms-4 text-decoration-none text-secondary"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteModal"
                            >
                              Delete
                            </a>

                            {/* Modal */}
                            <div
                              className="modal fade"
                              id="deleteModal"
                              tabIndex={-1}
                              aria-labelledby="deleteModal"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="deleteModalLabel"
                                    >
                                      Konfirmasi
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    Are you sure you delete this data?
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary btn-sm"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleDelete(diary.id);
                                      }}
                                      className="btn btn-primary btn-sm"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* courses */}
            <div
              className="tab-pane fade"
              id="pills-course"
              role="tabpanel"
              aria-labelledby="pills-course-tab"
            >
              <div className="row justify-content-between">
                <div className="col-md-6">
                  <h2>List Courses</h2>
                  <h5 className="text-secondary">
                    this is the class you offer
                  </h5>
                </div>
                <div className="col-md-3 text-end">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addCourse"
                  >
                    Add New
                  </button>
                </div>
                {/* modal add course */}
                <div
                  className="modal fade"
                  id="addCourse"
                  tabIndex="-1"
                  aria-labelledby="addCourseLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title" id="addCourseLabel">
                          Add Course
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group mb-3">
                          <label htmlFor="thumbnail">Thumbnail</label>
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => {
                              handleUploadThumbnail(e);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            placeholder="Course Name"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="course_type_id">Course Type</label>
                          <select
                            className="form-select"
                            onChange={(e) => {
                              setCourseTypeId(e.target.value);
                            }}
                            id="course_type_id"
                          >
                            <option value="1">Online Course</option>
                            <option value="2">Counseling</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="price">Price</label>
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="benefit">Benefit</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="benefit1, benefit2"
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              addCourse();
                            }}
                          >
                            Add Course
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal update course */}
                <div
                  className="modal fade"
                  id="updateCourse"
                  tabIndex="-1"
                  aria-labelledby="updateCourseLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title" id="updateCourseLabel">
                          Add Course
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group mb-3">
                          <label htmlFor="thumbnail">Thumbnail</label>
                          <input
                            type="file"
                            className="form-control"
                            defaultValue={thumbnail}
                            onChange={(e) => {
                              handleUploadThumbnail(e);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={title}
                            id="title"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            placeholder="Course Name"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="course_type_id">Course Type</label>
                          <select
                            className="form-select"
                            onChange={(e) => {
                              setCourseTypeId(e.target.value);
                            }}
                            id="course_type_id"
                          >
                            {[1, 2].map((courseType, index) => {
                              return courseType == 1 ? (
                                <option value={index} key={index} selected>
                                  {courseType == 1
                                    ? "Online Course"
                                    : "Counseling"}
                                </option>
                              ) : (
                                <option value={index} key={index}>
                                  {courseType == 1
                                    ? "Online Course"
                                    : "Counseling"}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="price">Price</label>
                          <input
                            type="number"
                            defaultValue={price}
                            className="form-control"
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="benefit">Benefit</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={benefit}
                            placeholder="benefit1, benefit2"
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              updateCourse(course_id);
                            }}
                          >
                            Update Course
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* courses item */}
              <div className="d-flex row justify-content-between mt-5">
                {courses?.map((course) => {
                  return (
                    <div className="col-md-4 diary-item" key={course.id}>
                      <div className="row">
                        <div className="col-md">
                          <img
                            src={
                              course.thumbnail == ""
                                ? "https://source.unsplash.com/random"
                                : "http://127.0.0.1:8000/" + course.thumbnail
                            }
                            className="img-fluid diary-image"
                            alt=""
                          />
                        </div>
                        <div className="col-md-8">
                          <h4
                            className="diary-title fs-5"
                            onClick={() => {
                              window.location.href =
                                "/dashboard-conselor/course/" + course.id;
                            }}
                          >
                            {course.title}
                          </h4>
                          <h3 className="diary-date">
                            {course.created_at
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
                          </h3>
                          <div className="d-flex justify-content-start iconInfo mb-3">
                            <img
                              src={iconPlay}
                              width={15}
                              alt=""
                              className=""
                            />
                            <span
                              href="#"
                              className="text-decoration-none text-secondary ps-2"
                            >
                              {course.detail_course.length}
                            </span>
                          </div>
                          <p className="priceCourse text-primary">
                            <CurrencyFormat
                              value={course.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"IDR. "}
                            />
                          </p>
                          <div className="row d-inline ms-0">
                            <button
                              className="btn btn-edit btn-warning"
                              data-bs-toggle="modal"
                              data-bs-target="#updateCourse"
                              onClick={() => {
                                getDetailCourse(course.id);
                                setCourseId(course.id);
                              }}
                            >
                              Edit
                            </button>
                            <a
                              onClick={() => {
                                swal({
                                  title: "Are you sure?",
                                  text: "Once deleted, you will not be able to recover this imaginary file!",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true,
                                }).then((willDelete) => {
                                  if (willDelete) {
                                    deleteCourse(course.id);
                                  }
                                });
                              }}
                              className="ms-4 text-decoration-none text-secondary"
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* transaction course */}
            <div
              className="tab-pane fade"
              id="pills-transaction"
              role="tabpanel"
              aria-labelledby="pills-transaction-tab"
            >
              <div className="row justify-content-between">
                <div className="col-md-6">
                  <h2>Course Transaction</h2>
                  <h5 className="text-secondary">
                    this is the transaction you made
                  </h5>
                </div>
              </div>
              <div className="table-responsive-md mb-5 mt-5">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Transaction Date</th>
                      <th scope="col">Course Title</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction?.map((trans, index) => {
                      return (
                        <tr key={trans.id}>
                          <td className="align-middle">{index + 1}</td>
                          <td className="align-middle">{trans.user.detail_user.name}</td>
                          <td className="align-middle">
                            {trans.created_at
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
                          </td>
                          <td className="align-middle">{trans.course.title}</td>
                          <td className="text-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-primary btn-small dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Menu
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#detailTransaction"
                                    onClick={() => {
                                      getDetailTransaction(trans.id);
                                    }}
                                  >
                                    Detail
                                  </a>
                                </li>
                                {/* <li><a className="dropdown-item" href="#">Delete</a></li> */}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div
                  className="modal fade"
                  id="detailTransaction"
                  tabIndex="-1"
                  aria-labelledby="detailTransactionLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title" id="detailTransactionLabel">
                          Detail Transaction
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          <span className="font-weight-bold">Buyer:</span>{" "}
                          {
                            detailTransaction?.detail_transaction?.user
                              .detail_user.name
                          }
                        </p>
                        <p>
                          <span className="font-weight-bold">Course:</span>{" "}
                          {detailTransaction?.detail_transaction?.course.title}
                        </p>
                        <p>
                          <span className="font-weight-bold">Total Pay:</span>{" "}
                          <CurrencyFormat
                            value={
                              detailTransaction?.detail_transaction?.total_price
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"IDR "}
                          />
                        </p>
                        {detailTransaction?.status == "PENDING" ? (
                          <button
                            className="btn btn-small btn-warning"
                            onClick={() => {
                              swal({
                                title: "Are you sure?",
                                text: "You will update this transaction status!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  updateTransaction(detailTransaction?.id);
                                }
                              });
                            }}
                          >
                            PENDING
                          </button>
                        ) : (
                          <button className="btn btn-small btn-success">
                            SUCCESS
                          </button>
                        )}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Conseling */}
            <div
              className="tab-pane fade"
              id="pills-conseling"
              role="tabpanel"
              aria-labelledby="pills-conseling-tab"
            >
              <div className="row justify-content-between">
                <div className="col-md-6">
                  <h2>Conseling Transaction</h2>
                  <h5 className="text-secondary">
                    this is the transaction you made
                  </h5>
                </div>
                <div className="col-md-6 text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addConseling"
                  >
                    Add New
                  </button>
                </div>
              </div>
              <div className="row mt-5">
                {/* table */}
                <div className="col-md-12">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Conselor</th>
                        <th scope="col">Price</th>
                        <th scope="col">Start - End</th>
                        <th scope="col">Date</th>
                        <th scope="col">Pay Status</th>
                        <th scope="col">Conseling Status</th>
                        <th scope="col">Invite</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conseling_transaction?.map((transaction, index) => {
                        return (
                          <tr key={transaction?.id}>
                            <th scope="align-middle">{index + 1}</th>
                            <td className="align-middle">
                              {transaction?.user?.name}
                            </td>
                            <td className="align-middle">
                              {
                                <CurrencyFormat
                                  value={transaction?.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"IDR. "}
                                />
                              }
                            </td>
                            <td className="align-middle">
                              {transaction?.start_time
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-") +
                                " - " +
                                transaction?.end_time
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("-")}
                            </td>
                            <td className="align-middle">
                              {transaction?.conseling_date}
                            </td>
                            <td className="align-middle">
                              {transaction?.pay_status == "Success" ? (
                                <span className="text-success">Success</span>
                              ) : (
                                <span className="text-danger">Pending</span>
                              )}
                            </td>
                            <td className="align-middle">
                              {transaction?.conseling_status == "Success" ? (
                                <span className="text-success">Success</span>
                              ) : (
                                <span className="text-danger">Pending</span>
                              )}
                            </td>
                            <td>
                              <div className="btn-group">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-secondary dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Menu
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      data-bs-toggle="modal"
                                      data-bs-target="#updateConseling"
                                      onClick={() => {
                                        getDetailConseling(transaction?.id);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      Update
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      className="dropdown-item"
                                      onClick={() => {
                                        swal({
                                          title: "Are you sure?",
                                          text: "You will delete this conseling transaction!",
                                          icon: "warning",
                                          buttons: true,
                                          dangerMode: true,
                                        }).then((willDelete) => {
                                          if (willDelete) {
                                            deleteConseling(transaction?.id);
                                          }
                                        });
                                      }}
                                    >
                                      Delete
                                    </a>
                                  </li>
                                  <li>
                                    {transaction?.pay_status == "Success" &&
                                    transaction?.conseling_status ==
                                      "Pending" ? (
                                      <a
                                        style={{
                                          cursor: "pointer",
                                        }}
                                        className="dropdown-item"
                                        data-bs-toggle="modal"
                                        data-bs-target="#shareInvitation"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setUserPhone(
                                            transaction?.user?.phone
                                          );
                                        }}
                                      >
                                        Send Invitation
                                      </a>
                                    ) : null}
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* modal share invitation */}
                <div
                  class="modal fade"
                  id="shareInvitation"
                  tabindex="-1"
                  aria-labelledby="shareInvitationLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="shareInvitationLabel">
                          Share Invitation
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <textarea
                          className="form-control"
                          cols="40"
                          rows="10"
                          onChange={(e) => {
                            setMessages(e.target.value);
                          }}
                        ></textarea>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => {
                            shareInvitation();
                          }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* add conseling modal */}
                <div
                  className="modal fade"
                  id="addConseling"
                  tabIndex="-1"
                  aria-labelledby="addConseling"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title" id="addConseling">
                          Add New Schedule
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group mb-3">
                          <label
                            htmlFor="exampleDataList"
                            className="form-label"
                          >
                            Datalist example
                          </label>
                          {/* dynamic datallist */}
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setUserId(e.target.value);
                            }}
                            id="exampleDataList"
                            list="dataList"
                          />
                          <datalist id="dataList">
                            {users?.map((user, index) => {
                              return (
                                <option value={user?.id} key={user?.id}>
                                  {user?.detail_user?.name}
                                </option>
                              );
                            })}
                          </datalist>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Price</label>
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            placeholder="Price"
                            defaultValue={user.price}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Pay Status</label>
                          <select
                            className="form-select"
                            onChange={(e) => {
                              setPayStatus(e.target.value);
                            }}
                          >
                            <option value="Success">Success</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Conseling Status</label>
                          <select
                            className="form-select"
                            onChange={(e) => {
                              setConselingStatus(e.target.value);
                            }}
                          >
                            <option value="Success">Success</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Start Time</label>
                          <input
                            type="time"
                            className="form-control"
                            onChange={(e) => {
                              setStartTime(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">End Time</label>
                          <input
                            type="time"
                            className="form-control"
                            onChange={(e) => {
                              setEndTime(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Conseling Date</label>
                          <input
                            type="date"
                            className="form-control"
                            onChange={(e) => {
                              setConselingDate(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            addConseling();
                          }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* update conseling modal */}
                <div
                  className="modal fade"
                  id="updateConseling"
                  tabIndex="-1"
                  aria-labelledby="updateConseling"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title" id="updateConseling">
                          Update Schedule
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group mb-3">
                          <label
                            htmlFor="exampleDataList"
                            className="form-label"
                          >
                            Datalist example
                          </label>
                          {/* dynamic datallist */}
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            onChange={(e) => {
                              setUserId(e.target.value);
                            }}
                            defaultValue={detail_conseling?.user?.name}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Price</label>
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            placeholder="Price"
                            defaultValue={user.price}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Pay Status</label>
                          <select
                            className="form-select"
                            onChange={(e) => {
                              setPayStatus(e.target.value);
                            }}
                          >
                            {["Success", "Pending"].map((status, index) => {
                              return detail_conseling?.pay_status == status ? (
                                <option value={status} key={index} selected>
                                  {status}
                                </option>
                              ) : (
                                <option value={status} key={index}>
                                  {status}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Conseling Status</label>
                          <select
                            className="form-select"
                            onChange={(e) => {
                              setConselingStatus(e.target.value);
                            }}
                          >
                            {["Success", "Pending"].map((status, index) => {
                              return detail_conseling?.conseling_status ===
                                status ? (
                                <option value={status} key={index} selected>
                                  {status}
                                </option>
                              ) : (
                                <option value={status} key={index}>
                                  {status}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Start Time</label>
                          <input
                            type="time"
                            className="form-control"
                            defaultValue={detail_conseling?.start_time}
                            onChange={(e) => {
                              setStartTime(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">End Time</label>
                          <input
                            type="time"
                            className="form-control"
                            defaultValue={detail_conseling?.end_time}
                            onChange={(e) => {
                              setEndTime(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Conseling Date</label>
                          <input
                            type="date"
                            className="form-control"
                            defaultValue={detail_conseling?.conseling_date}
                            onChange={(e) => {
                              setConselingDate(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            updateConseling(detail_conseling?.id);
                          }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* profile */}
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="row justify-content-between">
                <div className="col-md-6">
                  <h2>Profile</h2>
                  <h5 className="text-secondary">
                    Update your profile information
                  </h5>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-2 me-2">
                  <img
                    src={
                      user?.photo == ""
                        ? "https://www.w3schools.com/howto/img_avatar.png"
                        : `http://127.0.0.1:8000/${user?.photo}`
                    }
                    alt=""
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div className="col-md">
                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="">Photo</label>
                        <input
                          type="file"
                          className="form-control"
                          name="photo"
                          defaultValue={user?.photo}
                          onChange={(e) => {
                            handleuploadPhoto(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          defaultValue={user?.name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="">Gender</label>
                        <select
                          name="gender"
                          className="form-select"
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                          id="gender"
                        >
                          {["L", "P"].map((item, index) => {
                            return item === user?.gender ? (
                              <option key={index} value={item} selected>
                                {item}
                              </option>
                            ) : (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="">Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="birth"
                          onChange={(e) => {
                            setBirth(e.target.value);
                          }}
                          defaultValue={user?.birth}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="">Address</label>
                        <textarea
                          cols="30"
                          rows="10"
                          className="form-control"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          defaultValue={user?.address}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="">Job</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setJob(e.target.value);
                          }}
                          defaultValue={user?.job}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="">Phone</label>
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          defaultValue={user?.phone}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="">Work Address</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setWorkAddress(e.target.value);
                          }}
                          defaultValue={user?.work_address}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="">Practice Address</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setPracticePlaceAddress(e.target.value);
                          }}
                          defaultValue={user?.practice_place_address}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="">Office Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setOfficePhoneNumber(e.target.value);
                        }}
                        defaultValue={user?.office_phone_number}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="">Benefit</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setBenefits(e.target.value);
                        }}
                        defaultValue={user?.benefits}
                      />
                    </div>
                  </div>
                  <div className="row mt-3 mb-5">
                    <div className="col">
                      <label htmlFor="">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => {
                          setConselorPrice(e.target.value);
                        }}
                        defaultValue={user?.price}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="">Credit Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setCreditCardNumber(e.target.value);
                        }}
                        defaultValue={user?.credit_card_number}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col mt-auto text-end">
                      <button
                        className="btn btn-primary m"
                        onClick={() => {
                          updateConselor();
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConselor;
