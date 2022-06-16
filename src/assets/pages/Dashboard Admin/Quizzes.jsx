import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Header from "../Dashboard User/partials/Header";

const Quizzes = () => {

    const { id } = useParams();
    const [quiz, setQuiz] = useState({});
    // form field
    const [title, setTitle] = useState("");
    const [question1, setQuestion1] = useState("");
    const [question2, setQuestion2] = useState("");
    const [question3, setQuestion3] = useState("");
    const [question4, setQuestion4] = useState("");
    const [question_id, setQuestion_id] = useState("");

    // get quiz
    useState(() => {
        axios.get(`http://127.0.0.1:8000/api/detail-quiz/${id}`)
            .then(res => {
                setQuiz(res.data.data);
                setTitle(res.data.data.title);
                setQuestion1(res.data.data.question1);
                setQuestion2(res.data.data.question2);
                setQuestion3(res.data.data.question3);
                setQuestion4(res.data.data.question4);
                setQuestion_id(res.data.data.question_id);
            })
    }, []);

    const resetField = () => {
        setTitle("");
        setQuestion1("");
        setQuestion2("");
        setQuestion3("");
        setQuestion4("");
        setQuestion_id("");
    }

    const addQuiz = async () => {
        const data = new FormData();
        data.append("title", title);
        data.append("quiz_id", id);
        data.append("question1", question1);
        data.append("question2", question2);
        data.append("question3", question3);
        data.append("question4", question4);

        await fetch('http://127.0.0.1:8000/api/detail-quiz/store', {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.meta.code == 200) {
                    swal("Success!", "Quiz has been added!", "success").then(() => {
                        window.location.reload();
                    })
                } else {
                    swal("Error!", data.data, "error");
                }
            })
    }

    const deleteQuiz = async (quiz_id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/detail-quiz/${quiz_id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            swal("Success!", "Quiz has been deleted!", "success").then(() => {
                // reload page
                window.location.reload();
                // clear form
                setTitle("");
                setQuestion1("");
                setQuestion2("");
                setQuestion3("");
                setQuestion4("");
            });
        } catch (error) {
            swal("Error", error, "error");
        }
    }

    const getQuestion = (question_id) => {
        try {
            axios.get(`http://127.0.0.1:8000/api/detail-question/${question_id}`)
                .then(res => {
                    setTitle(res.data.data.title);
                    setQuestion1(res.data.data.question1);
                    setQuestion2(res.data.data.question2);
                    setQuestion3(res.data.data.question3);
                    setQuestion4(res.data.data.question4);
                    setQuestion_id(res.data.data.id);
                    // console.log(question_id);
                });
        } catch (error) {
            swal("Error", error, "error");
        }
    }

    const updateQuiz = async (quiz_id) => {
        const data = new FormData();
        data.append("title", title);
        data.append("quiz_id", id);
        data.append("question1", question1);
        data.append("question2", question2);
        data.append("question3", question3);
        data.append("question4", question4);
        try {
            await axios.post(`http://127.0.0.1:8000/api/detail-quiz/update/${quiz_id}`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            swal("Success!", "Quiz has been updated!", "success").then(() => {
                // reload page
                window.location.reload();
                // reset form
                setTitle("");
                setQuestion1("");
                setQuestion2("");
                setQuestion3("");
                setQuestion4("");
            });
        } catch (error) {
            swal("Error", error, "error");
        }
    }

    return (
        <div className="dashboard">
            <Header photo='https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg' />

            <div className="container mt-5">
                <div className="row justify-content-between mb-5">
                    <div className="col-md-6">
                        <h2>{quiz?.title}</h2>
                        <h5 className="text-secondary">
                            Your Quiz
                        </h5>
                    </div>
                    <div className="col-md-6 text-end">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addQuestion">Add Questions</button>
                    </div>
                    <div className="modal fade" id="addQuestion" tabIndex="-1" aria-labelledby="addQuestionLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="addQuestionLabel">Add Question</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group mb-3">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" className="form-control" id="title" placeholder="Enter title" onChange={(e) => {
                                            setTitle(e.target.value)
                                        }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="question1">Answer 1</label>
                                        <input type="text" className="form-control" id="question1" placeholder="Enter question" onChange={(e) => {
                                            setQuestion1(e.target.value)
                                        }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="question2">Answer 2</label>
                                        <input type="text" className="form-control" id="question2" placeholder="Enter question" onChange={(e) => {
                                            setQuestion2(e.target.value)
                                        }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="question3">Answer 3</label>
                                        <input type="text" className="form-control" id="question3" placeholder="Enter question" onChange={(e) => {
                                            setQuestion3(e.target.value)
                                        }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="question4">Answer 4</label>
                                        <input type="text" className="form-control" id="question4" placeholder="Enter question" onChange={(e) => {
                                            setQuestion4(e.target.value)
                                        }} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={addQuiz}>Add Question</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Question</th>
                                <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                quiz?.detail_quiz?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <b>{item.title}</b>
                                                <ol type="A">
                                                    {item.question1 == '' || item.question1 == 'undefined' || item.question1 == null ? null : <li>{item.question1}</li>}
                                                    {item.question2 == '' || item.question2 == 'undefined' || item.question2 == null ? null : <li>{item.question2}</li>}
                                                    {item.question3 == '' || item.question3 == 'undefined' || item.question3 == null ? null : <li>{item.question3}</li>}
                                                    {item.question4 == '' || item.question4 == 'undefined' || item.question4 == null ? null : <li>{item.question4}</li>}
                                                </ol>
                                            </td>
                                            <td className="text-end" >
                                                <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#updateQuestion" onClick={() => {
                                                    getQuestion(item.id)
                                                }}>Edit</button>
                                                &nbsp;&nbsp;
                                                <button className="btn btn-danger btn-sm" onClick={
                                                    () => {
                                                        swal({
                                                            title: "Are you sure?",
                                                            text: "Once deleted, you will not be able to recover this imaginary file!",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                        })
                                                            .then((willDelete) => {
                                                                if (willDelete) {
                                                                    deleteQuiz(item.id)
                                                                }
                                                            }
                                                            )
                                                    }
                                                }>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="updateQuestion" tabIndex="-1" aria-labelledby="updateQuestionLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="updateQuestionLabel">Add Question</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" defaultValue={title} id="title" placeholder="Enter title" onChange={(e) => {
                                        setTitle(e.target.value)
                                    }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="question1">Answer 1</label>
                                    <input type="text" className="form-control" defaultValue={question1} id="question1" placeholder="Enter question" onChange={(e) => {
                                        setQuestion1(e.target.value)
                                    }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="question2">Answer 2</label>
                                    <input type="text" className="form-control" id="question2" defaultValue={question2} placeholder="Enter question" onChange={(e) => {
                                        setQuestion2(e.target.value)
                                    }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="question3">Answer 3</label>
                                    <input type="text" className="form-control" defaultValue={question3} id="question3" placeholder="Enter question" onChange={(e) => {
                                        setQuestion3(e.target.value)
                                    }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="question4">Answer 4</label>
                                    <input type="text" className="form-control" defaultValue={question4} id="question4" placeholder="Enter question" onChange={(e) => {
                                        setQuestion4(e.target.value)
                                    }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onChange={() => {
                                    setTitle("");
                                    setQuestion1("");
                                    setQuestion2("");
                                    setQuestion3("");
                                    setQuestion4("");
                                }}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    updateQuiz(question_id)
                                }}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Quizzes;