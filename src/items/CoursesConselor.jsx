import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import iconPlay from '../assets/icon/light/Play.svg'
import iconUser from '../assets/icon/light/User.svg'
// import { useNavigate } from 'react-router-dom';

const CoursesConselor = (props) => {
    // let navigate = useNavigate();
    return (
        <div className="row  mt-5 justify-content-between">
            <div className="col-md-4 diary-item">
                <div className="row">
                    <div className="col-md">
                        <img src={props.gambar} className="img-fluid diary-image" alt="" />
                    </div>
                    <div className="col-md-8">
                        <h4 className='diary-title'>{props.title}</h4>
                        <h4 className='diary-date'>10 April 22 . 14.00 PM</h4>
                        <div className='d-flex justify-content-start iconInfo mb-3'>
                            <img src={iconPlay} alt="" className='' />
                            <a href="#" className='text-decoration-none text-secondary ps-2'>20 video</a>
                            <img src={iconUser} alt="" className='ps-2' />
                            <a href="#" className='text-decoration-none text-secondary ps-2'>100 users </a>
                        </div>
                        <p className='priceCourse text-primary'>IDR. {props.price}</p>
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
export default CoursesConselor;