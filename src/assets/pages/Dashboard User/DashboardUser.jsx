import React from 'react';
import Brand from '../../images/speakup.jpg';

import icon_info from '../../images/icon_info.svg';

const DashboardUser = () => {
    return (
        <div className='dashboard'>
            {/* HEADER */}
            <header className="p-3 mb-3 my-navbar">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                            <img src={Brand} width={146} height={64} alt="" />
                        </a>

                        <div className="dropdown text-end ms-auto">
                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>

                            <ul className="dropdown-menu text-small mt-2" aria-labelledby="dropdownUser1">
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            {/* MENU */}
            <div className="container">
                <div className="row justify-content-center menu">
                    <ul className="nav nav-pills mb-3 flex-column flex-sm-row nav-justified dashboard-tab" id="pills-tab" role="tablist">
                        <li className="nav-item me-4 flex-sm-fill" role="presentation">
                            <button className="nav-link btn active" id="pills-diary-tab" data-bs-toggle="pill" data-bs-target="#pills-diary" type="button" role="tab" aria-controls="pills-diary" aria-selected="true">Diaries</button>
                        </li>
                        <li className="nav-item me-4 flex-sm-fill" role="presentation">
                            <button className="nav-link btn" id="pills-class-tab" data-bs-toggle="pill" data-bs-target="#pills-class" type="button" role="tab" aria-controls="pills-class" aria-selected="false">Your Class</button>
                        </li>
                        <li className="nav-item me-4 flex-sm-fill" role="presentation">
                            <button className="nav-link btn" id="pills-transaction-tab" data-bs-toggle="pill" data-bs-target="#pills-transaction" type="button" role="tab" aria-controls="pills-transaction" aria-selected="false">Transaction</button>
                        </li>
                        <li className="nav-item flex-sm-fill" role="presentation">
                            <button className="nav-link btn" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                        </li>
                    </ul>

                    {/* CONTENT */}
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show" id="pills-diary" role="tabpanel" aria-labelledby="pills-diary-tab">
                            <h1>Diary</h1>
                        </div>
                        <div className="tab-pane fade" id="pills-class" role="tabpanel" aria-labelledby="pills-class-tab">
                            <h1>Your Class</h1>
                        </div>
                        <div className="tab-pane fade" id="pills-transaction" role="tabpanel" aria-labelledby="pills-transaction-tab">
                            <h1>Transaction</h1>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <h1>profile</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardUser;