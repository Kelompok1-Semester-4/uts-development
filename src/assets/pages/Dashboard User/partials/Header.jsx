import React from "react";

import Brand from '../../../images/speakup.jpg';

const Header = (props) => {

    // logout with delete local storage
    const logout = () => {
        localStorage.removeItem('token');
        document.location.href = '/';
    }

    return (
        <header className="p-3 mb-3 my-navbar">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        <img src={Brand} width={146} height={64} alt="" />
                    </a>

                    <div className="dropdown text-end ms-auto">
                        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={props.photo} alt="mdo" width="32" height="32" className="rounded-circle" />
                        </a>

                        <ul className="dropdown-menu text-small mt-2" aria-labelledby="dropdownUser1">
                            <li><a className="dropdown-item" onClick={() => {
                                logout();
                            }}>Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;