import './signin.css';
import React, {useState} from 'react';
import logo from '../../assets/images/logo.png';
import {Link, useHistory} from 'react-router-dom';
import Notifications from '../../notifications/notifications';
import Api from '../../apis/apis';
import {useRecoilState} from 'recoil';
import {_authData, _checkLogin} from '../../data/atom';
import validator from 'validator';


function UserSignIN() {
  const history = useHistory();

  const [authData, setAuthData]=useRecoilState(_authData);

  const [loginData, setData]=useState(null);
  const [phone, setPhone]=useState(null);
  const [email, setEmail]=useState(null);
  // let [password,setPassword]=useState(null);


  function resetForm() {
    setEmail('');
    // setPassword("");
  }

  async function submitForm(e) {
    e.preventDefault();
    let data;
    if (validator.isEmail(loginData)) {
      data={ // form data
        'email': loginData,
        'type': 'email',
        // "password": password
      };
    } else if (validator.isMobilePhone(loginData)) {
      data={ // form data
        'phone': loginData,
        'type': 'phone',
        // "password": password
      };
      console.log('phoneNumber');
    } else {
      console.log('Invalid Response');
    }


    console.log(data);
    const resp=await Api.userSignIn(data); // call admin signup api

    if (resp.status == '200') // if response 202
    {
      await Notifications.successMsg(resp.message);
      history.push('/verify-otp');
      // if (resp.type == 'affiliate')
      // {
      //     sessionStorage.setItem('auth',JSON.stringify(resp));
      //     sessionStorage.setItem('token',resp.token);
      //     setAuthData(resp);
      //     history.push('/affiliate-dashboard')  // if response 202
      // }
      // else if (resp.type == 'cleaner')
      // {
      //     sessionStorage.setItem('auth',JSON.stringify(resp));
      //     sessionStorage.setItem('token',resp.token);
      //     setAuthData(resp);
      //     //history.push('/dashboard')  // if response 202
      // }
      // else
      // {
      //     sessionStorage.setItem('auth',JSON.stringify(resp));
      //     sessionStorage.setItem('token',resp.token);
      //     setAuthData(resp);
      //     //history.push('/dashboard')  // if response 202
      // }
    } else {
      await Notifications.errorMsg(resp.message);
    }

    resetForm();
  }


  return (

    <div className='sign-parent'>
      <div className='sign-logo'>
        <img className={'logo'} src={logo} alt="" />
      </div>
      {global.config.i18n.currency.AED}
      <div className='sign-cont'>
        <div className='sign-form'>
          <form onSubmit={submitForm}>
            <div className=' load-form'>
              <h3>User Login</h3>
              {/* <p>Lorem Ipsum is simply text</p> */}
              <div className=' load-input-wrapper'>
                <div className=' load-input'>
                  <label>Email or Phone Number</label>
                  <input required type={'text'} placeholder="Enter Email Address / Phone Number" className='form-input_ input' value={loginData} onChange={(e)=>{
                    setData(e.target.value);
                  }} />
                </div>
              </div>
              <div className='sign-forget'>
                {/* <Link to={'/reset-password'}>Forgot Password?</Link>*/}
              </div>
              <div className='form-buttons'>
                <button type={'submit'} style={{fontSize: '14px', background: '#FF7B00'}} className='button-primary'>Get OTP</button>
              </div>
              <div style={{marginTop: '3%'}} className='form-buttons'>
                <button onClick={()=>{
                  history.push('/admin');
                }} type={'button'} style={{fontSize: '14px', background: '#FF7B00'}} className='button-primary'>Admin sign in</button>
              </div>
              <div className='sign-form-bottom'>
                <p>Don’t have an account? <Link to="/sign-up">Sign Up</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSignIN;


// <button onClick={() => {
//     history.push('/')
//     sessionStorage.setItem('authData', 'auth')
// }} style={{ fontSize: '14px' }} className='button-primary'>Login</button>
