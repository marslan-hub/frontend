/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";
const currency = global.config.i18n.currency.AED;

import Map from "../../../../Map";

function CleanerTask() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loadingBtn,setLoadingBtn]=useState(false)

  const [bookings, setBookings] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const [editIndex, setEditIndex] = useState(null);
  const [images, setImages] = useState(null);

  // For map View
  const [MapModal, setMapModal] = useState(false);
  const [UserLocation, setUserLocation] = useState({});

  const ViewMapModal = (data) => {
    setMapModal(true);
    setUserLocation(JSON.parse(data));
  };

  const MapModalClose = () => setMapModal(false);

  useEffect(async () => {
    const userData = JSON.parse(sessionStorage.getItem("auth"));

    const data = {
      id: userData.id,
    };

    const res = await Api.allBookingsByCleanerId(data);
    if (res.status == "200") {
      setBookings(res.data);
    }

    // let res1=await Api.getAllCleaners();
    // if (res1.status == '200')
    // {
    //     setCleaner(res1.data);
    //
    // }

    // initialize datatable
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").DataTable();
      }, 500);
    });
  }, []);

  const history = useHistory();

  async function completeBooking(e) {
    e.preventDefault();
    setLoadingBtn(true)

    console.log(images.length);

    if (images.length > 3) {
      await Notifications.errorMsg("You cannot upload more than 3 file");
      return;
    } else {
      for (let i = 0; i < images.length; i++) {
        if (i == 0) {
          const data = new FormData();
          console.log(images[i]);
          data.append("id", bookingId); // append the values with key, value pair
          data.append("image", images[i]);

          const res = await Api.saveCleanerImage1(data);

          if (res.status == "200") {
            console.log(res.message);
          }
        } else if (i == 1) {
          const data = new FormData();
          console.log(images[i]);
          data.append("id", bookingId); // append the values with key, value pair
          data.append("image", images[i]);

          const res = await Api.saveCleanerImage2(data);

          if (res.status == "200") {
            console.log(res.message);
          }
        } else {
          const data = new FormData();
          console.log(images[i]);
          data.append("id", bookingId); // append the values with key, value pair
          data.append("image", images[i]);

          const res = await Api.saveCleanerImage3(data);

          if (res.status == "200") {
            console.log(res.message);
          }
        }
      }

      const data = {
        id: bookingId,
      };

      const res = await Api.completeCleanerTask(data);
      setLoadingBtn(false)

      if (res.status == "200") {

        await Notifications.successMsg(res.message);
        history.push("/cleaner-tasks");
      } else {

        await Notifications.errorMsg(res.message);
      }
      handleClose();
      await refreshRecord();
      resetForm();
    }
  }

  async function refreshRecord() {
    const userData = JSON.parse(sessionStorage.getItem("auth"));
    console.log(userData);

    const data = {
      id: userData.id,
    };

    const res = await Api.allBookingsByCleanerId(data);
    if (res.status == "200") {
      setBookings(res.data);
    }
  }

  function resetForm() {
    setBookingId("");
    // setCleanerId("");
  }

  return (
    <>
      <div className="driver-head">
        <h3 className="dashboard-head-title">Bookings</h3>
        <div>
          {/* <div className='nav-buttons'>*/}
          {/*    <button onClick={()=>history.push('/add-cleaner')} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Add Cleaner</button>*/}
          {/* </div>*/}
        </div>
      </div>
      <div className="dashboard-table-wrapper_ p-3">
        <table
          id="example"
          className="table table-hover table-bordered"
          style={{ overFlow: "auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>CAR TYPE</th>
              <th>PLAN</th>
              <th>USER</th>
              <th>Ext Features</th>
              <th>DATE</th>
              <th>TIME</th>
              <th>BRAND</th>
              <th>MODEL</th>
              <th>PLATE</th>
              <th>COLOR</th>
              <th>PARKING#</th>
              <th>PARKING FLOOR</th>
              <th>LOCATION</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              {/* <th>CLEANER</th> */}
              <th>REVIEW</th>
              {/* <th>PAYMENT</th>*/}
              <th>CREATED</th>
              <th>Action</th>
              {/* <th>Delete</th>*/}
            </tr>
          </thead>
          <tbody>
            {bookings?.map((itm, i) => (
              <tr>
                <td>{itm.id}</td>
                <td>{itm.carType}</td>
                <td>{itm.planId}</td>
                <td>{itm.userId}</td>
                <td>{itm.extraFeatures}</td>
                {/* <td>{itm.comment}</td>*/}
                <td>{itm.date}</td>
                <td>{itm.time}</td>
                <td>{itm.brand}</td>
                <td>{itm.model}</td>
                <td>{itm.plate}</td>
                <td>{itm.color}</td>
                <td>{itm.parkingNo}</td>
                <td>{itm.parkingFloor}</td>
                <td>
                  {itm.booking_location == "" ? "N/A" : <Button
                    onClick={() => {
                      ViewMapModal(itm.booking_location);
                    }}
                  >
                    <i className="fas fa-eye"></i> View
                  </Button>}

                </td>
                <td>
                  {currency}
                  {itm.amount}
                </td>
                <td style={{ color: "orange" }}>{itm.status}</td>
                {/* <td>
                  {itm.assignCleaner ? (
                    itm.assignCleaner
                  ) : (
                    <button
                      onClick={() => {
                        setEditIndex(itm.id);
                        handleShow();
                      }}
                      className={"btn btn-primary"}
                    >
                      Assign
                    </button>
                  )}
                </td> */}
                <td></td>
                {/* <td>{itm.paymentId}</td>*/}
                <td>{itm.createdAt}</td>
                <td
                >
                  {itm.status == "completed" || itm.status == "reviewed" ? (
                    ""
                  ) : (
                    <button className={"btn btn-primary"} 
                    onClick={() => {
                      setBookingId(itm.id);
                      handleShow();
                    }}>Complete</button>
                  )}
                </td>
                {/* <td><i style={{color:"red",cursor:"pointer"}} className={'fas fa-trash'}></i></td>*/}
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={completeBooking}>
            <Modal.Header closeButton>
              <Modal.Title>Complete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>
                <b>Upload Images (Max 3)</b>
              </label>
              <input
                onChange={(e) => {
                  setImages(e.target.files);
                }}
                required
                className={"form-control"}
                type={"file"}
                multiple
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {loadingBtn? <button className="btn btn-primary px-4">
                <div className="spinner-border spinner-border-sm mx-2"></div>
              </button> : <Button type={"submit"} variant="primary">
                Save
              </Button>}

            </Modal.Footer>
          </form>
        </Modal>

        {/* Map View MOdal */}
        <Modal
          size="lg"
          show={MapModal}
          onHide={MapModalClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Booking Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="container"
              style={{
                width: "100%",
                height: "400px",
                position: "relative",
              }}
            >
              <Map location={[UserLocation]} />
            </div>

          </Modal.Body>
          <Modal.Footer bsPrefix={"modal-footer d-flex justify-content-between"}>
              <div>
                <a target={"_blank"} className={"btn btn-primary"}  href={`https://maps.google.com?q=${UserLocation.lat},${UserLocation.lng}`}><i
                    className="fas fa-location-arrow"></i> View Direction</a>
              </div>
              <div> <Button variant="secondary" onClick={MapModalClose}>
                Close
              </Button>
                <Button type={"submit"} variant="primary">
                  Save
                </Button>
              </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default CleanerTask;
