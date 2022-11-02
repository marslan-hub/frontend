import React, {useState, useEffect} from 'react';
import add from '../../../../assets/images/add.png';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Api from '../../../../apis/apis';
import Notifications from '../../../../notifications/notifications';
import Accordion from 'react-bootstrap/Accordion';
import Map from '../../../Map';
import Table from 'react-bootstrap/Table';

const currency = global.config.i18n.currency.AED;

function Booking() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [ModalData, setModalData] = useState({
    id: '',
    oldDate: '',
    newDate: '',
  });
  const [newDateModal, setNewDateModal] = useState(false);
  const dateModalClose = () => setNewDateModal(false);
  const dateModalShow = () => setNewDateModal(true);

  const [bookings, setBookings] = useState(null);
  const [bookingsDates, setBookingsDates] = useState(null);
  const [cleaner, setCleaner] = useState(null);
  const [slot, setSlot] = useState(null);

  const [editIndex, setEditIndex] = useState(null);
  const [cleanerId, setCleanerId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // For map View
  const [MapModal, setMapModal] = useState(false);
  const [UserLocation, setUserLocation] = useState({});
  const [openDate, setOpenedDate] = useState(null);
  const [LoadBooking, setLoadingBooking] = useState(null);

  const ViewMapModal = (data) => {
    setMapModal(true);
    setUserLocation(JSON.parse(data));
  };

  const getBookingByDate = async (date) => {
    if (openDate!=date) {
      setOpenedDate(date);
      const data={
        date: date,
      };
      const res = await Api.getAllBookingsByDate(data);
      if (res.status == '200') {
        setBookings(res.data);
      }
    } else {
      setOpenedDate(null);
    }
    // setTimeout(function() {
    //   $('.example').DataTable();
    // }, 500);
  };

  const MapModalClose = () => setMapModal(false);

  useEffect(async () => {
    const res2 = await Api.getAllSlots();
    if (res2.status == '200') {
      setSlot(res2.data);
    }

    const resB = await Api.getAllBookingAcrd();
    if (resB.status == '200') {
      setBookingsDates(resB.data);
    }

    const res1 = await Api.getAllCleaners();
    if (res1.status == '200') {
      setCleaner(res1.data);
    }

    // initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $('.example').DataTable();
      }, 500);
    });
  }, []);

  const history = useHistory();
  async function assignTimeSlot(e) {
    e.preventDefault();
    const data = {
      time: selectedSlot,
      bookingId: bookingId,
      table: 'booking',
    };
    const res = await Api.assignTimeToBooking(data);

    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      handleClose1();
      await refreshRecord();
    }
  }

  async function assignCleaner(e) {
    e.preventDefault();

    const data = {
      id: editIndex,
      cleanerId: cleanerId,
    };

    const res = await Api.adminAssignBooking(data);

    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      history.push('/booking');
    } else {
      await Notifications.errorMsg(res.message);
    }
    handleClose();
    await refreshWindow();
    resetForm();
  }

  async function refreshWindow() {
    window.location.reload();
    }

  async function refreshRecord() {
    let data ={
      time :openDate,
    }
    const res = Api.getAllBookingsByDate(data);
    if (res.status == '200') {
      setBookings(res.data);
    }
  }

  function resetForm() {
    setEditIndex('');
    setCleanerId('');
  }

  const EditDataModal = (item) => {
    console.log('item', item);
    setModalData((oldData) => {
      return {
        ...oldData,
        oldDate: item.date,
        id: item.id,
      };
    });
    dateModalShow();
  };

  const updateDate = async (e) => {
    e.preventDefault();

    const res = await Api.updateMonthlyWashDate(ModalData);

    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      dateModalClose();
      setModalData({});
      window.location.reload();

    } else {
      await Notifications.errorMsg('Error in Updating Wash Date');
      dateModalClose();
      setModalData({});
    }
  };

  return (
    <>
      <div className="driver-head">
        <h3 className="dashboard-head-title">Bookings</h3>

      </div>
      <div className="dashboard-table-wrapper_ p-3">
        <Accordion>
          {bookingsDates?.map((itm, i) => (
          // console.log("itm.createdAt")

            <Accordion.Item key={i} onClick={() =>{
              setLoadingBooking(i);
              getBookingByDate(itm.BookingDate);
            }} eventKey={i}>
              <Accordion.Header>{itm.BookingDate}</Accordion.Header>
              <Accordion.Body>
                {LoadBooking==i?
                    <div className="table-responsive">
                      <Table
                          id={itm.BookingDate+'example'}
                          className="example table table-hover table-bordered"
                      >
                        <thead>
                        <tr>
                          <th>ID</th>
                          <th>CAR TYPE</th>
                          <th>PLAN</th>
                          <th>USER</th>
                          <th>Ext Features</th>
                          <th>Booking</th>
                          <th>Wash</th>
                          <th>DATE</th>
                          <th>TIME</th>
                          <th>BRAND</th>
                          <th>MODEL</th>
                          <th>PLATE</th>
                          <th>COLOR</th>
                          <th>PARKING#</th>
                          <th>PARKING FLOOR</th>
                          <th>Location</th>

                          <th>AMOUNT</th>
                          <th>STATUS</th>
                          <th>CLEANER</th>
                          <th>UPLOADED IMAGES</th>
                          <th>REVIEW</th>
                          {/* <th>PAYMENT</th>*/}
                          <th>CREATED</th>
                          {/* <th>Edit</th>*/}
                          {/* <th>Delete</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {bookings?.map((itm, i) => (
                            <tr>
                              <td>{i + 1}{itm.id}</td>
                              <td>{itm.carType}</td>
                              <td>{itm.planId}</td>
                              <td>{itm.userId}</td>
                              <td>{itm.extraFeatures}</td>
                              <td>{itm.bookingType}</td>
                              <td>
                                {itm.washLeft}/{itm.totalWash}
                              </td>
                              <td>
                                {itm.date}{' '}
                                <i
                                    className="fas fa-edit"
                                    onClick={() => {
                                      EditDataModal(itm);
                                    }}
                                ></i>
                              </td>
                              <td>
                                {itm.time ? (
                                    itm.time
                                ) : (
                                    <button
                                        onClick={() => {
                                          setBookingId(itm.id);
                                          handleShow1();
                                        }}
                                        className={'btn btn-primary'}
                                    >
                                      Assign
                                    </button>
                                )}
                              </td>
                              <td>{itm.brand}</td>
                              <td>{itm.model}</td>
                              <td>{itm.plate}</td>
                              <td>{itm.color}</td>
                              <td>{itm.parkingNo}</td>
                              <td>{itm.parkingFloor}</td>
                              <td>
                                {itm.booking_location == '' ? (
                                    'N/A'
                                ) : (
                                    <Button
                                        onClick={() => {
                                          ViewMapModal(itm.booking_location);
                                        }}
                                    >
                                      <i className="fas fa-eye"></i> View
                                    </Button>
                                )}
                              </td>

                              <td>
                                {currency}
                                {itm.amount}
                              </td>
                              <td style={{color: 'orange'}}>{itm.status}</td>
                              <td>
                                {itm.assignCleaner ? (
                                    itm.assignCleaner
                                ) : (
                                    <button
                                        onClick={() => {
                                          setEditIndex(itm.id);
                                          handleShow();
                                        }}
                                        className={'btn btn-primary'}
                                    >
                                      Assign
                                    </button>
                                )}
                              </td>
                              <td>
                                {itm.cleanerImg1 ? (
                                    <>
                                      <a
                                          target="_blank"
                                          href={itm.cleanerImgLink1}
                                          rel="noreferrer"
                                      >
                                        Image 1
                                      </a>
                                      <br />
                                    </>
                                ) : (
                                    ''
                                )}
                                {itm.cleanerImg2 ? (
                                    <>
                                      <a
                                          target="_blank"
                                          href={itm.cleanerImgLink2}
                                          rel="noreferrer"
                                      >
                                        Image 2
                                      </a>
                                      <br />
                                    </>
                                ) : (
                                    ''
                                )}
                                {itm.cleanerImg3 ? (
                                    <>
                                      <a
                                          target="_blank"
                                          href={itm.cleanerImgLink3}
                                          rel="noreferrer"
                                      >
                                        Image 3
                                      </a>
                                      <br />
                                    </>
                                ) : (
                                    ''
                                )}
                              </td>
                              <td></td>
                              {/* <td>{itm.paymentId}</td>*/}
                              <td>{itm.createdAt}</td>
                              {/* <td onClick={}><i style={{color:"green",cursor:"pointer"}} className={'fas fa-pen'}></i></td>*/}
                              {/* <td>*/}
                              {/*  <i*/}
                              {/*    style={{ color: "red", cursor: "pointer" }}*/}
                              {/*    className={"fas fa-trash"}*/}
                              {/*  ></i>*/}
                              {/* </td>*/}
                            </tr>
                        ))}
                        </tbody>
                      </Table>
                    </div>:''}
              </Accordion.Body>
            </Accordion.Item>

          ),
          )}
        </Accordion>


        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={assignCleaner}>
            <Modal.Header closeButton>
              <Modal.Title>Assign Cleaner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Select Cleaner</label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setCleanerId(e.target.value);
                }}
              >
                <option>Open this select menu</option>
                {cleaner?.map((itm, i) => (
                  <option value={itm.id}>{itm.name}</option>
                ))}
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type={'submit'} variant="primary">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={assignTimeSlot}>
            <Modal.Header closeButton>
              <Modal.Title>Assign Time Slot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Select Time SLot</label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectedSlot(e.target.value);
                }}
              >
                <option>Open this select menu</option>
                {slot?.map((itm, i) => (
                  <option value={itm.time}>{itm.time}</option>
                ))}
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
              <Button type={'submit'} variant="primary">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* date Edit modal */}
        <Modal
          show={newDateModal}
          onHide={dateModalClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={updateDate}>
            <Modal.Header closeButton>
              <Modal.Title>Assign New Date</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Old Date</Form.Label>
                <Form.Control type="date" value={ModalData.oldDate} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Assign Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Choose a Date"
                  onChange={(e) => {
                    setModalData((old) => {
                      return {
                        ...old,
                        newDate: e.target.value,
                      };
                    });
                  }}
                  value={ModalData.newDate}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={dateModalClose}>
                Close
              </Button>
              <Button type={'submit'} variant="primary">
                Save
              </Button>
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
                width: '100%',
                height: '400px',
                position: 'relative',
              }}
            >
              <Map location={[UserLocation]} />
            </div>


          </Modal.Body>
          <Modal.Footer bsPrefix={'modal-footer d-flex justify-content-between'}>

            <div>
              <a target={'_blank'} className={'btn btn-primary'} href={`https://maps.google.com?q=${UserLocation.lat},${UserLocation.lng}`} rel="noreferrer"><i
                className="fas fa-location-arrow"></i> View Direction</a>
            </div>
            <div>
              <Button variant="secondary" onClick={MapModalClose}>
                Close
              </Button>
              <Button type={'submit'} variant="primary">
                  Save
              </Button>
            </div>


          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Booking;
