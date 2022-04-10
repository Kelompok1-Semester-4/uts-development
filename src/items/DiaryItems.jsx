import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const DiaryItems = (props) => {
    let navigate = useNavigate();
    return (
        <div className="col-md-3 col-sm-6 my-3">
            <img src={props.gambar} className="diary-item" alt="" />

            <h3 className="diary-title">{props.title}</h3>
            <p className="diary-body giveMeEllipsis">These findings suggest certain types of music can help boost memorization abilities and other cognitive functions ...</p>

            <div className="row mt-4 d-flex align-items-end">
                <div className="col-md-4 d-flex diary-info">
                    <span className="d-inline-block text-truncate" style={{ maxWidth: 80 }}>{props.nama}</span>
                    <p className="created-at">22 April 2022</p>
                </div>
                <div className="col text-end">
                    <button className="btn btn-primary btn-sm" onClick={() => {
                        navigate(`/diaries/${props.id}`);
                    }}>Read</button>
                </div>
            </div>
        </div>
    )
}
export default DiaryItems;