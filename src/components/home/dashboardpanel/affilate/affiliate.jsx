/* eslint-disable eqeqeq */
import React, {useState, useEffect} from 'react';
import add from '../../../../assets/images/add.png';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Api from '../../../../apis/apis';
import Notifications from '../../../../notifications/notifications';
const countryCode = global.config.i18n.country.AED;

function Affiliate() {
  const history=useHistory();
  const [affiliate, setAffiliate]=useState(null);
  useEffect(()=>{
    let res;
    const resFun = async () =>{
      res=await Api.getAllAffiliate();
      if (res.status == '200') {
        setAffiliate(res.data);
      }
    };
    resFun();
    // initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $('#example').DataTable();
      }, 500);
    });
  }, []);
  async function Delete(id) {
    const data={
      id: id,
    };
    const res= await Api.adminDeleteAffiliate(data);
    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      await refreshRecord();
    }
  }
  async function refreshRecord() {
    const res=await Api.getAllAffiliate();
    if (res.status == '200') {
      setAffiliate(res.data);
    }
  }
  function editAffiliate(id) {
    sessionStorage.setItem('affiliateId', id);
    history.push('/edit-affiliate');
  }
  return (
    <>
      <div className='driver-head'>
        <h3 className='dashboard-head-title'>Affiliates</h3>
        <div>
          <div className='nav-buttons'>
            <button onClick={()=>history.push('/add-affiliate')} style={{background: '#FF7B00', marginRight: '15px'}}><img src={add} alt="" />  Add Affiliate</button>
          </div>
        </div>
      </div>
      <div className='dashboard-table-wrapper_ p-3'>
        <table id="example" className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>RESET CODE</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              affiliate?.map((itm, i)=>(
                <tr>
                  <td>{itm.id}</td>
                  <td>{itm.name}</td>
                  <td>{itm.email}</td>
                  <td>{countryCode}{itm.phone}</td>
                  <td>{itm.address}</td>
                  <td>{itm.reset_code}</td>
                  <td onClick={()=>{
                    editAffiliate(itm.id);
                  }}><i style={{color: 'green', cursor: 'pointer'}} className={'fas fa-pen'}></i></td>
                  <td><i onClick={async ()=>{
                    await Delete(itm.id);
                  }} style={{color: 'red', cursor: 'pointer'}} className={'fas fa-trash'}></i></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Affiliate;
