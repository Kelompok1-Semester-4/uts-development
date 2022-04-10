import React from "react";

export default function Faq(props) {
    return (
        <div className="container faq">
            {/* FAQ */}
            <div className="row faq-list justify-content-center">
                <div className="col-md-6 text-center col-sm faq-header">
                    <h1 className="d-inline-block">Frequently Asked Questions</h1>
                    <p className="text-secondary mt-3">
                        We have a wide network of relationships so that we can meet the
                        various needs of our customers and partners.
                    </p>
                </div>
            </div>

            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        <h2 className="accordion-header" id="headingOne">
                            Why are mental health issues still taboo in Indonesia?
                        </h2>
                    </button>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is
                            shown by default, until the collapse plugin adds the appropriate
                            classes that we use to style each element. These classes control
                            the overall appearance, as well as the showing and hiding via
                            CSS transitions. You can modify any of this with custom CSS or
                            overriding our default variables. It's also worth noting that
                            just about any HTML can go within the{" "}
                            <code>.accordion-body</code>, though the transition does limit
                            overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                    >
                        <h2 className="accordion-header" id="headingTwo">
                            What are the things that determine the success of cooperatives?
                        </h2>
                    </button>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is
                            shown by default, until the collapse plugin adds the appropriate
                            classes that we use to style each element. These classes control
                            the overall appearance, as well as the showing and hiding via
                            CSS transitions. You can modify any of this with custom CSS or
                            overriding our default variables. It's also worth noting that
                            just about any HTML can go within the{" "}
                            <code>.accordion-body</code>, though the transition does limit
                            overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                    >
                        <h2 className="accordion-header" id="headingThree">
                            What are the things that determine the success of cooperatives?
                        </h2>
                    </button>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is
                            shown by default, until the collapse plugin adds the appropriate
                            classes that we use to style each element. These classes control
                            the overall appearance, as well as the showing and hiding via
                            CSS transitions. You can modify any of this with custom CSS or
                            overriding our default variables. It's also worth noting that
                            just about any HTML can go within the{" "}
                            <code>.accordion-body</code>, though the transition does limit
                            overflow.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}