import React, {useState, useEffect} from 'react';
import add from '../../../../../assets/images/add.png';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Api from '../../../../../apis/apis';
import Notifications from '../../../../../notifications/notifications';


function AffiliateLinks() {
  const history=useHistory();

  const [links, setLinks]=useState(null);
  const [plans, setPlans]=useState(null);
  const [linkView, setLinkView]=useState(null);
  const [selectedCode, setSelectedCode]=useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async ()=>{

    const res3=await Api.getAllPlans();
    if (res3.status == '200') {
      setPlans(res3.data);
    }
    const user=JSON.parse(sessionStorage.getItem('auth'));
    const data={
      id: user.id,
    };
    const res1=await Api.getAffiliateLinkByUser(data);
    if (res1.status == '200') {
      setLinks(res1.data);
    }


    // initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $('#example').DataTable();
      }, 500);
    });
  }, []);


  // async function refreshRecord() {
  //     let tempData=await Api.getAllBrokers();
  //     console.log(tempData)
  //     setData(tempData.data);
  // }

  async function viewLinkDetailsFun(code) {
    console.log('groot');
    const data={
      code: code,
    };
    const res2=await Api.getLinkDetails(data);
    if (res2.status == '200') {
      setLinkView(res2.data);
    }
  }


  function copy(that) {
    const inp =document.createElement('input');
    document.body.appendChild(inp);
    inp.value =that.textContent;
    inp.select();
    document.execCommand('copy', false);
    inp.remove();
  }

  return (
    <>
      <div className='driver-head'>
        <h3 className='dashboard-head-title'>Links</h3>
        <div>
          {/* <div className='nav-buttons'>*/}
          {/*    <button onClick={handleShow} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Generate Link</button>*/}
          {/* </div>*/}
        </div>
      </div>
      <div className='dashboard-table-wrapper_ p-3'>
        <table id="example" className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>CODE</th>
              {/* <th>LINK</th>*/}
              <th>TYPE</th>
              {/* <th>AFFILIATE DISCOUNT</th>*/}
              {/* <th>USER DISCOUNT</th>*/}
              {/* <th>USED</th>*/}
              {/* <th>PHONE</th>*/}
              {/* <th>TOTAL EARNING</th>*/}
              {/* <th>PAID</th>*/}
              {/* <th>NOT PAID</th>*/}
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {
              links?.map((itm, i)=>(
                <tr>
                  <td>{itm.id}</td>
                  <td style={{cursor: 'pointer'}} onClick={()=>{
                    Notifications.successMsg('Code Copied'); navigator.clipboard.writeText(itm.code);
                  }}>{itm.code}</td>
                  {/* <td style={{cursor: 'pointer'}} onClick={()=>{Notifications.successMsg('Link Copied');navigator.clipboard.writeText(itm.link)}}>{itm.link}</td>*/}
                  <td>{itm.type}</td>
                  {/* <td>{itm.commission}</td>*/}
                  {/* <td>{itm.discount}</td>*/}
                  {/* <td>{itm.timesUsed}</td>*/}
                  {/* <td>{itm.phone}</td>*/}
                  {/* <td>{itm.total}</td>*/}
                  {/* <td>{itm.paid}</td>*/}
                  {/* <td>{itm.nonpaid}</td>*/}
                  <td><button onClick={() => {
                    viewLinkDetailsFun(itm.code);
                    handleShow();
                    setSelectedCode(itm.code);

                  }}
                  className={'btn btn-primary'}>View</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header centered closeButton>
          <h5 className="text-center modal-title w-100">Coupon Code - {selectedCode}</h5>
        </Modal.Header>
        <Modal.Body centered>
          <div className='dashboard-table-wrapper_ p-3'>
            <table id="example" className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>Car Type</th>
                  <th>Plan</th>
                  <th>TYPE</th>
                  <th>DISCOUNT</th>
                  <th>COMMISSION</th>
                  <th>TIME USD</th>
                </tr>
              </thead>
              <tbody>
                {
                  linkView?.map((itm, i)=>(
                    <tr>
                      <td>{itm.code}</td>
                      <td>{itm.carType}</td>
                      <td>{plans.find(plan => plan.id === itm.planId).name}</td>
                      <td>{itm.type}</td>
                      <td>{itm.commission}</td>
                      <td>{itm.discount}</td>
                      <td>{itm.timeUsed}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* <textarea className='form-control' disabled cols={55} rows={10}>{desc}</textarea> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <div className="text-center">
            If you need any clarrification Kindly contact us whatsapp or call
            +971-562871522.
          </div>
        </Modal.Footer> */}
      </Modal>

      {/* <Modal*/}
      {/*    show={show}*/}
      {/*    onHide={handleClose}*/}
      {/*    backdrop="static"*/}
      {/*    keyboard={false}*/}
      {/* >*/}
      {/*    <form>*/}
      {/*        <Modal.Header closeButton>*/}
      {/*            <Modal.Title>Withdraw Details</Modal.Title>*/}
      {/*        </Modal.Header>*/}
      {/*        <Modal.Body>*/}
      {/*            <label>Enter Amount</label>*/}
      {/*            <InputGroup className="mb-3" required>*/}
      {/*                <Form.Control*/}
      {/*                    required*/}
      {/*                    type='number'*/}
      {/*                    min='100'*/}
      {/*                    placeholder="Enter Amount"*/}
      {/*                    aria-label="Username"*/}
      {/*                    aria-describedby="basic-addon1"*/}
      {/*                />*/}
      {/*            </InputGroup>*/}
      {/*        </Modal.Body>*/}
      {/*        <Modal.Footer>*/}
      {/*            <Button variant="secondary" onClick={handleClose}>*/}
      {/*                Close*/}
      {/*            </Button>*/}
      {/*            <Button type={'type'} variant="primary">Save</Button>*/}
      {/*        </Modal.Footer>*/}
      {/*    </form>*/}
      {/* </Modal> */}
    </>
  );
}

export default AffiliateLinks;
