import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Api from '../../../../../apis/apis';
import Notifications from '../../../../../notifications/notifications';
// import Form from 'react-bootstrap/Form';
import BeautyStars from 'beauty-stars';
const currency = global.config.i18n.currency.AED;

function UserBooking() {
  const [rating, setRating]=useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [bookings, setBookings]=useState(null);
  const [bookingId, setBookingId]=useState(null);

  const [editIndex, setEditIndex]=useState(null);
  const [review, setReview]=useState(null);

  useEffect(async ()=>{
    const userData=JSON.parse(sessionStorage.getItem('auth'));

    const data={
      id: userData.id,
    };

    const res=await Api.getAllBokingsByUserId(data);
    if (res.status == '200') {
      setBookings(res.data);
    }

    // let res1=await Api.getAllCleaners();
    // if (res1.status == '200')
    // {
    //     setCleaner(res1.data);
    //
    // }

    // initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $('#example').DataTable();
      }, 500);
    });
  }, []);

  const history=useHistory();


  async function completeBooking(e) {
    e.preventDefault();

    const data={
      id: bookingId,
      review: rating,
    };

    const res= await Api.reviewAndUpdate(data);

    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      refreshRecord();
      handleClose();
    }
  }


  async function refreshRecord() {
    const userData=JSON.parse(sessionStorage.getItem('auth'));
    console.log(userData);

    const data={
      id: userData.id,
    };

    const res=await Api.getAllBokingsByUserId(data);
    if (res.status == '200') {
      setBookings(res.data);
    }
  }


  function resetForm() {
    setBookingId('');
    // setCleanerId("");
  }


  return (
    <>
      <div className='driver-head'>
        <h3 className='dashboard-head-title'>Bookings</h3>
        <div>
          {/* <div className='nav-buttons'>*/}
          {/*    <button onClick={()=>history.push('/add-cleaner')} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Add Cleaner</button>*/}
          {/* </div>*/}
        </div>
      </div>
      <div className='dashboard-table-wrapper_ p-3' >


        <table id="example" className="table table-hover table-bordered" style={{overFlow: 'auto'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>CAR TYPE</th>
              <th>PLAN</th>
              <th>USER</th>
              <th>Ext Features</th>
              <th>DATE</th>
              <th>TIME</th>
              <th>WASH LEFT</th>
              <th>BRAND</th>
              <th>MODEL</th>
              <th>PLATE</th>
              <th>COLOR</th>
              <th>PARKING#</th>
              <th>PARKING FLOOR</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>CLEANER</th>
              <th>REVIEW</th>
              <th>UPLOADED IMAGES</th>
              {/* <th>PAYMENT</th>*/}
              <th>CREATED</th>
              <th>Action</th>
              {/* <th>Delete</th>*/}
            </tr>
          </thead>
          <tbody>
            {
              bookings?.map((itm, i)=>(
                <tr>
                  <td>{itm.id}</td>
                  <td>{itm.carType}</td>
                  <td>{itm.planId}</td>
                  <td>{itm.userId}</td>
                  <td>
                    {itm.extraFeatures}
                  </td>
                  {/* <td>{itm.comment}</td>*/}
                  <td>{itm.date}</td>
                  <td>{itm.time}</td>
                  <td>{itm.washLeft}</td>
                  <td>{itm.brand}</td>
                  <td>{itm.model}</td>
                  <td>{itm.plate}</td>
                  <td>{itm.color}</td>
                  <td>{itm.parkingNo}</td>
                  <td>{itm.parkingFloor}</td>
                  <td>{currency}{itm.amount}</td>
                  <td style={{color: 'orange'}}>{itm.status}</td>
                  <td>{itm.cleaner}</td>
                  <td>{itm.review}</td>
                  <td>
                    {itm.cleanerImg1?<><a target="_blank" href={itm.cleanerImgLink1} rel="noreferrer">Image 1</a><br/></>:''}
                    {itm.cleanerImg2?<><a target="_blank" href={itm.cleanerImgLink2} rel="noreferrer">Image 2</a><br/></>:''}
                    {itm.cleanerImg3?<><a target="_blank" href={itm.cleanerImgLink3} rel="noreferrer">Image 3</a><br/></>:''}
                  </td>
                  {/* <td>{itm.paymentId}</td>*/}
                  <td>{itm.createdAt}</td>
                  <td>{(itm.status == 'completed')?<button className={'btn btn-primary'} onClick={()=>{
                    setBookingId(itm.id); handleShow();
                  }}>Review</button>:''}</td>
                  {/* <td><i style={{color:"red",cursor:"pointer"}} className={'fas fa-trash'}></i></td>*/}
                </tr>
              ))
            }
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
              <Modal.Title>Review Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label><b>Select Rating (1-5)</b></label>
              <BeautyStars
                value={rating}
                onChange={(value) => setRating( value )}
              />
              <i className={'text-mute'}>Your Rating: {rating}</i>
              {/* <input type={'range'} min={1} max={5} onChange={(e)=>setReview(e.target.value)} className={'form-control'}></input>*/}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                                Close
              </Button>
              <Button type={'submit'} variant="primary">Save</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default UserBooking;
