import React, {useEffect, useState} from 'react';
import Api from '../../../../../apis/apis';
import Notifications from '../../../../../notifications/notifications';
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {Editor} from '@tinymce/tinymce-react';

function AddPlan() {
  const history=useHistory();

  const [car, setCar]=useState(null);
  const [name, setName]=useState(null);
  const [time, setTime]=useState(null);
  const [price, setPrice]=useState(null);
  const [wash, setWash]=useState(0);
  const [fea1, setFea1]=useState(null);
  const [planType, setPlanType]=useState(null);
  const [monthlyInput, setMonthlyInput]=useState(false);


  function resetForm() {
    setCar('');
    setName('');
    setTime('');
    setPrice('');
    setFea1('');
    setPlanType('');
  }

  async function submitForm(e) {
    e.preventDefault();

    const data={
      carType: car,
      name: name,
      time: time,
      price: price,
      wash: wash,
      feature1: fea1,
      planType: planType,
    };

    const res=await Api.adminAddPlan(data);


    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      history.push('/plans');
    } else {
      await Notifications.errorMsg(res.message);
    }
    resetForm();
  }
  return (
    <>
      <h3 className='dashboard-head-title'>Add Plans</h3>
      <form onSubmit={submitForm}>
        <div className=' load-form'>
          <div className=' load-input-wrapper'>
            <div className=' load-input'>
              <label>Select Car</label>
              <select required className={'form-input_ input'} onChange={(e)=>setCar(e.target.value)}>
                <option value="---">Select</option>
                <option value={'SUV'}>SUV</option>
                <option value={'Sedan'}>Sedan</option>
              </select>
            </div>
            <div className=' load-input'>
              <label>Name </label>
              <input value={name} onChange={(e)=>{
                setName(e.target.value);
              }} required type={'text'} placeholder="Enter Plan Name" className='form-input_ input' />
            </div>
            {/* <div className=' load-input'>*/}
            {/*    <label>{`Time`}</label>*/}
            {/*    <input value={time} onChange={(e)=>{setTime(e.target.value)}} required type={'number'} placeholder="Enter Time" className='form-input_ input' />*/}
            {/* </div>*/}
            <div className=' load-input'>
              <label>Price</label>
              <input value={price} onChange={(e)=>{
                setPrice(e.target.value);
              }} required type={'number'} placeholder="Enter Price" className='form-input_ input' />
            </div>
            <div className=' load-input'>
              <label>Plan Type </label>
              <select className='form-input_ input' onChange={(e)=>{
                setPlanType(e.target.value);
                {e.target.value=='monthly'?setMonthlyInput(true):setMonthlyInput(false);}
              }}>

                <option value={'select'}>Select</option>
                <option value={'onetime'}>One Time</option>
                <option value={'monthly'}>Monthly</option>
              </select>
              {/* <input value={name} onChange={(e)=>{setName(e.target.value)}} required type={'text'} placeholder="Enter Plan Name" className='form-input_ input' />*/}
            </div>
            {monthlyInput?
            <div className=' load-input'>
              <label>Wash per Month</label>
              <input value={wash} onChange={(e)=>{
                setWash(planType=='monthly'?e.target.value:0);
              }} type={'number'} placeholder="Enter Wash Per Month" className='form-input_ input' />
            </div>:''
            }
            <div className=' load-input'>
              <label>Features</label>
              <textarea className='form-control' cols={100} rows={10} onChange={(e)=>setFea1(e.target.value)}></textarea>
              {/* <input value={fea1} onChange={(e)=>{setFea1(e.target.value)}} required type={'text'} placeholder="Enter Feature Name" className='form-input_ input' />*/}
            </div>
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

export default AddPlan;
