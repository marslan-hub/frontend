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
function Website() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseBooking = () => setShowBooking(false);
  const handleShowBooking = () => setShowBooking(true);
  const [desc, setDesc]=useState(null);
  const [usr, setUsr]=useState(null);
  const [slots, setSlots]=useState(null);
  const [codeStatus, setCodeStatus]=useState(null);
  const handleCloseandRedirect = ()=>{
    handleCloseBooking();
    // window.location.reload();
  };
  const [showMobileScreen, setShowMobileScreen]=useState(true);
  const [showOtpScreen, setShowOtpScreen]=useState(false);
  const [showCarScreen, setShowCarScreen]=useState(false);
  const [showPackagesTypeScreen, setShowPackagesTypeScreen]=useState(false);
  const [showMonthlySubPackage, setshowMonthlySubPackage]=useState(false);
  const [showPackagesScreen, setShowPackagesScreen]=useState(false);
  const [showExtraScreen, setShowExtraScreen]=useState(false);
  const [showBookingScreen, setShowBookingScreen]=useState(false);
  const check= JSON.parse(sessionStorage.getItem('auth'))?true:false;
  const [checkAuth, setCheckAuth]=useState(check);
  const [couponApplied, setCouponApplied]=useState(false);
  const [packages, setPackages]=useState(null);
  const [extraFeatures, setExtraFeatures]=useState(null);
  const [userDiscount, setUserDiscount]=useState(null);
  const [affiliateCommission, setAffiliateCommission]=useState(null);
  const [subTotal, setSubTotal]=useState(null);
  const [totalWash, setTotalWashWeek]=useState(null);
  useEffect(()=>{
    let res3;
    const res3Fun = async () => {
      res3=await Api.getCODStatus();
      if (res3.status =='200') {
        setCodeStatus(res3.data);
      }
    };
    res3Fun();
    let res2;
    const res2Fun = async () => {
      res2=await Api.getAllSlots();
      if (res2.status == '200') {
        setSlots(res2.data);
      }
    };
    res2Fun();
    setUsr(JSON.parse(sessionStorage.getItem('auth')));
    let res1;
    const res1Fun = async () => {
      res1= await Api.getAllExtraFeatures();
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
  const [phone, setPhone]=useState(null);
  const [otp, setOtp]=useState(null);
  const [carType, setCarType]=useState(null);
  const [packageType, setPackageType]=useState(null);
  const [packageId, setPackageId]=useState([]);
  const [extFeatures, setExtFeatures]=useState([]);
  const [amount, setAmount]=useState(0);
  const [usrName, setUsrName]=useState(null);
  const [usrEmail, setUsrEmail]=useState(null);
  const [usrAddress, setUsrAddress]=useState(null);
  const [date, setDate]=useState(null);
  const [time, setTime]=useState(null);
  const [brand, setBrand]=useState(null);
  const [model, setModel]=useState(null);
  const [plate, setPlate]=useState(null);
  const [color, setColor]=useState(null);
  const [parkingNo, setParkingNo]=useState(null);
  const [parkingFloor, setParkingFloor]=useState(null);
  const [code, setCode]=useState(null);
  const [link, setLink]=useState(null);
  const [linkDes, setLinkDes]=useState(null);
  // let [couponData,setCouponData]=useState(null);
  const [affiliateId, setAffiliateId]=useState(null);
  async function getOtp(e) {
    e.preventDefault();
    const data={
      phone: phone,
    };
    const res = await Api.userSigninAndSignupByPhone(data);
    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      setShowMobileScreen(false);
      setShowOtpScreen(true);
    } else {
      await Notifications.errorMsg(res.message);
    }
  }
  function resetAmount() {
    setAmount(0);
  }
  function calculateAmount(value) {
    const total=parseInt(amount)+parseInt(value);
    setAmount(total);
  }
  async function verifyOtp(e) {
    e.preventDefault();
    const data={
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
    const data={
      car: car,
      type: type,
    };
    console.log(data);
    const res= await Api.allPlanByCarAndPlanType(data);
    console.log(res);
    if (res.status == '200') {
      setPackages(res.data);
    }
  }
  // async function submitForm() {
  //
  //     let user=JSON.parse(sessionStorage.getItem('auth'));
  //
  //     let data={
  //         carType: carType,
  //         planId: packageId,
  //         userId: usr?.id,
  //         packageType: packageType,
  //         extraFeatures: extFeatures,
  //         date: date,
  //         bookingType: packageType,
  //         amount: couponApplied?subTotal:amount,
  //         time: time,
  //         brand: brand,
  //         model: model,
  //         plate: plate,
  //         color: color,
  //         parkingNo: parkingNo,
  //         parkingFloor: parkingFloor,
  //         // coupon: coupon,
  //         usrName: usrName,
  //         usrEmail: usrEmail,
  //         usrAddress: usrAddress,
  //         // couponCode: coupon.code,
  //         // commission: affiliateCommission,
  //         // discount:  userDiscount,
  //         // affiliateId: coupon.userId,
  //         // linkId: coupon.id,
  //     }
  //
  //     console.log("Form Data:",data);
  //
  // }
  function addOrRemoveExtFeatures(value) {
    // (extFeatures.indexOf(value) > -1)?extFeatures.filter(item => item !== value):setExtFeatures([...extFeatures,value])
    if (extFeatures.indexOf(value) > -1) {
      extFeatures.filter((item) => item !== value);
    } else {
      setExtFeatures([...extFeatures, value]);
    }
  }
  function addOrRemovePlan(value) {
    // (extFeatures.indexOf(value) > -1)?extFeatures
    // .filter(item => item !== value):setExtFeatures([...extFeatures,value])
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
    if (model == null ||
        model == '' ||
        plate == null ||
        plate == '' ||
        brand == null ||
        brand == '' ||
        parkingFloor == null ||
        parkingFloor == '' ||
        parkingNo == null ||
        parkingNo == '') {
      await Notifications.errorMsg('Please enter data in all the fields');
      return;
    } else {
      const data={
        token: token,
        carType: carType,
        planId: packageId,
        packageType: packageType,
        userId: JSON.parse(sessionStorage.getItem('auth'))?.id,
        extraFeatures: extFeatures,
        date: date,
        bookingType: packageType,
        totalWash: totalWash,
        amount: couponApplied?subTotal:amount,
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
      };
      const res= await Api.stripePayment(data);
      if (res.status == '200') {
        // console.log(data);
        // await Notifications.successMsg('Booking Confirmed');
        handleShowBooking();
        // await
      } else {
        await Notifications.errorMsg('Something went wrong. Try Again!');
        window.location.reload();
      }
    }
  };
  async function payWithCode() {
    if (model == null ||
        model == '' ||
        plate == null ||
        plate == '' ||
        brand == null ||
        brand == '' ||
        parkingFloor == null ||
        parkingFloor == '' ||
        parkingNo == null ||
        parkingNo == '') {
      await Notifications.errorMsg('Please enter data in all the fields');
      return;
    } else {
      const data={
        carType: carType,
        planId: packageId,
        packageType: packageType,
        userId: JSON.parse(sessionStorage.getItem('auth'))?.id,
        extraFeatures: extFeatures,
        date: date,
        bookingType: packageType,
        totalWash: totalWash,
        amount: couponApplied?subTotal:amount,
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
      };
      const res= await Api.codPayment(data);
      if (res.status == '200') {
        // setDesc(res);
        // alert("hello1");
        // console.log(data);
        // setDesc(res);
        // await Notifications.successMsg('Booking Confirmed');
        // await Notifications.successMsg('Booking Confirmed');
        handleShowBooking();
        // window.location.reload();
      } else {
        await Notifications.errorMsg('Something went wrong. Try Again!');
        window.location.reload();
      }
    }
  }
  function resetForm() {
  }
  async function applyCoupon() {
    const data={
      code: code,
    };
    const res= await Api.linkByCode(data); // get user by code
    if (res.status == '200') {
      setLink(res.data);
      const data1={
        userId: res.data.userId,
        planId: packageId,
      };
      const res1= await Api.linkDescByPlanAndUser(data1); // get user by code
      if (res1.status == '200') {
        setLinkDes(res1.data);
        setCouponApplied(true);
        if (res1.data.type == 'absolute') {
          setAffiliateCommission(res1.data.commission);
          setUserDiscount(res1.data.discount);
          setSubTotal(parseInt(amount)-parseInt(res1.data.discount));
          setAffiliateId(res1.data.userId);
          setCode('');
          await Notifications.successMsg('Coupon Applied');
        } else {
          setAffiliateCommission((parseInt(amount)*(res1.data.commission)/100));
          setUserDiscount((parseInt(amount)*(res1.data.discount)/100));
          setSubTotal(parseInt(amount)-
          (parseInt(amount)*(res1.data.discount)/100));
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
      <div className='main'>
        <div className='container-fluid'>
          <div className='row d-flex'>
            <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 c1'>
              <div className='p-3'>
                {/* <h1>Welcome to </h1>*/}
                {/* <h1>Car Wash </h1>*/}
                <img alt="" className='mt-2 mb-2'
                  src={logo} width={200} height={130}/>
                {/* <p>Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Animi atque blanditiis
                dolorum, esse eveniet illum, laboriosam laudantium
                libero modi mollitia neque obcaecati officiis perspiciatis
                placeat possimus quam quasi, tempora tempore.</p> */}
                {
                 showMobileScreen?
                  <>
                    <div className='container-fluid multi-step p-1'>
                      <div className='row'>
                        <div className='col-xl-12 col-lg-12 col-md-12
                         col-sm-12 multi-links'>
                          <div>
                            <Badge pill bg="primary">
                                                                1
                            </Badge><span className="badgeDesc"> Mobile Number</span>
                          </div>
                          <div>
                            <Badge pill bg="primary">
                                                                2
                            </Badge><span className="badgeDesc"> OTP</span>
                          </div>
                          <div>
                            <Badge pill bg="primary">
                                                                3
                            </Badge><span className="badgeDesc"> Vehiche Type</span>
                          </div>
                          <div>
                            <Badge pill bg="primary">
                                                                4
                            </Badge><span className="badgeDesc"> Plan</span>
                          </div>
                          <div>
                            <Badge pill bg="primary">
                                                                5
                            </Badge><span className="badgeDesc"> Add on</span>
                          </div>
                          <div>
                            <Badge pill bg="primary">
                                                                6
                            </Badge><span className="badgeDesc"> Confirm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='sign-cont mt-5'>
                      <div className='sign-form'>
                        <button onClick={()=>{
                          setDesc('testing feature'); handleShowBooking();
                        }}
                        className='btn btn-secondary customButtonColor'>
                            Read more</button>
                        <button onClick={()=>{
                          setDesc('testing feature'); handleShow();
                        }}
                        className='btn btn-secondary customButtonColor'>
                            Read more</button>
                        <form onSubmit={getOtp}>
                          <div className=' load-form'>
                            <div className=' load-input-wrapper'>
                              <div className=' load-input'>
                                <label>Phone</label>
                                <input required type={'phone'}
                                  placeholder="Enter phone number"
                                  min={10} max={10}
                                  minLength={10} maxLength={10}
                                  className='form-input_ input'
                                  value={phone} onChange={(e)=>{
                                    setPhone(e.target.value);
                                  }} />
                              </div>
                            </div>
                            <div className='sign-forget'>
                              {/* <Link to={'/reset-password'}>
                               Forgot Password?</Link>*/}
                            </div>
                            <div className='form-buttons'>
                              <button type={'submit'}
                                style={{fontSize: '14px',
                                  background: '#FF7B00'}}
                                className='button-primary'>Get OTP</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </> :''
                }
                {
                showOtpScreen?
                <>
                  <div className='container-fluid multi-step p-1'>
                    <div className='row'>
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                        <div>
                          <Badge pill bg="primary">
                            <i className='fas fa-check'></i>
                          </Badge><span className="badgeDesc"> Mobile Number</span>
                        </div>
                        <div>
                          <Badge pill bg="primary">
                                                                2
                          </Badge><span className="badgeDesc"> OTP</span>
                        </div>
                        <div>
                          <Badge pill bg="primary">
                                                                3
                          </Badge><span className="badgeDesc"> Vehiche Type</span>
                        </div>
                        <div>
                          <Badge pill bg="primary">
                                                                4
                          </Badge><span className="badgeDesc"> Plan</span>
                        </div>
                        <div>
                          <Badge pill bg="primary">
                                                                5
                          </Badge><span className="badgeDesc"> Add on</span>
                        </div>
                        <div>
                          <Badge pill bg="primary">
                                                                6
                          </Badge><span className="badgeDesc"> Confirm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='sign-cont mt-5'>
                    <div className='sign-form'>
                      <form onSubmit={verifyOtp}>
                        <div className=' load-form'>
                          <div className=' load-input-wrapper'>
                            <div className=' load-input'>
                              <label>OTP</label>
                              <input required type={'phone'} placeholder="Enter OTP" minLength={6} maxLength={6} className='form-input_ input' value={otp} onChange={(e)=>{
                                setOtp(e.target.value);
                              }} />
                            </div>
                          </div>
                          <div className='sign-forget'>
                            {/* <Link to={'/reset-password'}>Forgot Password?</Link>*/}
                          </div>
                          <div className='form-buttons'>
                            <button type={'submit'} style={{fontSize: '14px'}} className='button-primary'>Login</button>
                            {/* <button onClick={()=>{setShowMobileScreen(true);setShowOtpScreen(false)}} style={{ fontSize: '14px' }} className='button-primary'>Resend Otp</button>*/}
                          </div>
                          <div className='form-buttons mt-1'>
                            {/* <button type={'submit'} style={{ fontSize: '14px' }} className='button-primary'>Login</button>*/}
                            <button onClick={()=>{
                              setShowMobileScreen(true); setShowOtpScreen(false); setPhone(null);
                            }} style={{fontSize: '14px'}} className='button-primary'>Resend Otp</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </> :
                                        ''
                }
                {
                                    showCarScreen?
                                        <>
                                          <div className='container-fluid multi-step p-1'>
                                            <div className='row'>
                                              <div
                                                className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> Mobile Number</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> OTP</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                                3
                                                  </Badge><span className="badgeDesc"> Vehiche Type</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                                4
                                                  </Badge><span className="badgeDesc"> Plan</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                                5
                                                  </Badge><span className="badgeDesc"> Add on</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                                6
                                                  </Badge><span className="badgeDesc"> Confirm</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div style={{marginTop: '6%'}}>
                                            <p className='text-center '>
                                              <button style={{width: '50%'}} className={carType=='SUV'?'btn btn-primary':'btn btn-outline-primary'} onClick={()=>{
                                                setShowCarScreen(false); setShowPackagesTypeScreen(true); setCarType('SUV');
                                              }}>SUV</button>
                                            </p>
                                            <p className='text-center '>
                                              <button style={{width: '50%', marginTop: '2%'}} className={carType=='Sedan'?'btn btn-primary':'btn btn-outline-primary'} onClick={()=>{
                                                setShowCarScreen(false); setShowPackagesTypeScreen(true); setCarType('Sedan');
                                              }}>Sedan</button>
                                            </p>
                                            <p className='text-center mt-5'>
                                              <button style={{width: '50%', marginTop: '2%'}} className='btn btn-warning' onClick={()=>{
                                                setShowMobileScreen(true); setShowOtpScreen(false); setShowCarScreen(false); setPhone(null);
                                              }}>Resend OTP</button>
                                            </p>
                                          </div>
                                        </> :
                                        ''
                }
                {
                                    showPackagesTypeScreen?
                                        <>
                                          <div className='container-fluid multi-step p-1'>
                                            <div className='row'>
                                              <div
                                                className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> Mobile Number</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> OTP</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> Vehiche Type</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                                4
                                                  </Badge><span className="badgeDesc"> Plan</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                                5
                                                  </Badge><span className="badgeDesc"> Add on</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                                6
                                                  </Badge><span className="badgeDesc"> Confirm</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div style={{marginTop: '6%'}}>
                                            <p className='text-center '>
                                              <button style={{width: '50%'}}
                                                className='btn btn-outline-primary' onClick={async ()=>{
                                                  setShowPackagesTypeScreen(false);
                                                  setshowMonthlySubPackage(false);
                                                  setShowPackagesScreen(true);
                                                  setTotalWashWeek(1);
                                                  setPackageType('onetime');
                                                  await getPackages(carType, 'onetime');
                                                }}>One Time Wash</button>
                                            </p>
                                            <p className='text-center '>
                                              <button style={{width: '50%', marginTop: '2%'}}
                                                className='btn btn-outline-primary' onClick={async ()=>{
                                                  setshowMonthlySubPackage(true); setPackageType('monthly');
                                                  await getPackages(carType, 'monthly');
                                                }}>Monthly Packages</button>
                                            </p>
                                            {showMonthlySubPackage?
                    <div className='container-fluid mt-2'
                      style={{background: 'white'}}>
                      <div className='row p-3'>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>
                            <input name="monthlyPack" type='radio' onClick={async ()=>{
                              setShowPackagesTypeScreen(false);
                              setShowPackagesScreen(true);
                              setTotalWashWeek(4);
                              setshowMonthlySubPackage(false);
                            }} />
                          </p>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>1 wash a week</p>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>4 wash total</p>
                        </div>
                      </div>
                      <div className='row p-3'>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>
                            <input name="monthlyPack" type='radio'
                              onClick={async ()=>{
                                setShowPackagesTypeScreen(false);
                                setShowPackagesScreen(true);
                                setshowMonthlySubPackage(false);
                                setTotalWashWeek(8);
                              }} />
                          </p>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>2 wash a week</p>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>8 wash total</p>
                        </div>
                      </div>
                      <div className='row p-3'>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>
                            <input name="monthlyPack" type='radio'
                              onClick={async ()=>{
                                setShowPackagesTypeScreen(false);
                                setShowPackagesScreen(true);
                                setTotalWashWeek(12);
                                setshowMonthlySubPackage(false);
                              }} />
                          </p>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>3 wash a week</p>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                          <p>12 wash total</p>
                        </div>
                      </div>
                    </div> :
                    ''}
                                            <p className='text-center mt-4'>
                                              <button style={{width: '50%', marginTop: '2%'}}
                                                className='btn btn-outline-secondary customButtonColor'
                                                onClick={async ()=>{
                                                  setShowPackagesTypeScreen(false);
                                                  setShowCarScreen(true);
                                                }}>Previous</button>
                                            </p>
                                          </div>
                                        </> :''
                }
                {
    showPackagesScreen?
      <>
        <div className='container-fluid multi-step p-1'>
          <div className='row'>
            <div
              className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
              <div>
                <Badge pill bg="primary">
                  <i className='fas fa-check'></i>
                </Badge><span className="badgeDesc"> Mobile Number</span>
              </div>
              <div>
                <Badge pill bg="primary">
                  <i className='fas fa-check'></i>
                </Badge><span className="badgeDesc"> OTP</span>
              </div>
              <div>
                <Badge pill bg="primary">
                  <i className='fas fa-check'></i>
                </Badge><span className="badgeDesc"> Vehiche Type</span>
              </div>
              <div>
                <Badge pill bg="primary">
                                                                4
                </Badge><span className="badgeDesc"> Plan</span>
              </div>
              <div>
                <Badge pill bg="primary">
                                                                5
                </Badge><span className="badgeDesc"> Add on</span>
              </div>
              <div>
                <Badge pill bg="primary">
                                                                6
                </Badge><span className="badgeDesc"> Confirm</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop: '6%'}}>
          <div className='container-fluid'>
            {
              packages?.map((itm, i)=>(
                <div className='row mt-1 p-1' style={{background: 'white'}} >
                  <div className='col-lg-3 col-md-3 col-sm-3'><input onClick={()=>{
                    setShowPackagesScreen(false);
                    setShowExtraScreen(true);
                    setPackageId(itm.id);
                    calculateAmount(itm.price);
                  }} type={'radio'}/></div>
                  <div
                    className='col-lg-3 col-md-3 col-sm-3'>{itm.name}</div>
                  <div
                    className='col-lg-3 col-md-3 col-sm-3'>{itm.price} AED</div>
                  <div className='col-lg-3 col-md-3 col-sm-3'>
                    <button onClick={()=>{
                      setDesc(itm.feature1); handleShow();
                    }} className='btn btn-secondary customButtonColor'>Read more</button>
                  </div>
                </div>
              ))
            }
            <p className='text-center mt-4'>
              <button style={{width: '50%', marginTop: '2%'}} className='btn btn-outline-secondary customButtonColor' onClick={async ()=>{
                setShowPackagesScreen(false); setShowPackagesTypeScreen(true);
              }}>Previous</button>
            </p>
          </div>
          {/* <p class={'text-center mt-3'}><button className={'p-1'} >Next</button></p>*/}
        </div>
      </> :
                                        ''
                }
                {
      showExtraScreen?
      <>
        <div className='container-fluid multi-step p-1'>
          <div className='row'>
            <div
              className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
              <div>
                <Badge pill bg="primary">
                  <i className='fas fa-check'></i>
                </Badge><span className="badgeDesc"> Mobile Number</span>
              </div>
              <div>
                <Badge pill bg="primary">
                  <i className='fas fa-check'></i>
                </Badge><span className="badgeDesc"> OTP</span>
              </div>
              <div>
                <Badge pill bg="primary">
                  <i className='fas fa-check'></i>
                </Badge><span className="badgeDesc"> Vehiche Type</span>
              </div>
              <div>
                <Badge pill bg="primary">
                  <i className='fas fa-check'></i>
                </Badge><span className="badgeDesc"> Plan</span>
              </div>
              <div>
                <Badge pill bg="primary">
                                                                5
                </Badge><span className="badgeDesc"> Add on</span>
              </div>
              <div>
                <Badge pill bg="primary">
                                                                6
                </Badge><span className="badgeDesc"> Confirm</span>
              </div>
            </div>
          </div>
        </div>
        {/* <button className='mt-5 mb-2 p-1' onClick={()=>{setExtFeatures([])}}>Reset</button>*/}
        <div style={{marginTop: '4%'}}>
          {
            extraFeatures?.map((itm, i)=>(
              <div className='container-fluid mt-2' style={{background: 'white'}}>
                <div className='row p-3'>
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                    <p>
                      <input type='checkbox' onClick={async ()=>{
                        addOrRemoveExtFeatures(itm.id); calculateAmount(itm.price);
                      }} />
                    </p>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                    <p>{itm.name}</p>
                  </div>
                  {/* <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3'>*/}
                  {/*    <p>{itm.time} min</p>*/}
                  {/* </div>*/}
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                    <p>{itm.price} AED</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <p className={'text-center mt-4'}><button className='btn btn-primary customButtonColor' style={{width: '100px'}} onClick={()=>{
          setShowExtraScreen(false); setShowBookingScreen(true);
        }}>Next</button></p>
        <p className={'text-center mt-2'}><button className='btn btn-primary customButtonColor' style={{width: '100px'}} onClick={()=>{
          resetAmount(); setShowExtraScreen(false); setShowPackagesScreen(true);
        }}>Previous</button></p>
      </> :
                                        ''
                }
                {
                                    showBookingScreen?
                                        <>
                                          <div className='container-fluid multi-step p-1'>
                                            <div className='row'>
                                              <div
                                                className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> Mobile Number</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> OTP</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> Vehiche Type</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> Plan</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                    <i className='fas fa-check'></i>
                                                  </Badge><span className="badgeDesc"> Add on</span>
                                                </div>
                                                <div>
                                                  <Badge pill bg="primary">
                                                                6
                                                  </Badge><span className="badgeDesc"> Confirm</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='mt-4'>
                                            {
                                                    (packageType == 'onetime')?
                                                        <div className='container-fluid mt-2 p-4' style={{border: '3px solid blue', borderRadius: '10px'}}>
                                                          <div className='row'>
                                                            <div
                                                              className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                              <label>Date</label>
                                                              <input required onChange={(e) => {
                                                                setDate(e.target.value);
                                                              }} className='form-control' type={'date'}/>
                                                            </div>
                                                            <div
                                                              className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                              <label>Time Slot</label>
                                                              <select className='form-control' required
                                                                onChange={(e) => {
                                                                  setTime(e.target.value);
                                                                }}>
                                                                <option>Select</option>
                                                                {
                                                                  slots?.map((itm, i) => (
                                                                    <option
                                                                      value={itm.time}>{itm.time}</option>
                                                                  ))
                                                                }
                                                              </select>
                                                            </div>
                                                          </div>
                                                        </div>:''
                                            }
                                            {
                                                    (usr?.email == '' || usr?.email == null)?
                                                        <>
                                                          <div className='container-fluid mt-4 p-1' style={{border: '3px solid blue', borderRadius: '10px'}}>
                                                            <div className='row'>
                                                              <div
                                                                className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                <label>Name</label>
                                                                <input required value={usrName} onChange={(e)=>{
                                                                  setUsrName(e.target.value);
                                                                }} className='form-control' type={'text'}/>
                                                              </div>
                                                              {/* <div
                                                                        className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                        <label>Email</label>
                                                                        // <input required value={usrEmail} onChange={(e)=>{setUsrEmail(e.target.value)}}  className='form-control' type={'email'}/>
                                                                    </div> */}
                                                              <div
                                                                className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                <label>Apt no. or Building Name </label>
                                                                <input required value={usrAddress} onChange={(e)=>{
                                                                  setUsrAddress(e.target.value);
                                                                }} className='form-control' type={'text'}/>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </>:
                                                        ''
                                            }
                                            <div className='mt-4 p-2' style={{border: '3px solid blue', borderRadius: '10px'}}>
                                              <div className='container-fluid mt-2'>
                                                <div className='row'>
                                                  <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                    <label>Brand</label>
                                                    <input required onChange={(e)=>{
                                                      setBrand(e.target.value);
                                                    }} value={brand} className='form-control' type={'text'}/>
                                                  </div>
                                                  <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                    <label>Plate No</label>
                                                    <input required onChange={(e)=>{
                                                      setPlate(e.target.value);
                                                    }} value={plate} className='form-control' type={'text'}/>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='container-fluid mt-2'>
                                                <div className='row'>
                                                  <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                    <label>Model</label>
                                                    <input required onChange={(e)=>{
                                                      setModel(e.target.value);
                                                    }} value={model} className='form-control' type={'text'}/>
                                                  </div>

                                                  <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                    <label>Color</label>
                                                    <input required onChange={(e)=>{
                                                      setColor(e.target.value);
                                                    }} value={color} className='form-control' type={'text'}/>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='container-fluid mt-2'>
                                                <div className='row'>
                                                  <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                    <label>Parking Floor</label>
                                                    <input required onChange={(e)=>{
                                                      setParkingFloor(e.target.value);
                                                    }} value={parkingFloor} className='form-control' type={'text'}/>
                                                  </div>
                                                  <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                    <label>Parking No</label>
                                                    <input required onChange={(e)=>{
                                                      setParkingNo(e.target.value);
                                                    }} value={parkingNo} className='form-control' type={'text'}/>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='container-fluid mt-5' style={{background: 'gray', borderRadius: '10px'}}>
                                            <div className='row p-3 ' >
                                              <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                <label><b>Coupon</b></label>
                                                <input value={code} onChange={(e)=>{
                                                  setCode(e.target.value);
                                                }} className='form-control' placeholder={'Enter Coupon'} type={'text'}/>
                                              </div>
                                              <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                <label style={{visibility: 'hidden'}}>Coupon</label>
                                                <button onClick={applyCoupon} className={'btn btn-primary'}>Apply</button>
                                              </div>

                                            </div>
                                          </div>

                                          <div className='mt-5 justify-content-center'>
                                            {/* <br/>*/}
                                            <h4 className={'text-center'}><b>Total: </b>{amount} AED</h4>
                                            <h4 className={'text-center'}><b>Discount: </b>{couponApplied?userDiscount:'0'} AED</h4>
                                            <h4 className={'text-center'}><b>Subtotal: </b>{couponApplied?subTotal:'0'} AED</h4>
                                            <p className='text-center mt-4 '>
                                              <StripeCheckout
                                                name={'Pay '+couponApplied?subTotal:amount+'.00'}
                                                amount={couponApplied?subTotal*100:amount*100} // cents
                                                currency="AED"// the pop-in header title
                                                token={onToken}
                                                stripeKey="pk_test_51LXoKNA82nvbi04Cmtz1dSfDSzwo3cYWyhHL1SqeoWxtMqfEIsA25M9VPayqiAVn6acHmUyHm9UJXTR6WggyOfXZ00AWulYq4G"
                                              />
                                              {/* <button onClick={submitForm}>Get</button>*/}
                                            </p>
                                            <p className={'text-center mt-2'}>
                                              <button className='btn  btn-danger' style={{width: '90px'}} onClick={()=>{
                                                resetAmount(); setShowPackagesScreen(false); setShowBookingScreen(false); setShowExtraScreen(true);
                                              }}>
                                                      Previous
                                              </button>
                                            </p>

                                          </div>
                                          {
                                                (codeStatus?.status == 'true')?
                                                    <div className='mt-3 justify-content-center'>
                                                      {/* <br/>*/}
                                                      <h4 className={'text-center'}>
                                                        <button onClick={payWithCode} className='btn btn-primary'>Pay With COD</button>
                                                      </h4>
                                                    </div>:
                                                    ''
                                          }

                                        </> :
                                        ''
                }
              </div>
            </div>

            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 c2'>
              <div className={'faqs p-1'}>
                <h5 style={{marginTop: '5%'}} className={'text-center'}>How can we Help you ?</h5>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>What payment methods exist in your company?
                    </Accordion.Header>
                    <Accordion.Body>
                                            Direct back transfer ,Debit and credit card.

                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>How do I book car wash service ?
                    </Accordion.Header>
                    <Accordion.Body>
                                            All car wash package available in booking tab

                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>How do I make changes to an active order?
                    </Accordion.Header>
                    <Accordion.Body>
                                            Once you’ve placed an order, you cannot change or reschedule it via the online. If you want to make changes to a scheduled delivery, kindly contact our team.

                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>What was Refund policy ?
                    </Accordion.Header>
                    <Accordion.Body>
                                            One time wash refund policy not applicable ,All monthly package booking please request to contact our team.

                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>What was the day you wash monthly package ?
                    </Accordion.Header>
                    <Accordion.Body>
                                            All monthly package days and date decide by our team, make sure to choose  convenient days and date before booking done.

                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>What was product you use for washing ?
                    </Accordion.Header>
                    <Accordion.Body>
                                            All of our products are safety certified by Dubai Municipality department

                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>Is your team professional ?</Accordion.Header>
                    <Accordion.Body>
                                            yes, all our teams are well trained for washing ,As per policy we giving important for safety for avoid scratches and paint fade which is long term effect this reason we use micro fiber towel and concentrate product for body shine.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>How do you make sure perfect wash every time ?

                    </Accordion.Header>
                    <Accordion.Body>
                                            In order to receive perfect wash kindly use our feedback and suggestion portal each time get washed !


                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="8">
                    <Accordion.Header>How do I use a promotional code ?
                    </Accordion.Header>
                    <Accordion.Body>
                                            There is so many way to redeem coupon:- 1-Any situation eco friendly car wash issued coupon can use while booking 2-Any situation third person or party offer you coupon code or link that can be redeem.

                    </Accordion.Body>
                  </Accordion.Item>
                  {/* new */}
                  <Accordion.Item eventKey="9">
                    <Accordion.Header>What is water-less car wash ?
                    </Accordion.Header>
                    <Accordion.Body>
                                        A water–less car wash is an eco-friendly and efficient car washing that uses little or no water. Sometimes it is also known as a spray wash It also allows the car detailer to service your car in narrow spaces while saving surprising amounts of water. Water-less products are more advanced than regular soap used for a mobile car wash as they need to compensate for the lack of water. Thus, the efficiency of the water-less wash is usually better than using water-based methods. Plus, when doing a water-less car detailing, you only need a bucket of water to rinse your towels instead of using between 50 to 100 gallons of clean water when using a pressure washer or a hose.<br>
                      </br>
                                        A water-less car wash just requires 4 – 6 oz of water-less wash formula used per car and a couple of buckets of water. In the cases where the car is caked in mud, you require an additional gallon of water.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>How does a Water-less Car Wash work?
                    </Accordion.Header>
                    <Accordion.Body>
                                        A water-less car wash uses high lubricity sprays to polish and wash the vehicle’s bodywork. The spray’s high lubricity chemicals encapsulate dirt and dust particles. This process is similar to how water removes dirt, but the chemical combination of a water-less car wash product is more efficient. You have to simply spray the surface of the car and then wipe it off. This process removes any light dirt or stains from the car’s surface. It works ideally for cars that don’t have thick dried mud to clean. A water-less wash is only recommended for cars with light dirt.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>Eco-Friendly Car Washing: The Waterless Way
                    </Accordion.Header>
                    <Accordion.Body>
                                        A car wash can get expensive, but it doesn’t have to be that way. If you’re looking to save money and the environment, then read on for all the information you need about how to waterless car wash your vehicle, so you can enjoy the same shiny-clean look without wasting all that water. The best part? You don’t even need any special equipment to do it!
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>What is an eco-friendly car wash?
                    </Accordion.Header>
                    <Accordion.Body>
                                        Eco friendly car washing is an innovative way to clean your vehicle without water. They utilize environmentally conscious products, such as recycled water, recyclable buckets and biodegradable soaps in order to minimize their impact on Mother Earth. Plus, they’re convenient! No need to find a home car wash Dubai or eco-friendly auto spa; these car washes can be found right in your own driveway.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>What is an eco-friendly car wash?
                    </Accordion.Header>
                    <Accordion.Body>
                                        Eco friendly car washing is an innovative way to clean your vehicle without water. They utilize environmentally conscious products, such as recycled water, recyclable buckets and biodegradable soaps in order to minimize their impact on Mother Earth. Plus, they’re convenient! No need to find a home car wash Dubai or eco-friendly auto spa; these car washes can be found right in your own driveway.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>Why is it a good idea to use an eco-friendly car wash?
                    </Accordion.Header>
                    <Accordion.Body>
                                        Cleaning your car using an eco-friendly method has many benefits. If you are looking to lower your carbon footprint or if you simply want to care for our planet, waterless car wash is a great way to do it.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>What are the benefits of using an eco-friendly car wash?
                    </Accordion.Header>
                    <Accordion.Body>
                                        Admittedly, a waterless car wash can’t offer quite as deep a clean. However, it also leaves no residue, it doesn’t require you to use hundreds of gallons of water and it won’t pollute local waterways. If that doesn’t make you want to switch your cleaning habits, we don’t know what will!
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>How do you go about getting your own eco-friendly vehicle?
                    </Accordion.Header>
                    <Accordion.Body>
                                        If you want to start car washing on your own, follow these steps and you’ll be ready to clean up in no time! First, identify what kind of car wash service you want to run. Do you want a one stop shop for all things auto? If so, take some classes at a trade school or community college where they can teach you how to perform oil changes, tire rotations and other basic automotive maintenance.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>Where can you find more information on using eco-friendly waterless cars?

                    </Accordion.Header>
                    <Accordion.Body>
                                        In any country, we don’t want to see our water resources dwindling away or getting polluted. If your customers are drivers, who have to car wash from time to time, let them know that there is a safe and effective way for cleaning your vehicle without wasting water. Simply start by getting a home car wash in Dubai, as it offers all necessary accessories for fast and easy care of your vehicle at home.
                    </Accordion.Body>
                  </Accordion.Item>
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
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         Get connected with us on social networks:</span>
              </div>
              {/* Left */}
              {/* Right */}
              <div>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-twitter" />
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-google" />
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-instagram" />
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-github" />
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
                    <h6 className="text-uppercase fw-bold">ECO Friendly Carwash</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{width: 60, backgroundColor: '#0D6EFD', height: 2}}
                    />
                    <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
                    </p>
                  </div>
                  {/* Grid column */}

                  {/* Grid column */}
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold">Useful links</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{width: 60, backgroundColor: '#0D6EFD', height: 2}}
                    />
                    <p>
                      <a href="" className="text-white" onClick={()=>{
                        history.push('/sign-in');
                      }}>
                  Login
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white">
                  About Us
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white">
                  Privacy & Terms
                      </a>
                    </p>
                  </div>
                  {/* Grid column */}
                  {/* Grid column */}
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold">Contact</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{width: 60, backgroundColor: '#0D6EFD', height: 2}}
                    />
                    <p>
                      <i className="fas fa-phone mr-3" /><a href="tel:+971-562871522">+971-562871522</a>
                    </p>
                    <p>
                      <i className="fas fa-envelope mr-3" /><a href="mailto:info@ecofriendlycarwash.ae">info@ecofriendlycarwash.ae</a>
                    </p>
                    <p>
                      <i className="fas fa-map-marker mr-3" />  Suite 17, The Iridium Building,Umm &nbsp;&nbsp;&nbsp;&nbsp;Suqeim Road,Al Barsha Dubai
                    </p>
                    <p>
                      <i className="fas fa-globe mr-3" /><a href="http://www.ecofriendlycarwash.ae">www.ecofriendlycarwash.ae</a>
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
              <a className="text-white" href="" >
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
          <textarea className='form-control' disabled cols={55} rows={10}>{desc}</textarea>
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
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered
        show={showBooking}
        backdrop="static" keyboard={ false }
      >
        <Modal.Header centered>
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
        <Modal.Body centered>
          <div className="text-center">
            <img src={checkIcon} className="checkIcon"
              alt="Check mark" centered></img>
          </div>
          <div className="text-center text-primary">
            <h3>Thanks for choosing us!</h3>
          </div>
          <div className="text-center">
                    Your booking has been Completed.
          </div>
          {/* <textarea className='form-control' disabled cols={55} rows={10}>{desc}</textarea> */}
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
                If you need any clarrification Kindly
                contact us whatsapp or call +971-562871522.
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Website;
