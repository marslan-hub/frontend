import React, {useState, useEffect} from 'react';
import './website.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import {Link, useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Api from '../../apis/apis';
import Notifications from '../../notifications/notifications';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import checkIcon from '../../assets/images/check.svg';

import InputGroup from 'react-bootstrap/InputGroup';
import AboutUs from '../otherpages/AboutUs';
import Map from '../Map';
import validator from 'validator';
import Stepper from './Stepper';


import {useDispatch, useSelector} from 'react-redux';

function Website() {
  const MapReducers = useSelector((res) => res);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [desc, setDesc] = useState(null);
  const [usr, setUsr] = useState(null);
  const [slots, setSlots] = useState(null);
  const [codeStatus, setCodeStatus] = useState(null);
  const [show, setShow] = useState(false);

  const [showBooking, setShowBooking] = useState(false);
  const handleCloseBooking = () => setShowBooking(false);
  const handleShowBooking = () => setShowBooking(true);

  const [showMobileScreen, setShowMobileScreen] = useState(true);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showCarScreen, setShowCarScreen] = useState(false);
  const [showPackagesTypeScreen, setShowPackagesTypeScreen] = useState(false);
  const [showMonthlySubPackage, setshowMonthlySubPackage] = useState(false);
  const [showPackagesScreen, setShowPackagesScreen] = useState(false);
  const [showExtraScreen, setShowExtraScreen] = useState(false);
  const [showBookingScreen, setShowBookingScreen] = useState(false);
  const check = JSON.parse(sessionStorage.getItem('auth')) ? true : false;
  const [checkAuth, setCheckAuth] = useState(check);
  const [couponApplied, setCouponApplied] = useState(false);
  const [packages, setPackages] = useState(null);
  const [extraFeatures, setExtraFeatures] = useState(null);
  const [userDiscount, setUserDiscount] = useState(null);
  const [affiliateCommission, setAffiliateCommission] = useState(null);
  const [subTotal, setSubTotal] = useState(null);
  const [totalWash, setTotalWashWeek] = useState(null);
  const [onlyBooking, setOnlyBooking] = useState(null);
  const handleCloseandRedirect = () => {
    handleCloseBooking();
    // window.location.reload();
  };

  useEffect(() => {
    let res3;
    const res3Fun = async () => {
      res3 = await Api.getCODStatus();
      if (res3.status == '200') {
        setCodeStatus(res3.data);
      }
    };
    res3Fun();

    let res2;
    const res2Fun = async () => {
      res2 = await Api.getAllSlots();
      if (res2.status == '200') {
        setSlots(res2.data);
      }
    };
    res2Fun();
    setUsr(JSON.parse(sessionStorage.getItem('auth')));
    let res1;
    const res1Fun = async () => {
      res1 = await Api.getAllExtraFeatures();
      if (res1.status == '200') {
        setExtraFeatures(res1.data);
      }
    };
    res1Fun();

    // if (checkAuth)
    // {
    //     setShowMobileScreen(false);
    //     setShowCarScreen(true);
    // }
    // else
    // {
    //     setShowMobileScreen(true);
    //     setShowCarScreen(false);
    // }
  }, []);

  const [phone, setPhone] = useState(null);
  const [loginData, setData] = useState(null);
  const [otp, setOtp] = useState(null);
  const [carType, setCarType] = useState(null);
  const [packageType, setPackageType] = useState(null);
  const [packageId, setPackageId] = useState([]);
  const [extFeatures, setExtFeatures] = useState([]);
  const [amount, setAmount] = useState(0);
  const [usrName, setUsrName] = useState(null);
  const [usrEmail, setUsrEmail] = useState(null);
  const [usrAddress, setUsrAddress] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [plate, setPlate] = useState(null);
  const [color, setColor] = useState(null);
  const [parkingNo, setParkingNo] = useState(null);
  const [parkingFloor, setParkingFloor] = useState(null);
  const [code, setCode] = useState(null);
  const [link, setLink] = useState(null);
  const [linkDes, setLinkDes] = useState(null);
  // let [couponData,setCouponData]=useState(null);
  const [affiliateId, setAffiliateId] = useState(null);

  async function getOtp(e) {
    e.preventDefault();
    let data;
    if (validator.isEmail(loginData)) {
      data = {
        // form data

        email: loginData,
        type: 'email',
        // "password": password
      };
      console.log('email');
      console.log(loginData);
    } else if (validator.isMobilePhone(loginData)) {
      data = {
        // form data

        phone: loginData,
        type: 'phone',
        // "password": password
      };
      console.log('phoneNumber');
      console.log(loginData);
    } else {
      console.log('Invalid Response');
    }
    // calculateAmount
    const res = await Api.userSigninAndSignupByPhone(data);

    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      setShowMobileScreen(false);
      setShowOtpScreen(true);
    } else {
      await Notifications.errorMsg(res.message);
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();

    const data = {
      code: otp,
    };

    const res = await Api.verifyOtp(data);

    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      sessionStorage.setItem('auth', JSON.stringify(res.data));
      setShowOtpScreen(false);
      setShowCarScreen(true);
    } else {
      await Notifications.errorMsg(res.message);
    }
  }

  async function getPackages(car, type) {
    const data = {
      car: car,
      type: type,
    };

    const res = await Api.allPlanByCarAndPlanType(data);
    if (res.status == '200') {
      setPackages(res.data);
    }
  }

  function addOrRemoveExtFeatures(value, amountValue) {
    // (extFeatures.indexOf(value) > -1)?extFeatures.filter(item => item !== value):setExtFeatures([...extFeatures,value])
    // console.log(extraFeatures);
    if (extFeatures.indexOf(value) > -1) {
      setExtFeatures(extFeatures.filter((item, index) => item !== value));
      calculateAmount1(amountValue, 'minus');
      // console.log(extraFeatures);
    } else {
      // console.log(extraFeatures);
      setExtFeatures([...extFeatures, value]);
      calculateAmount1(amountValue, 'add');
    }
  }

  function calculateAmount1(value, fun) {
    // console.log('amount');
    // console.log(amount);
    // console.log(value);
    let total;
    let subtotal;
    if (fun == 'add') {
      total = parseInt(amount) + parseInt(value);
      subtotal = parseInt(subTotal) + parseInt(value);
    } else {
      total = parseInt(amount) - parseInt(value);
      subtotal = parseInt(subTotal) - parseInt(value);
    }
    setAmount(total);
    setSubTotal(subtotal);
  }

  function resetAmount() {
    setAmount(0);
    setExtFeatures([]);
    setSubTotal(0);
    setUserDiscount(0);
  }

  async function calculateAmount(value) {
    const total = parseInt(value);
    setAmount(total);
    setSubTotal(total);
  }
  function addOrRemovePlan(value) {
    // (extFeatures.indexOf(value) > -1)?extFeatures.filter(item => item !== value):setExtFeatures([...extFeatures,value])
    if (packageId.indexOf(value) > -1) {
      packageId.filter((item) => item !== value);
    } else {
      setPackageId([...packageId, value]);
    }
  }

  const successPayment = (data) => {
    alert('Payment Successful');
  };

  const errorPayment = (data) => {
    alert('Payment Error');
  };

  const onToken = async (token) => {
    if (
      model == null ||
      model == '' ||
      plate == null ||
      plate == '' ||
      brand == null ||
      brand == '' ||
      parkingFloor == null ||
      parkingFloor == '' ||
      parkingNo == null ||
      parkingNo == ''
    ) {
      await Notifications.errorMsg('Please enter data in all the fields');
      return;
    } else {
      const data = {
        token: token,
        carType: carType,
        planId: packageId,
        packageType: packageType,
        userId: JSON.parse(sessionStorage.getItem('auth'))?.id,
        extraFeatures: extFeatures,
        date: date,
        bookingType: packageType,
        totalWash: totalWash,
        amount: couponApplied ? subTotal : amount,
        time: time,
        brand: brand,
        model: model,
        plate: plate,
        color: color,
        parkingNo: parkingNo,
        parkingFloor: parkingFloor,
        usrName: usrName,
        usrEmail: usrEmail,
        usrAddress: usrAddress,
        status: 'placed',
        couponCode: link?.code,
        commission: affiliateCommission,
        discount: userDiscount,
        affiliateId: link?.userId,
        linkId: linkDes?.id,
        onlyBooking: onlyBooking,
        booking_location: JSON.stringify(MapReducers.selectedLocation),
      };

      const res = await Api.stripePayment(data);
      if (res.status == '200') {
        handleShowBooking();
        // await Notifications.successMsg('Booking Confirmed');
        // window.location.reload();
      } else {
        await Notifications.errorMsg('Something went wrong. Try Again!');
        window.location.reload();
      }
    }
  };

  async function payWithCode() {
    if (
      model == null ||
      model == '' ||
      plate == null ||
      plate == '' ||
      brand == null ||
      brand == '' ||
      parkingFloor == null ||
      parkingFloor == '' ||
      parkingNo == null ||
      parkingNo == ''
    ) {
      await Notifications.errorMsg('Please enter data in all the fields');
      return;
    } else {
      const data = {
        carType: carType,
        planId: packageId,
        packageType: packageType,
        userId: JSON.parse(sessionStorage.getItem('auth'))?.id,
        extraFeatures: extFeatures,
        date: date,
        bookingType: packageType,
        totalWash: totalWash,
        amount: couponApplied ? subTotal : amount,
        time: time,
        brand: brand,
        model: model,
        plate: plate,
        color: color,
        parkingNo: parkingNo,
        parkingFloor: parkingFloor,
        usrName: usrName,
        usrEmail: usrEmail,
        usrAddress: usrAddress,
        status: 'placed',
        couponCode: link?.code,
        commission: affiliateCommission,
        discount: userDiscount,
        affiliateId: link?.userId,
        linkId: linkDes?.id,
        onlyBooking: onlyBooking,
      };

      const res = await Api.codPayment(data);
      if (res.status == '200') {
        await Notifications.successMsg('Booking Confirmed');
        // window.location.reload();
      } else {
        await Notifications.errorMsg('Something went wrong. Try Again!');
        // window.location.reload();
      }
    }
  }

  function resetForm() {}
  // coupon apply
  async function applyCoupon() {
    const data = {
      code: code,
    };

    const res = await Api.linkByCode(data); // get user by code

    if (res.status == '200') {
      setLink(res.data);

      const data1 = {
        code: code,
        planId: packageId,
        carType: carType,
      };

      const res1 = await Api.linkDescByCodeUserOne(data1); // get user by code

      if (res1.status == '200') {
        setLinkDes(res1.data);
        setCouponApplied(true);

        if (res1.data.type == 'absolute') {
          setAffiliateCommission(parseInt(res1.data.commission));
          setUserDiscount(parseInt(res1.data.discount));
          setSubTotal(parseInt(amount) - parseInt(res1.data.discount));
          setAffiliateId(res1.data.userId);
          setCode('');
          await Notifications.successMsg('Coupon Applied');
        } else {
          setAffiliateCommission(
              (parseInt(amount) * res1.data.commission) / 100,
          );
          setUserDiscount(
              (parseInt(amount) * parseInt(res1.data.discount)) / 100,
          );
          setSubTotal(
              parseInt(amount) -
              (parseInt(amount) * parseInt(res1.data.discount)) / 100,
          );
          setAffiliateId(res1.data.userId);
          setCode('');
          await Notifications.successMsg('Coupon Applied');
        }
      } else {
        await Notifications.errorMsg(res1.message);
        setCode('');
      }
    }
  }

  return (
    <>
      {/* login */}
      <div className="main">
        <div className="container-fluid">
          <div className="row d-flex">
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 c1">

              <div className="p-3">
                {/* <h1>Welcome to </h1>*/}
                {/* <h1>Car Wash </h1>*/}
                <a href={'/'}><img
                  alt="logo"
                  className="mt-2 mb-2"
                  src={logo}
                  width={200}
                  height={130}
                /></a>
                {showMobileScreen ? (
                  <>
                    <Stepper />
                    <div className="sign-cont mt-5">
                      <div className="sign-form">
                        {/* <button onClick={()=>{
                          setDesc('testing feature'); handleShowBooking();
                        }}
                        className='btn btn-secondary customButtonColor'>
                            Read more</button>
                        <button onClick={()=>{
                          setDesc('testing feature'); handleShow();
                        }}
                        className='btn btn-secondary customButtonColor'>
                            Read more</button> */}
                        <form onSubmit={getOtp}>
                          <div className=" load-form">
                            <div className=" load-input-wrapper">
                              <div className=" load-input">
                                <label>Phone / Email</label>
                                {/* <input required type={'text'}
                    placeholder="Enter Email Address / Phone Number"
                    className='form-input_ input'
                    value={loginData} onChange={(e)=>{
                      setData(e.target.value);
                    }} /> */}
                                <InputGroup className="mb-3 inline">
                                  {/* <InputGroup.Text id="basic-addon1">
                                    +971
                    </InputGroup.Text> */}
                                  <Form.Control
                                    required
                                    type={'text'}
                                    placeholder="Enter Email Address / Phone Number"
                                    className="form-input_ input"
                                    value={loginData}
                                    onChange={(e) => {
                                      setData(e.target.value);
                                    }}
                                  />
                                </InputGroup>
                                {/* <input value="+971"/>
                                <input
                                /> */}
                              </div>
                            </div>
                            {/* <div className="sign-forget">
                              <Link to={'/reset-password'}>
                               Forgot Password?</Link>
                            </div> */}
                            <div className="form-buttons">
                              <button
                                type={'submit'}
                                style={{
                                  fontSize: '14px',
                                  background: '#FF7B00',
                                }}
                                className="button-primary"
                              >
                                Get OTP
                              </button>
                            </div>
                          </div>
                        </form>

                        <div
                          style={{
                            padding: '20px 30px',
                          }}
                        >
                          <Link
                            to="/sign-in"
                            className="text-dark form-buttons mt-2"
                          >
                            <Button className="btn btn-primary">Login</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {/* showOtp */}
                {showOtpScreen ? (
                  <>
                    <Stepper done={1} />
                    <div className="sign-cont mt-5">
                      <div className="sign-form">
                        <form onSubmit={verifyOtp}>
                          <div className=" load-form">
                            <div className=" load-input-wrapper">
                              <div className=" load-input">
                                <label>OTP</label>
                                <input
                                  required
                                  type={'phone'}
                                  placeholder="Enter OTP"
                                  minLength={6}
                                  maxLength={6}
                                  className="form-input_ input"
                                  value={otp}
                                  onChange={(e) => {
                                    setOtp(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="sign-forget">
                              {/* <Link to={'/reset-password'}>Forgot Password?</Link>*/}
                            </div>
                            <div className="form-buttons">
                              <button
                                type={'submit'}
                                style={{fontSize: '14px'}}
                                className="button-primary"
                              >
                                Login
                              </button>
                              {/* <button onClick={()=>{setShowMobileScreen(true);setShowOtpScreen(false)}} style={{ fontSize: '14px' }} className='button-primary'>Resend Otp</button>*/}
                            </div>
                            <div className="form-buttons mt-1">
                              {/* <button type={'submit'} style={{ fontSize: '14px' }} className='button-primary'>Login</button>*/}
                              <button
                                onClick={() => {
                                  setShowMobileScreen(true);
                                  setShowOtpScreen(false);
                                  setPhone(null);
                                }}
                                style={{fontSize: '14px'}}
                                className="button-primary"
                              >
                                Resend Otp
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {/* show car type */}
                {showCarScreen ? (
                  <>
                    <Stepper done={2} />
                    <div style={{marginTop: '6%'}}>
                      <p className="text-center ">
                        <button
                          style={{width: '50%'}}
                          className={
                            carType == 'SUV' ?
                              'btn btn-primary' :
                              'btn btn-outline-primary'
                          }
                          onClick={() => {
                            setShowCarScreen(false);
                            setShowPackagesTypeScreen(true);
                            setCarType('SUV');
                          }}
                        >
                          SUV
                        </button>
                      </p>
                      <p className="text-center ">
                        <button
                          style={{width: '50%', marginTop: '2%'}}
                          className={
                            carType == 'Sedan' ?
                              'btn btn-primary' :
                              'btn btn-outline-primary'
                          }
                          onClick={() => {
                            setShowCarScreen(false);
                            setShowPackagesTypeScreen(true);
                            setCarType('Sedan');
                          }}
                        >
                          Sedan
                        </button>
                      </p>
                      <p className="text-center mt-5">
                        <button
                          style={{width: '50%', marginTop: '2%'}}
                          className="btn btn-warning"
                          onClick={() => {
                            setShowMobileScreen(true);
                            setShowOtpScreen(false);
                            setShowCarScreen(false);
                            setPhone(null);
                          }}
                        >
                          Resend OTP
                        </button>
                      </p>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {/* plan */}
                {showPackagesTypeScreen ? (
                  <>
                    <Stepper done={3} />
                    <div style={{marginTop: '6%'}}>
                      <p className="text-center ">
                        <button
                          style={{width: '50%'}}
                          className="btn btn-outline-primary"
                          onClick={async () => {
                            setShowPackagesTypeScreen(false);
                            setShowPackagesScreen(true);
                            setTotalWashWeek(1);
                            setPackageType('onetime');
                            await getPackages(carType, 'onetime');
                          }}
                        >
                          One Time Wash
                        </button>
                      </p>
                      <p className="text-center ">
                        <button
                          style={{width: '50%', marginTop: '2%'}}
                          className="btn btn-outline-primary"
                          onClick={async () => {
                            setShowPackagesTypeScreen(false);
                            // setshowMonthlySubPackage(true);
                            setPackageType('monthly');
                            setShowPackagesScreen(true);
                            await getPackages(carType, 'monthly');
                          }}
                        >
                          Monthly Packages
                        </button>
                      </p>

                      {showMonthlySubPackage ? (
                        <div
                          className="container-fluid mt-2"
                          style={{background: 'white'}}
                        >
                          <div className="row p-3">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>
                                <input
                                  name="monthlyPack"
                                  type="radio"
                                  onClick={async () => {
                                    setShowPackagesTypeScreen(false);
                                    setShowPackagesScreen(true);
                                    setTotalWashWeek(4);
                                    setshowMonthlySubPackage(false);
                                  }}
                                />
                              </p>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>1 wash a week</p>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>4 wash total</p>
                            </div>
                          </div>
                          <div className="row p-3">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>
                                <input
                                  name="monthlyPack"
                                  type="radio"
                                  onClick={async () => {
                                    setShowPackagesTypeScreen(false);
                                    setShowPackagesScreen(true);
                                    setshowMonthlySubPackage(false);
                                    setTotalWashWeek(8);
                                  }}
                                />
                              </p>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>2 wash a week</p>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>8 wash total</p>
                            </div>
                          </div>
                          <div className="row p-3">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>
                                <input
                                  name="monthlyPack"
                                  type="radio"
                                  onClick={async () => {
                                    setShowPackagesTypeScreen(false);
                                    setShowPackagesScreen(true);
                                    setTotalWashWeek(12);
                                    setshowMonthlySubPackage(false);
                                  }}
                                />
                              </p>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>3 wash a week</p>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                              <p>12 wash total</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      <p className="text-center mt-4">
                        <button
                          style={{width: '50%', marginTop: '2%'}}
                          className="btn btn-outline-secondary customButtonColor"
                          onClick={async () => {
                            setShowPackagesTypeScreen(false);
                            setShowCarScreen(true);
                          }}
                        >
                          Previous
                        </button>
                      </p>
                    </div>
                  </>
                ) : (
                  ''
                )}

                {/* plan */}
                {showPackagesScreen ? (
                  <>
                    <Stepper done={3} />
                    <div style={{marginTop: '6%'}}>
                      <div className="container-fluid">
                        {packages?.map((itm, i) => (
                          <div
                            className="row mt-2 p-2 d-flex align-items-center"
                            style={{background: 'white'}}
                            key={i}
                          >
                            <div className="col-1">
                              <input
                                checked={packageId == itm.id ? true : false}
                                onChange={(e) => {}}
                                onClick={() => {
                                  setPackageId(itm.id);
                                  setOnlyBooking(itm.price);
                                  calculateAmount(itm.price);
                                  setTotalWashWeek(
                                    packageType == 'monthly' ?
                                      itm.WasPerWeek :
                                      1,
                                  );
                                }}
                                type={'radio'}
                                name={'package'}
                              />
                            </div>
                            <div className="col-10 col-sm-6">
                              {itm.name}
                            </div>
                            <div className="col-6 col-sm-2 mt-2 mt-sm-0">
                              {itm.price} AED
                            </div>
                            <div className="col-6 col-sm-3 mt-2 mt-sm-0">
                              <button
                                onClick={() => {
                                  setDesc(itm.feature1);
                                  handleShow();
                                }}
                                className="btn btn-secondary customButtonColor"
                              >
                                Read more
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className={'text-center mt-4'}>
                        <button
                          className="btn btn-primary customButtonColor"
                          style={{width: '100px'}}
                          onClick={() => {
                            setShowPackagesScreen(false);
                            setShowExtraScreen(true);
                            // setExtFeatures([]);
                          }}
                        >
                          Next
                        </button>
                      </p>
                      <p className="text-center mt-4">
                        <button
                          style={{width: '100px'}}
                          className="btn btn-outline-secondary customButtonColor"
                          onClick={async () => {
                            resetAmount();
                            setShowPackagesScreen(false);
                            setShowPackagesTypeScreen(true);
                          }}
                        >
                          Previous
                        </button>
                      </p>
                      {/* <p class={'text-center mt-3'}><button className={'p-1'} >Next</button></p>*/}
                    </div>
                  </>
                ) : (
                  ''
                )}

                {/* add on  */}
                {showExtraScreen ? (
                  <>
                    <Stepper done={4} />
                    {/* <button className='mt-5 mb-2 p-1' onClick={()=>{setExtFeatures([])}}>Reset</button>*/}
                    <div style={{marginTop: '4%'}}>
                      {extraFeatures?.map((itm, i) => (
                        <div
                          className="container-fluid mt-2"
                          style={{background: 'white'}}
                        >
                          <div className="row p-3 d-flex align-items-center">
                            <div className="col-2">
                              <p>
                                <input
                                  type="checkbox"
                                  defaultChecked={
                                    extFeatures.includes(itm.id) ? true : false
                                  }
                                  onChange={(e) => {}}
                                  onClick={() => {
                                    addOrRemoveExtFeatures(itm.id, itm.price);
                                  }}
                                />
                              </p>
                            </div>
                            <div className="col-7">
                              <p>{itm.name}</p>
                            </div>
                            {/* <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3'>*/}
                            {/*    <p>{itm.time} min</p>*/}
                            {/* </div>*/}
                            <div className="col-3">
                              <p>{itm.price} AED</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="container mt-5"
                      style={{background: 'gray', borderRadius: '10px'}}
                    >
                      <div className="row p-3 ">
                        <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                          <label>
                            <b>Coupon</b>
                          </label>
                          <input
                            value={code}
                            onChange={(e) => {
                              setCode(e.target.value);
                            }}
                            className="form-control"
                            placeholder={'Enter Coupon'}
                            type={'text'}
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                          <label style={{visibility: 'hidden'}}>Coupon</label>
                          <button
                            onClick={applyCoupon}
                            className={'btn btn-primary'}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="container mt-3 justify-content-center">
                      <h4 className={'text-center'}>
                        <b>Total: </b>
                        {amount} AED
                      </h4>
                      <h4 className={'text-center'}>
                        <b>Discount: </b>
                        {couponApplied ? userDiscount : '0'} AED
                      </h4>
                      <h4 className={'text-center'}>
                        <b>Subtotal: </b>
                        {couponApplied ? subTotal : subTotal} AED
                      </h4>
                    </div>
                    <p className={'text-center mt-4'}>
                      <button
                        className="btn btn-primary customButtonColor"
                        style={{width: '100px'}}
                        onClick={() => {
                          setShowExtraScreen(false);
                          setShowBookingScreen(true);
                          // resetAmount();
                        }}
                      >
                        Next
                      </button>
                    </p>
                    <p className={'text-center mt-2'}>
                      <button
                        className="btn btn-primary customButtonColor"
                        style={{width: '100px'}}
                        onClick={async () => {
                          setShowExtraScreen(false);
                          setShowPackagesScreen(true);
                          await resetAmount();
                          calculateAmount(onlyBooking);
                          setSubTotal(onlyBooking);
                          // setSubTotal(onlyBooking)
                        }}
                      >
                        Previous
                      </button>
                    </p>
                  </>
                ) : (
                  ''
                )}
                {/* booking */}

                {showBookingScreen ? (
                  <>
                    <Stepper done={5} />
                    <div className="mt-4">
                      {packageType == 'onetime' ? (
                        <div className="container-fluid mt-2 p-4">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                              <label>Date</label>
                              <input
                                required
                                onChange={(e) => {
                                  setDate(e.target.value);
                                }}
                                className="form-control"
                                type={'date'}
                              />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                              <label>Time Slot</label>
                              <select
                                className="form-control"
                                required
                                onChange={(e) => {
                                  setTime(e.target.value);
                                }}
                              >
                                <option>Select</option>
                                {slots?.map((itm, i) => (
                                  <option value={itm.time}>{itm.time}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {/* map row */}
                          <div
                            className="container mt-4"
                            style={{
                              width: '100%',
                              height: '400px',
                              position: 'relative',
                            }}
                          >
                            <Map />
                          </div>
                        </div>
                      ) : (
                        <div className="container px-4">
                          <div className="alert alert-info" role="alert">
                            Note: Before book monthly package kindly communicate
                            with our team in order to make sure available
                            service area , days of visit and time.
                          </div>
                        </div>
                      )}
                      {usr?.email == '' || usr?.email == null ? (
                        <>
                          <div className="container-fluid mt-4 px-4">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                                <label>Name</label>
                                <input
                                  required
                                  value={usrName}
                                  onChange={(e) => {
                                    setUsrName(e.target.value);
                                  }}
                                  className="form-control"
                                  type={'text'}
                                />
                              </div>
                              {/* <div
                                                                        className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                        <label>Email</label>
                                                                        // <input required value={usrEmail} onChange={(e)=>{setUsrEmail(e.target.value)}}  className='form-control' type={'email'}/>
                                                                    </div> */}
                              <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                                <label>Apt no. or Building Name </label>
                                <input
                                  required
                                  value={usrAddress}
                                  onChange={(e) => {
                                    setUsrAddress(e.target.value);
                                  }}
                                  className="form-control"
                                  type={'text'}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                      <div className="mt-4 p-2">
                        <div className="container-fluid mt-2">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                              <label>Brand</label>
                              <input
                                required
                                onChange={(e) => {
                                  setBrand(e.target.value);
                                }}
                                value={brand}
                                className="form-control"
                                type={'text'}
                              />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                              <label>Plate No</label>
                              <input
                                required
                                onChange={(e) => {
                                  setPlate(e.target.value);
                                }}
                                value={plate}
                                className="form-control"
                                type={'text'}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="container-fluid mt-2">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                              <label>Model</label>
                              <input
                                required
                                onChange={(e) => {
                                  setModel(e.target.value);
                                }}
                                value={model}
                                className="form-control"
                                type={'text'}
                              />
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                              <label>Color</label>
                              <input
                                required
                                onChange={(e) => {
                                  setColor(e.target.value);
                                }}
                                value={color}
                                className="form-control"
                                type={'text'}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="container-fluid mt-2">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                              <label>Parking Floor</label>
                              <input
                                required
                                onChange={(e) => {
                                  setParkingFloor(e.target.value);
                                }}
                                value={parkingFloor}
                                className="form-control"
                                type={'text'}
                              />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
                              <label>Parking No</label>
                              <input
                                required
                                onChange={(e) => {
                                  setParkingNo(e.target.value);
                                }}
                                value={parkingNo}
                                className="form-control"
                                type={'text'}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 justify-content-center">
                      {/* <br/>*/}
                      <h4 className={'text-center'}>
                        <b>Total: </b>
                        {couponApplied ? subTotal : amount} AED
                      </h4>
                      {/* <h4 className={"text-center"}>
                        <b>Discount: </b>
                        {couponApplied ? userDiscount : "0"} AED
                      </h4>
                      <h4 className={"text-center"}>
                        <b>Subtotal: </b>
                        {couponApplied ? subTotal : "0"} AED
                      </h4> */}
                      <p className="text-center mt-4 ">
                        <StripeCheckout
                          name={
                            'Pay ' + couponApplied ? subTotal : amount + '.00'
                          }
                          amount={couponApplied ? subTotal * 100 : amount * 100} // cents
                          currency="AED" // the pop-in header title
                          token={onToken}
                          stripeKey="pk_test_51LXoKNA82nvbi04Cmtz1dSfDSzwo3cYWyhHL1SqeoWxtMqfEIsA25M9VPayqiAVn6acHmUyHm9UJXTR6WggyOfXZ00AWulYq4G"
                        />
                        {/* <button onClick={submitForm}>Get</button>*/}
                      </p>
                      <p className={'text-center mt-2'}>
                        <button
                          className="btn  btn-danger customButtonColor"
                          style={{width: '90px'}}
                          onClick={() => {
                            // resetAmount();
                            setShowPackagesScreen(false);
                            setShowBookingScreen(false);
                            setShowExtraScreen(true);
                          }}
                        >
                          Previous
                        </button>
                      </p>
                    </div>
                    {codeStatus?.status == 'true' ? (
                      <div className="mt-3 justify-content-center">
                        {/* <br/>*/}
                        <h4 className={'text-center'}>
                          <button
                            onClick={payWithCode}
                            className="btn btn-primary"
                          >
                            Pay With COD
                          </button>
                        </h4>
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 c2">
              <div className={'faqs p-1'}>
                <h5 style={{marginTop: '5%'}} className={'text-center'}>
                  How can we Help you ?
                </h5>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      What payment methods exist in your company?
                    </Accordion.Header>
                    <Accordion.Body>
                      Direct back transfer ,Debit and credit card.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      How do I book car wash service ?
                    </Accordion.Header>
                    <Accordion.Body>
                      In order to book any service kindly login with Mobile number OR E-mail address and choose any plan you wish to get it.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      How do I make changes to an active order?
                    </Accordion.Header>
                    <Accordion.Body>
                      Once you’ve placed an order, you cannot change or
                      reschedule it via the online. If you want to make changes
                      to a scheduled delivery, kindly contact our team.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      What was Refund policy ?
                    </Accordion.Header>
                    <Accordion.Body>
                      Currently We dont have re-fund policy for any plan in cause you are confused kinldy contact our team provided number below.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      What was the day you wash monthly package ?
                    </Accordion.Header>
                    <Accordion.Body>
                      All monthly package days and date decide by our team, make
                      sure to choose convenient days and date before booking
                      done.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                      What was product you use for washing ?
                    </Accordion.Header>
                    <Accordion.Body>
                      All of our products are safety certified by Dubai
                      Municipality department
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      Is your team professional ?
                    </Accordion.Header>
                    <Accordion.Body>
                      yes, all our teams are well trained for washing ,As per
                      policy we giving important for safety for avoid scratches
                      and paint fade which is long term effect this reason we
                      use micro fiber towel and concentrate product for body
                      shine.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>
                      How do you make sure perfect wash every time ?
                    </Accordion.Header>
                    <Accordion.Body>
                      In order to receive perfect wash kindly use our feedback and suggestion portal each time or please contact our team.

                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="8">
                    <Accordion.Header>
                      How do I use a promotional code ?
                    </Accordion.Header>
                    <Accordion.Body>
                      There is so many way to redeem coupon:- 1-Any situation
                      eco friendly car wash issued coupon can use while booking
                      2-Any situation third person or party offer you coupon
                      code or link that can be redeem.
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* new */}
                  {/* <Accordion.Item eventKey="9">*/}
                  {/*  <Accordion.Header>*/}
                  {/*    What is water-less car wash ?*/}
                  {/*  </Accordion.Header>*/}
                  {/*  <Accordion.Body>*/}
                  {/*    A water–less car wash is an eco-friendly and efficient car*/}
                  {/*    washing that uses little or no water. Sometimes it is also*/}
                  {/*    known as a spray wash It also allows the car detailer to*/}
                  {/*    service your car in narrow spaces while saving surprising*/}
                  {/*    amounts of water. Water-less products are more advanced*/}
                  {/*    than regular soap used for a mobile car wash as they need*/}
                  {/*    to compensate for the lack of water. Thus, the efficiency*/}
                  {/*    of the water-less wash is usually better than using*/}
                  {/*    water-based methods. Plus, when doing a water-less car*/}
                  {/*    detailing, you only need a bucket of water to rinse your*/}
                  {/*    towels instead of using between 50 to 100 gallons of clean*/}
                  {/*    water when using a pressure washer or a hose.<br></br>A*/}
                  {/*    water-less car wash just requires 4 – 6 oz of water-less*/}
                  {/*    wash formula used per car and a couple of buckets of*/}
                  {/*    water. In the cases where the car is caked in mud, you*/}
                  {/*    require an additional gallon of water.*/}
                  {/*  </Accordion.Body>*/}
                  {/* </Accordion.Item>*/}
                  {/* <Accordion.Item eventKey="10">*/}
                  {/*  <Accordion.Header>*/}
                  {/*    How does a Water-less Car Wash work?*/}
                  {/*  </Accordion.Header>*/}
                  {/*  <Accordion.Body>*/}
                  {/*    A water-less car wash uses high lubricity sprays to polish*/}
                  {/*    and wash the vehicle’s bodywork. The spray’s high*/}
                  {/*    lubricity chemicals encapsulate dirt and dust particles.*/}
                  {/*    This process is similar to how water removes dirt, but the*/}
                  {/*    chemical combination of a water-less car wash product is*/}
                  {/*    more efficient. You have to simply spray the surface of*/}
                  {/*    the car and then wipe it off. This process removes any*/}
                  {/*    light dirt or stains from the car’s surface. It works*/}
                  {/*    ideally for cars that don’t have thick dried mud to clean.*/}
                  {/*    A water-less wash is only recommended for cars with light*/}
                  {/*    dirt.*/}
                  {/*  </Accordion.Body>*/}
                  {/* </Accordion.Item>*/}
                  {/* <Accordion.Item eventKey="11">*/}
                  {/*  <Accordion.Header>*/}
                  {/*    Eco-Friendly Car Washing: The Waterless Way*/}
                  {/*  </Accordion.Header>*/}
                  {/*  <Accordion.Body>*/}
                  {/*    A car wash can get expensive, but it doesn’t have to be*/}
                  {/*    that way. If you’re looking to save money and the*/}
                  {/*    environment, then read on for all the information you need*/}
                  {/*    about how to waterless car wash your vehicle, so you can*/}
                  {/*    enjoy the same shiny-clean look without wasting all that*/}
                  {/*    water. The best part? You don’t even need any special*/}
                  {/*    equipment to do it!*/}
                  {/*  </Accordion.Body>*/}
                  {/* </Accordion.Item>*/}
                  {/* <Accordion.Item eventKey="12">*/}
                  {/*  <Accordion.Header>*/}
                  {/*    What is an eco-friendly car wash?*/}
                  {/*  </Accordion.Header>*/}
                  {/*  <Accordion.Body>*/}
                  {/*    Eco friendly car washing is an innovative way to clean*/}
                  {/*    your vehicle without water. They utilize environmentally*/}
                  {/*    conscious products, such as recycled water, recyclable*/}
                  {/*    buckets and biodegradable soaps in order to minimize their*/}
                  {/*    impact on Mother Earth. Plus, they’re convenient! No need*/}
                  {/*    to find a home car wash Dubai or eco-friendly auto spa;*/}
                  {/*    these car washes can be found right in your own driveway.*/}
                  {/*  </Accordion.Body>*/}
                  {/* </Accordion.Item>*/}
                  {/* <Accordion.Item eventKey="14">*/}
                  {/*  <Accordion.Header>*/}
                  {/*    Why is it a good idea to use an eco-friendly car wash?*/}
                  {/*  </Accordion.Header>*/}
                  {/*  <Accordion.Body>*/}
                  {/*    Cleaning your car using an eco-friendly method has many*/}
                  {/*    benefits. If you are looking to lower your carbon*/}
                  {/*    footprint or if you simply want to care for our planet,*/}
                  {/*    waterless car wash is a great way to do it.*/}
                  {/*  </Accordion.Body>*/}
                  {/* </Accordion.Item>*/}
                  {/* <Accordion.Item eventKey="15">*/}
                  {/*  <Accordion.Header>*/}
                  {/*    What are the benefits of using an eco-friendly car wash?*/}
                  {/*  </Accordion.Header>*/}
                  {/*  <Accordion.Body>*/}
                  {/*    Admittedly, a waterless car wash can’t offer quite as deep*/}
                  {/*    a clean. However, it also leaves no residue, it doesn’t*/}
                  {/*    require you to use hundreds of gallons of water and it*/}
                  {/*    won’t pollute local waterways. If that doesn’t make you*/}
                  {/*    want to switch your cleaning habits, we don’t know what*/}
                  {/*    will!*/}
                  {/*  </Accordion.Body>*/}
                  {/* </Accordion.Item>*/}
                  {/* <Accordion.Item eventKey="16">*/}
                  {/*  <Accordion.Header>*/}
                  {/*    How do you go about getting your own eco-friendly vehicle?*/}
                  {/*  </Accordion.Header>*/}
                  {/*  <Accordion.Body>*/}
                  {/*    If you want to start car washing on your own, follow these*/}
                  {/*    steps and you’ll be ready to clean up in no time! First,*/}
                  {/*    identify what kind of car wash service you want to run. Do*/}
                  {/*    you want a one stop shop for all things auto? If so, take*/}
                  {/*    some classes at a trade school or community college where*/}
                  {/*    they can teach you how to perform oil changes, tire*/}
                  {/*    rotations and other basic automotive maintenance.*/}
                  {/*  </Accordion.Body>*/}
                  {/* </Accordion.Item>*/}
                  {/* <Accordion.Item eventKey="17">*/}
                  {/*  <Accordion.Header>*/}
                  {/*    Where can you find more information on using eco-friendly*/}
                  {/*    waterless cars?*/}
                  {/*  </Accordion.Header>*/}
                  {/*  <Accordion.Body>*/}
                  {/*    In any country, we don’t want to see our water resources*/}
                  {/*    dwindling away or getting polluted. If your customers are*/}
                  {/*    drivers, who have to car wash from time to time, let them*/}
                  {/*    know that there is a safe and effective way for cleaning*/}
                  {/*    your vehicle without wasting water. Simply start by*/}
                  {/*    getting a home car wash in Dubai, as it offers all*/}
                  {/*    necessary accessories for fast and easy care of your*/}
                  {/*    vehicle at home.*/}
                  {/*  </Accordion.Body>*/}
                  {/* </Accordion.Item>*/}
                </Accordion>
              </div>
              {/* <div className='faqs p-1'>
                                <Card >
                                    <Card.Body> */}
              {/* <Card.Title>Card Title</Card.Title>*/}
              {/* <Card.Subtitle className="mb-2"><i className='fas fa-phone'></i> +971-562871522</Card.Subtitle>
                                        <Card.Subtitle className="mb-2"><i className='fas fa-envelope'></i> info@ecofriendlycarwash.ae</Card.Subtitle>
                                        <Card.Subtitle className="mb-2"><i className='fas fa-map-marker'></i> Suite 17, The Iridium Building,Umm Suqeim Road,Al Barsha Dubai</Card.Subtitle>
                                        <Card.Subtitle className="mb-2"><i className='fas fa-globe'></i> www.ecofriendlycarwash.ae</Card.Subtitle> */}
              {/* <Card.Text>*/}
              {/*    Some quick example text to build on the card title and make up the*/}
              {/*    bulk of the card's content.*/}
              {/* </Card.Text>*/}
              {/* <Card.Link href="#">Card Link</Card.Link>*/}
              {/* <Card.Link href="#">Another Link</Card.Link>*/}
              {/* </Card.Body>
                                </Card>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='container-fluid footer p-2'>
                 <div className='row'>
                     <div  className='col-xl-12 col-lg-12 col-md-12 col-sm-12 footer-links text-center'>
                         <h5 className='footerDesc' style={{cursor: "pointer"}}>Gallery</h5>
                         <h5 className='footerDesc' style={{cursor: "pointer"}}>Privacy & Terms</h5> */}
      {/* <h5 class='footerDesc' style={{cursor: "pointer"}}>Privacy & Policy</h5>*/}
      {/* <h5 class='footerDesc' style={{cursor: "pointer"}}>Terms & Condition</h5>*/}
      {/* <h5 className='footerDesc' style={{cursor: "pointer"}}>About Us</h5>
                         <h5 className='footerDesc' style={{cursor: "pointer"}} onClick={()=>{history.push('/sign-in')}}>Login</h5>
                         <h5 className='footerDesc' style={{cursor: "pointer"}}>Blog</h5>
                     </div>
                 </div>
            </div> */}

      <>
        <div>
          {/* Footer */}
          <footer
            className="text-center text-lg-start text-white"
            style={{backgroundColor: 'black'}}
          >
            {/* Section: Social media */}
            <section
              className="d-flex justify-content-center justify-content-lg-between p-3"
              style={{backgroundColor: '#0D6EFD'}}
            >
              {/* Left */}
              <div className="me-5 d-none d-lg-block">
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Get connected with us on social networks:
                </span>
              </div>
              {/* Left */}
              {/* Right */}
              <div>
                <a
                  href="https://www.facebook.com/Eco-Friendly-Car-Wash-105917764892511/"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                {/* <a href="" className="me-4 text-reset" target="_blank">
                  <i className="fab fa-twitter" />
                </a>
                <a href="" className="me-4 text-reset" target="_blank">
                  <i className="fab fa-google" />
                </a> */}
                <a
                  href="https://www.instagram.com/invites/contact/?i=cz9qdji2bjqz&utm_content=naafjll"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
                {/* <a href="" className="me-4 text-reset" target="_blank">
                  <i className="fab fa-linkedin" />
                </a> */}
                <a
                  href="https://www.youtube.com/channel/UC3wjPinc8KElo3Zv2dO4GQg"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@ecofriendlycarwash?_t=8UAMiv8swMM&_r=1"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
              {/* Right */}
            </section>
            {/* Section: Social media */}
            {/* Section: Links  */}
            <section className="">
              <div className="container text-center text-md-start mt-5">
                {/* Grid row */}
                <div className="row mt-3">
                  {/* Grid column */}
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    {/* Content */}
                    <h6 className="text-uppercase fw-bold">
                      ECO Friendly Carwash
                    </h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{
                        width: 60,
                        backgroundColor: '#0D6EFD',
                        height: 2,
                      }}
                    />
                    <p>
                      Here you can use rows and columns to organize your footer
                      content. Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit.
                    </p>
                  </div>
                  {/* Grid column */}

                  {/* Grid column */}
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold">Useful links</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{
                        width: 60,
                        backgroundColor: '#0D6EFD',
                        height: 2,
                      }}
                    />
                    {/* <p>

                    </p> */}
                    <p>
                      <Link to="/aboutus" className="text-white">
                        About Us
                      </Link>
                    </p>
                    <p>
                      <Link to="/Blog" className="text-white">
                        Blog
                      </Link>
                    </p>
                    <p>
                      <Link to="/privacy-term" className="text-white">
                        Privacy & Terms
                      </Link>
                    </p>
                  </div>
                  {/* Grid column */}
                  {/* Grid column */}
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold">Contact</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{
                        width: 60,
                        backgroundColor: '#0D6EFD',
                        height: 2,
                      }}
                    />
                    <p>
                      <i className="fas fa-phone mr-3" />
                      &nbsp;&nbsp;
                      <a className="text-white" href="tel:+971-562871522">
                        +971-562871522
                      </a>
                    </p>
                    <p>
                      <i className="fas fa-envelope mr-3" />
                      &nbsp;&nbsp;
                      <a
                        className="text-white"
                        href="mailto:info@ecofriendlycarwash.ae"
                      >
                        info@ecofriendlycarwash.ae
                      </a>
                    </p>
                    <p>
                      <i className="fas fa-map-marker mr-3" />
                      &nbsp;&nbsp; Suite 17, The Iridium Building,Umm
                      &nbsp;&nbsp;&nbsp;&nbsp;Suqeim Road,Al Barsha Dubai
                    </p>
                    <p>
                      <i className="fas fa-globe mr-3" />
                      &nbsp;&nbsp;
                      <a
                        className="text-white"
                        href="http://www.ecofriendlycarwash.ae"
                      >
                        www.ecofriendlycarwash.ae
                      </a>
                    </p>
                  </div>
                  {/* Grid column */}
                </div>
                {/* Grid row */}
              </div>
            </section>
            {/* Section: Links  */}
            {/* Copyright */}
            <div
              className="text-center p-2"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
            >
              © 2022 Copyright:
              <a className="text-white" href="">
                &nbsp;ecofriendlycarwash.ae
              </a>
            </div>
            {/* Copyright */}
          </footer>
          {/* Footer */}
        </div>
        {/* End of .container */}
      </>

      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>*/}
        {/*    <Modal.Title></Modal.Title>*/}
        {/* </Modal.Header>*/}
        <Modal.Body>
          {/*<textarea className="form-control" disabled cols={55} rows={10}>*/}
          {/*  {desc}*/}
          {/*</textarea>*/}

          <div
              style={{
                padding: "20px",
                border: "2px solid #ccc",
                borderRadius: "5px",
                height: "auto",
              }}
          >
            <div dangerouslySetInnerHTML={{__html: desc}}></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>*/}
          {/*    Save Changes*/}
          {/* </Button>*/}
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
        <Modal.Header centered={true}>
          {/* <Modal.Title> */}
          {/* <div class="text-center"> */}
          <h5 className="text-center modal-title w-100">Booking Completed!</h5>
          {/* </div> */}
          {/* </Modal.Title> */}
          {/* <Button class="lg"  variant="white" >
                       x
                    </Button> */}
          <CloseButton onClick={handleCloseandRedirect} />
        </Modal.Header>
        <Modal.Body centered={true}>
          <div className="text-center">
            <img
              src={checkIcon}
              className="checkIcon"
              alt="Check mark"
              centered={true}
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
    </>
  );
}

export default Website;
