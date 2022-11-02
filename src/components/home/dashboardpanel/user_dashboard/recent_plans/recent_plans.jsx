import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";
// import Form from 'react-bootstrap/Form';
import BeautyStars from "beauty-stars";
import StripeCheckout from "react-stripe-checkout";
import checkIcon from "../../../../../assets/images/check.svg";

import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";
const currency = global.config.i18n.currency.AED;

function RecentPlans() {
  const [rating, setRating] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showExtra, setShowExtra] = useState(false);
  const handlecloseExtra = () => setShowExtra(false);
  const handleShowExtra = () => setShowExtra(true);

  const [bookings, setBookings] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [extraFeatures, setExtraFeatures] = useState(null);
  // const [extFeatures, setExtFeatures] = useState([]);
  const [totalWash, setTotalWash] = useState(null);

  const [showBooking, setShowBooking] = useState(false);
  const handleCloseBooking = () => setShowBooking(false);
  const handleShowBooking = () => setShowBooking(true);

  const handleCloseandRedirect = () => {
    handleCloseBooking();
    // window.location.reload();
  };
  const [amount, setAmount] = useState(null);
  useEffect(async () => {
    const userData = JSON.parse(sessionStorage.getItem("auth"));
    // console.log(userData);

    const data = {
      userId: userData ? userData.id : "-1",
    };

    const res = await Api.allRecentPlans(data);
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

  const loadExtraFeature = async () => {
    const res1 = await Api.getAllExtraFeatures();
    if (res1.status == "200") {
      setExtraFeatures(res1.data);
    }
  };

  function addOrRemoveExtFeatures(value, amountValue) {
    // (extFeatures.indexOf(value) > -1)?extFeatures.filter(item => item !== value):setExtFeatures([...extFeatures,value])
    // console.log(extraFeatures);
    if (extFeatures.indexOf(value) > -1) {
      setextFeatures(extFeatures.filter((item, index) => item !== value));
      calculateAmount(amountValue, "minus");
      // console.log(extraFeatures);
    } else {
      // console.log(extraFeatures);
      setextFeatures([...extFeatures, value]);
      calculateAmount(amountValue, "add");
    }
  }

  function calculateAmount(value, fun) {
    // console.log('amount');
    // console.log(amount);
    // console.log(value);
    let total;
    if (fun == "add") {
      total = parseInt(amount) + parseInt(value);
    } else {
      total = parseInt(amount) - parseInt(value);
    }
    setAmount(total);
  }

  function resetAmount() {
    setAmount(0);
  }

  async function completeBooking(e) {
    e.preventDefault();

    const data = {
      id: bookingId,
      review: rating,
    };

    const res = await Api.reviewAndUpdate(data);

    if (res.status == "200") {
      // await Notifications.successMsg(res.message);
      refreshRecord();
      handleClose();
      handleShowBooking();
    }
  }

  async function refreshRecord() {
    const userData = JSON.parse(sessionStorage.getItem("auth"));

    const data = {
      id: userData.id,
    };

    const res = await Api.getAllBokingsByUserId(data);
    if (res.status == "200") {
      setBookings(res.data);
    }
  }

  function resetForm() {
    setBookingId("");
    // setCleanerId("");
  }

  const [carType, setcarType] = useState(null);
  const [packageId, setpackageId] = useState(null);
  const [extFeatures, setextFeatures] = useState([]);
  const [brand, setbrand] = useState(null);
  const [model, setmodel] = useState(null);
  const [plate, setplate] = useState(null);
  const [color, setcolor] = useState(null);
  const [parkingNo, setparkingNo] = useState(null);
  const [parkingFloor, setparkingFloor] = useState(null);

  const onToken = async (token) => {
    const data = {
      token: token,
      carType: carType,
      planId: parseInt(packageId),
      packageType: "monthly",
      userId: parseInt(JSON.parse(sessionStorage.getItem("auth"))?.id),
      extraFeatures: extFeatures,
      date: "",
      bookingType: "monthly",
      amount: amount,
      time: "",
      brand: brand,
      model: model,
      plate: plate,
      color: color,
      parkingNo: parkingNo,
      parkingFloor: parkingFloor,
      usrName: JSON.parse(sessionStorage.getItem("auth"))?.name,
      usrEmail: JSON.parse(sessionStorage.getItem("auth"))?.email,
      usrAddress: JSON.parse(sessionStorage.getItem("auth"))?.address,
      totalWash: totalWash,
      status: "placed",
      couponCode: "",
      commission: "",
      discount: "",
      affiliateId: "",
      linkId: "",
    };

    const res = await axios.post("https://server.ecofriendlycarwash.ae/create-payment", data);
    if (res.status == "200") {
      await Notifications.successMsg("Booking Confirmed");
      window.location.reload();
    } else {
      await Notifications.errorMsg("Something went wrong. Try Again!");
      window.location.reload();
    }
  };

  function setValues(
    carType,
    packageId,
    ext,
    totalWash,
    brand,
    model,
    plate,
    color,
    parkingNo,
    parkingFloor,
    amt
  ) {
    // console.log(extFeatures);

    ext = ext.split(",");
    ext[0] = ext[0].substring(1);
    ext[ext.length - 1] = parseInt(
      ext[ext.length - 1].substring(0, ext[ext.length - 1].length - 1)
    );

    // console.log('ext');
    console.log("passed");
    console.log(ext);

    setextFeatures(ext);
    setcarType(carType);
    setpackageId(packageId);
    setbrand(brand);
    setmodel(model);
    setplate(plate);
    setcolor(color);
    setTotalWash(totalWash);
    setparkingNo(parkingNo);
    setparkingFloor(parkingFloor);

    extraFeatures?.map((itm, i) =>
      extFeatures.includes(itm.id)
        ? console.log("true 1 2 3")
        : console.log("false 1 2 3")
    );

    setAmount(amt);
  }
  return (
    <>
      <div className="driver-head">
        <h3 className="dashboard-head-title">Recent Plan</h3>
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
              <th>Extra Feature</th>
              <th>BRAND</th>
              <th>MODEL</th>
              <th>PLATE</th>
              <th>COLOR</th>
              <th>PARKING#</th>
              <th>PARKING FLOOR</th>
              <th>AMOUNT</th>
              <th>Action</th>
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
                <td>{itm.brand}</td>
                <td>{itm.model}</td>
                <td>{itm.plate}</td>
                <td>{itm.color}</td>
                <td>{itm.parkingNo}</td>
                <td>{itm.parkingFloor}</td>
                <td>
                  {currency}
                  {itm.amount}
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleShow();
                      loadExtraFeature();
                      setValues(
                        itm.carType,
                        itm.planId,
                        itm.extraFeatures,
                        itm.totalWash,
                        itm.brand,
                        itm.model,
                        itm.plate,
                        itm.color,
                        itm.parkingNo,
                        itm.parkingFloor,
                        itm.amount
                      );
                    }}
                    className={"btn btn-primary"}
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {/* <form >*/}
          <Modal.Header closeButton>
            <Modal.Title>Renew Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              <b>Are you sure want to Buy this plan again?</b>
            </label>
            <p className="text-center mt-4 ">
              <Button variant="success" size="sm" onClick={handleShowExtra}>
                add more add on
              </Button>

              <br></br>
              <br></br>
              <StripeCheckout
                name={"Pay " + amount}
                amount={amount * 100} // cents
                currency="AED" // the pop-in header title
                token={onToken}
                stripeKey="pk_test_51LXoKNA82nvbi04Cmtz1dSfDSzwo3cYWyhHL1SqeoWxtMqfEIsA25M9VPayqiAVn6acHmUyHm9UJXTR6WggyOfXZ00AWulYq4G"
              />
              {/* <button onClick={submitForm}>Get</button>*/}
            </p>
            {/* <input type={'range'} min={1} max={5} onChange={(e)=>setReview(e.target.value)} className={'form-control'}></input>*/}
          </Modal.Body>
          <Modal.Footer>
            <h5 className="text-center modal-title w-100">Total : {amount}</h5>
            {/* <Button type={'button'} variant="primary">Save</Button>*/}
            {/* <Button variant="secondary" onClick={handleClose}>
                                Close
            </Button> */}
          </Modal.Footer>
          {/* </form>*/}
        </Modal>

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showExtra}
          onHide={handlecloseExtra}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <h5 className="text-center modal-title w-100">Choose Extras</h5>
          </Modal.Header>
          <Modal.Body>
            <div style={{ marginTop: "4%" }}>
              {/* {console.log(extFeatures)} */}
              {extraFeatures?.map((itm, i) => (
                <div
                  className="container-fluid mt-2"
                  style={{ background: "white" }}
                >
                  <div className="row p-3">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                      <p>
                        {/* {console.log(extFeatures)} */}
                        {/* {console.log('amount')} */}
                        {/* {console.log('itm.id')}
                          {console.log(itm.id)} */}
                          {
                            // extFeatures.includes(itm.id)?console.log('true'):console.log('true')
                          }
                          <input type='checkbox'
                            defaultChecked={extFeatures.includes(itm.id)?true:false}
                            // defaultChecked={extFeatures.includes(itm.id)?true:false}
                            onClick={async ()=>{
                              addOrRemoveExtFeatures(itm.id, itm.price);
                              // calculateAmount(itm.price);
                            //  lateAmount(itm.price);
                          }}
                        />
                      </p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                      <p>{itm.name}</p>
                    </div>
                    {/* <div className='col-xl-3 col-lg-3
                      col-md-3 col-sm-3'>*/}
                    {/*    <p>{itm.time} min</p>*/}
                    {/* </div>*/}
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                      <p>{itm.price} AED</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="success"
              size="sm"
              onClick={(handleShow, handlecloseExtra)}
            >
              Ok
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <h5 className="text-center modal-title w-100">Total : {amount}</h5>
          </Modal.Footer>
        </Modal>
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered={true}
          show={showBooking}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header centered>
            {/* <Modal.Title> */}
            {/* <div class="text-center"> */}
            <h5 className="text-center modal-title w-100">
              Booking Completed!
            </h5>
            {/* </div> */}
            {/* </Modal.Title> */}
            {/* <Button class="lg"  variant="white" >
                       x
                    </Button> */}
            <CloseButton onClick={handleCloseandRedirect} />
          </Modal.Header>
          <Modal.Body centered>
            <div className="text-center">
              <img
                src={checkIcon}
                className="checkIcon"
                alt="Check mark"
                centered
              ></img>
            </div>
            <div className="text-center text-primary">
              <h3>Thanks for choosing us!</h3>
            </div>
            <div className="text-center">Your booking has been Completed.</div>
            {/* <textarea className='form-control' disabled cols={55} rows={10}>{desc}</textarea> */}
          </Modal.Body>
          <Modal.Footer>
            <div className="text-center">
              If you need any clarrification Kindly contact us whatsapp or call
              +971-562871522.
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default RecentPlans;
