import React from "react";

function Footer(props) {
    return (
        <footer className="footer mt-auto bg-primary">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-md-5">
                        <h1 className="text-white">SpeakUP</h1>
                        <p>Conseling App</p>

                        <p className="mt-5">We will help you to overcome mental health problems and help you to reach your goals to make your life more meaningful</p>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4 footer-menu">
                        <div className="row">
                            <div className="col-md-4">
                                <h3>Company</h3>
                                <ul>
                                    <li>About</li>
                                    <li>Contact</li>
                                    <li>Careers</li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>Policies</h3>
                                <ul>
                                    <li>Terms</li>
                                    <li>Privacy</li>
                                    <li>Api </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>Contacts</h3>
                                <ul>
                                    <li>+62 812 3568 6798</li>
                                    <li>speakup@gmail.com</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;