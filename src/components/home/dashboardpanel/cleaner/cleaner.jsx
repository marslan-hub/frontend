import React, {useState, useEffect} from 'react';
import './cleaner.css';
import add from '../../../../assets/images/add.png';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Api from '../../../../apis/apis';
import Notifications from '../../../../notifications/notifications';
const countryCode = global.config.i18n.country.AED;

function Cleaner() {
  const history=useHistory();

  const [cleaners, setCleaners]=useState(null);

  useEffect(async ()=>{
    const res=await Api.getAllCleaners();
    if (res.status == '200') {
      setCleaners(res.data);
    }

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

    const res= await Api.adminDeleteCleaner(data);

    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      await refreshRecord();
    }
  }

  async function refreshRecord() {
    const res=await Api.getAllCleaners();
    if (res.status == '200') {
      setCleaners(res.data);
    }
  }

  function editCleaner(id) {
    sessionStorage.setItem('cleanerId', id);
    history.push('/edit-cleaner');
  }


  return (
    <>
      <div className='driver-head'>
        <h3 className='dashboard-head-title'>Cleaners</h3>
        <div>
          <div className='nav-buttons'>
            <button onClick={()=>history.push('/add-cleaner')} style={{background: '#FF7B00', marginRight: '15px'}}><img src={add} alt="" />  Add Cleaner</button>
          </div>
        </div>
      </div>
      <div className='dashboard-table-wrapper_ p-3' >


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
            {cleaners?.map((itm, i)=>(
              <tr>
                <td>{itm.id}</td>
                <td>{itm.name}</td>
                <td>{itm.email}</td>
                <td>{itm.address}</td>
                <td>{countryCode}{itm.phone}</td>
                <td>{itm.reset_code}</td>
                <td><i onClick={()=>{
                  editCleaner(itm.id);
                }} style={{color: 'green', cursor: 'pointer'}} className={'fas fa-pen'}></i></td>
                <td><i onClick={async ()=>{
                  await Delete(itm.id);
                }} style={{color: 'red', cursor: 'pointer'}} className={'fas fa-trash'}></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cleaner;
