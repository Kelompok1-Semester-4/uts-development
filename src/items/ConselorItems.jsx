import React from "react";

function ConselorItems(props) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <img src={props.img} className="img-fluid conselor-image" alt="" />
      <h3 className="conselor-name mt-3">{props.name}</h3>
      <p className="conselor-position">{props.position}</p>
    </div>
  );
}

export default ConselorItems;
