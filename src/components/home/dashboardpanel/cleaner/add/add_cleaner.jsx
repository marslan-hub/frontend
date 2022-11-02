import React, {useEffect, useState} from 'react';
import Api from '../../../../../apis/apis';
import Notifications from '../../../../../notifications/notifications';
import {useHistory} from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


function AddCleaner() {
  const history=useHistory();

  const [name, setName]=useState(null);
  const [email, setEmail]=useState(null);
  // let [password,setPassword]=useState(null);
  const [phone, setPhone]=useState(null);
  const [address, setAddress]=useState(null);


  function resetForm() {
    setName('');
    setPhone('');
    setEmail('');
    // setPassword("");
    setAddress('');
  }

  async function submitForm(e) {
    e.preventDefault();

    const data={
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    const res=await Api.adminAddCleaner(data);


    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      history.push('/cleaner');
    } else {
      await Notifications.errorMsg(res.message);
    }
    resetForm();
  }

  return (
    <>
      <h3 className='dashboard-head-title'>Add Cleaner</h3>
      <form onSubmit={submitForm}>
        <div className=' load-form'>
          <div className=' load-input-wrapper'>
            <div className=' load-input'>
              <label>Name</label>
              <input value={name} onChange={(e)=>{
                setName(e.target.value);
              }} required type={'text'} placeholder="Enter Name" className='form-input_ input' />
            </div>
            <div className=' load-input'>
              <label>Phone </label>
              <InputGroup className="mb-3 inline">
                <InputGroup.Text id="basic-addon1">
                                    +971
                </InputGroup.Text>
                <Form.Control
                  value={phone} onChange={(e)=>{
                    setPhone(e.target.value);
                  }} required type={'phone'} placeholder="Enter Phone" className='form-input_ input' maxLength={10} minLength={7}
                />
              </InputGroup>

            </div>
            <div className=' load-input'>
              <label>{`Email`}</label>
              <input value={email} onChange={(e)=>{
                setEmail(e.target.value);
              }} required type={'email'} placeholder="Enter Email" className='form-input_ input' />
            </div>
            <div className=' load-input'>
              <label>Address</label>
              <input value={address} onChange={(e)=>{
                setAddress(e.target.value);
              }} required type={'text'} placeholder="Enter Address" className='form-input_ input' />
            </div>
            {/* <div className=' load-input'>*/}
            {/*    <label>Password</label>*/}
            {/*    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type={'text'} placeholder="Enter Password" className='form-input_ input' />*/}
            {/* </div>*/}
          </div>
          <div className='form-buttons'>
            <button type={'submit'} className='button-primary'>Save Changes</button>
            {/* <button className='button-primary btn-cancel'>Cancel</button>*/}
          </div>
        </div>
      </form>
    </>
  );
}

export default AddCleaner;
