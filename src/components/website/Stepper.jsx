import React from "react";
import "./website.css";
import Badge from "react-bootstrap/Badge";

const Stepper = ({ done=0 }) => {
  return (
    <>
      <div className="container-fluid multi-step p-2">
        <div className="row">
          <div className="col-12 multi-links">
            <div className="d-flex flex-column align-items-center">
              <Badge pill bg="primary">
                {done <= 0 ? "1" : <i className="fas fa-check"></i>}
              </Badge>
              <span className="badgeDesc"> Mobile Number</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Badge pill bg="primary">
                {done <= 1 ? "2" : <i className="fas fa-check"></i>}
              </Badge>
              <span className="badgeDesc"> OTP</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Badge pill bg="primary">
                {done <= 2 ? "3" : <i className="fas fa-check"></i>}
              </Badge>
              <span className="badgeDesc"> Vehiche Type</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Badge pill bg="primary">
                {done <= 3 ? "4" : <i className="fas fa-check"></i>}
              </Badge>
              <span className="badgeDesc"> Plan</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Badge pill bg="primary">
                {done <= 4 ? "5" : <i className="fas fa-check"></i>}
              </Badge>
              <span className="badgeDesc"> Add on</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Badge pill bg="primary">
                {done <= 5 ? "6" : <i className="fas fa-check"></i>}
              </Badge>
              <span className="badgeDesc"> Confirm</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
