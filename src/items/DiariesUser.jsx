import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';

const DiariesUser = (props) => {
    // let navigate = useNavigate();
    return (
     <div className="row  mt-5 justify-content-between">
                                <div className="col-md-4 diary-item">
                                    <div className="row">
                                        <div className="col-md">
                                            <img src={props.gambar} className="img-fluid diary-item" alt="" />
                                        </div>
                                        <div className="col-md-8">
                                            <h4 className='diary-title'>{props.title}</h4>
                                            <h4 className='diary-date'>10 April 22 . 14.00 PM</h4>
                                            <p className='giveMeEllipsis'>Record the precious moments in your life..</p>

                                            <div className="row d-inline ms-0">
                                                <button className='btn btn-edit btn-warning'>Edit</button>
                                                <a href="" className='ms-4 text-decoration-none text-secondary'>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
        )
}
export default DiariesUser;