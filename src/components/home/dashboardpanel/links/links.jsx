import React, {useState, useEffect} from 'react';
import add from '../../../../assets/images/add.png';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Api from '../../../../apis/apis';
import Notifications from '../../../../notifications/notifications';


function Links() {
  const history=useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setRequestType(false);
    resetForm();
  };
  const handleShow = () => setShow(true);


  const [plans, setPlans]=useState(null);
  const [plansSuv, setPlansSuv]=useState(null);
  const [plansSedan, setPlansSedan]=useState(null);
  const [plansDescSuv, setPlansDescSuv]=useState(null);
  const [plansDescSedan, setPlansDescSedan]=useState(null);
  const [affiliate, setAffiliate]=useState(null);
  const [links, setLinks]=useState(null);
  const [linksCode, setLinksCode]=useState(null);
  const [editIndex, setEditIndex]=useState(null);


  const [selectedAffiliate, setSelectedAffiliate]=useState(null);
  const [type, setType]=useState(null);
  const [affDiscount, setAffDiscount]=useState(null);
  const [userDiscount, setUserDiscount]=useState(null);
  const [reqType, setRequestType]=useState(false);

  useEffect(async ()=>{
    const data={
      car: 'SUV',
    };
    const res3=await Api.getAllPlansByCarType(data);
    if (res3.status == '200') {
      setPlansSuv(res3.data);
    }
    const data1={
      car: 'Sedan',
    };
    const res4=await Api.getAllPlansByCarType(data1);
    if (res4.status == '200') {
      setPlansSedan(res4.data);
      setPlansDescSedan(res4.data);
    }

    const res2=await Api.getAllPlans();
    if (res2.status == '200') {
      setPlans(res2.data);
    }


    const res1=await Api.getAllLinks();
    if (res1.status == '200') {
      setLinks(res1.data);
    }

    const res=await Api.getAllAffiliate();
    if (res.status == '200') {
      setAffiliate(res.data);
    }

    // initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $('#example').DataTable();
      }, 500);
    });
  }, []);


  async function generateLink(e) {
    e.preventDefault();

    if (reqType === false) {
      const data={
        userId: selectedAffiliate,
        type: type,
      };
      const res=await Api.generateAffiliateLink(data);
      // if (res.status == "200")
      if (res.status == '200') {
        const code = res.code;
        await Notifications.successMsg(res.message);
        let rees1; let rees2;
        plansSuv?.map(async (itm, i)=>{
          const commission=document.getElementById('suvC'+i).value;
          const discount=document.getElementById('suvD'+i).value;
          const param={
            userId: selectedAffiliate,
            planId: itm.id,
            carType: 'SUV',
            type: type,
            code: code,
            commission: commission,
            discount: discount,
          };
          rees1=await Api.generateLinkDesc(param);
        });
        plansSedan?.map(async (itm, i)=>{
          const commission=document.getElementById('sedC'+i).value;
          const discount=document.getElementById('sedD'+i).value;
          const param={
            userId: selectedAffiliate,
            planId: itm.id,
            carType: 'Sedan',
            type: type,
            code: code,
            commission: commission,
            discount: discount,
          };
          rees1=await Api.generateLinkDesc(param);
        });
        if (rees1.status == '200' && rees2.status == '200') {
          console.log('Yes');
        }
      // history.push('/affiliate-links');
      } else {
        await Notifications.errorMsg(res.message);
      }
    }
    // update phasee
    else {
      const data={
        userId: selectedAffiliate,
        type: type,
        code: linksCode,
      };
      const res=await Api.UpdateGenerateAffiliateLink(data);
      // if (res.status == "200")
      if (res.status == '200') {
        await Notifications.successMsg(res.message);
        let rees1; let rees2;
        plansSuv?.map(async (itm, i)=>{
          const commission=document.getElementById('suvC'+i).value;
          const discount=document.getElementById('suvD'+i).value;
          const param={
            userId: selectedAffiliate,
            planId: itm.id,
            carType: 'SUV',
            type: type,
            code: linksCode,
            commission: commission,
            discount: discount,
          };
          rees1=await Api.updateGenerateLinkDesc(param);
        });
        plansSedan?.map(async (itm, i)=>{
          const commission=document.getElementById('sedC'+i).value;
          const discount=document.getElementById('sedD'+i).value;
          const param={
            userId: selectedAffiliate,
            planId: itm.id,
            carType: 'Sedan',
            type: type,
            code: linksCode,
            commission: commission,
            discount: discount,
          };
          rees1=await Api.updateGenerateLinkDesc(param);
        });
        if (rees1.status == '200' && rees2.status == '200') {
          console.log('Yes');
        }
      // history.push('/affiliate-links');
      } else {
        await Notifications.errorMsg(res.message);
      }
    }
    handleClose();
    await refreshRecord();
    resetForm();
  }
  function resetForm() {
    setSelectedAffiliate('');
    setType('');
    setAffDiscount('');
    setUserDiscount('');
  }

  async function Delete(id) {
    const data={
      id: id,
    };

    const res= await Api.adminDeleteLink(data);
    console.log(res);

    if (res.status == '200') {
      await Notifications.successMsg(res.message);
      await refreshRecord();
    }
  }


  async function refreshRecord() {
    const res1=await Api.getAllLinks();
    if (res1.status == '200') {
      setLinks(res1.data);
    }
  }

  async function edit(id) {
    const data={
      id: id,
    };
    const res = await Api.linkById(data);
    const data1={
      id: res.data.userId,
      code: res.data.code,
      carType: 'SUV',
    };
    // alert(id);
    const res1=await Api.linkDescByCodeUser(data1);
    // alert(id);
    if (res1.status == '200') {
      setPlansDescSuv(res1.data);
    }
    const data2={
      id: res.data.userId,
      code: res.data.code,
      carType: 'Sedan',
    };
    const res2=await Api.linkDescByCodeUser(data2);

    if (res2.status == '200') {
      setPlansDescSedan(res2.data);
    }
    if (res.status == '200') {
      setSelectedAffiliate(res.data.userId);
      setType(res.data.type);
      setLinksCode(res.data.code);
      setEditIndex(id);
      handleShow();
      // handleShow();
    }
  }

  return (
    <>
      <div className='driver-head'>
        <h3 className='dashboard-head-title'>Affiliates Links</h3>
        <div>
          <div className='nav-buttons'>
            <button onClick={handleShow}
              style={{background: '#FF7B00', marginRight: '15px'}}>
              <img src={add} alt="" />  Generate Link</button>
          </div>
        </div>
      </div>
      <div className='dashboard-table-wrapper_ p-3'>
        <table id="example" className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>CODE</th>
              {/* <th>LINK</th>*/}
              <th>TYPE</th>
              {/* <th>Affiliate DISCOUNT</th>*/}
              {/* <th>User DISCOUNT</th>*/}
              {/* <th>USED</th>*/}
              {/* <th>PHONE</th>*/}
              {/* <th>TOTAL EARNING</th>*/}
              {/* <th>PAID</th>*/}
              {/* <th>NOT PAID</th>*/}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              links?.map((itm, i)=>(
                <tr>
                  <td>{itm.id}</td>
                  <td>{itm.userId}</td>
                  <td>{itm.code}</td>
                  {/* <td>{itm.link}</td>*/}
                  <td>{itm.type}</td>
                  {/* <td>{itm.commission}</td>*/}
                  {/* <td>{itm.discount}</td>*/}
                  {/* <td>{itm.timesUsed}</td>*/}
                  {/* <td>{itm.phone}</td>*/}
                  {/* <td>{itm.total}</td>*/}
                  {/* <td>{itm.paid}</td>*/}
                  {/* <td>{itm.nonpaid}</td>*/}
                  <td><i onClick={async ()=>{
                    setRequestType(true); await edit(itm.id);
                  }} style={{color: 'green', cursor: 'pointer'}} className={'fas fa-pen'}></i></td>
                  <td><i onClick={()=>{
                    Delete(itm.id);
                  }} style={{color: 'red', cursor: 'pointer'}} className={'fas fa-trash'}></i></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={generateLink} style={{overflow: 'auto'}}>
          <Modal.Header closeButton >
            <Modal.Title>
              {(reqType == false)?'Generate Link':'Edit Link'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label><b>Select Affiliate Person</b></label>
            <Form.Select
              aria-label="Default select example"
              value={selectedAffiliate}
              required
              disabled={(reqType == true)?true:false}
              onChange={(e)=>setSelectedAffiliate(e.target.value)}>
              <option value="---">Select</option>
              {
                affiliate?.map((itm, i)=>(
                  <option value={itm.id}>{itm.name}</option>
                ))
              }
            </Form.Select>
            {/* <label><b>Select Plan</b></label>*/}
            {/* <Form.Select
            aria-label="Default
            select example"
            required onChange={(e)=>setSelectedAffiliate(e.target.value)}>*/}
            {/*    <option value="---">Select</option>*/}
            {/*    {*/}
            {/*        plans?.map((itm,i)=>(*/}
            {/*            <option value={itm.id}>{itm.name}</option>*/}
            {/*        ))*/}
            {/*    }*/}
            {/* </Form.Select>*/}
            <label>
              <b>Absolute and Percentage</b></label>

            <Form.Select
              aria-label="Default select example"
              value={type}
              required
              disabled={(reqType == true)?true:false}
              onChange={(e)=>setType(e.target.value)}>
              <option value="---">Select</option>
              <option value="absolute">Absolute</option>
              <option value="discount">Percentage</option>
            </Form.Select>
            <table style={{borderCollapse: 'separate', borderSpacing: '1em'}}>
              <thead>
                <th style={{width: '32%'}}>SUV Plan</th>
                <th style={{width: '32%'}}>Commission</th>
                <th style={{width: '32%'}}>Discount</th>
              </thead>
              <tbody>
                {(reqType == false)?
                  plansSuv?.map((itm, i)=>(
                    <tr>
                      <td>{itm.name}</td>
                      <td><input className={'form-control'}
                        type={'number'} id={'suvC'+i}/></td>
                      <td><input className={'form-control'}
                        type={'number'} id={'suvD'+i}/></td>
                    </tr>
                  )) :
                  plansSuv?.map((itm1, i)=>
                    plansDescSuv?.map((itm, i)=>

                    (itm1.id==itm.planId)?
                      <tr>
                        {console.log(itm.planId)}
                        {console.log(itm1.id)}
                        <td>{itm1.name}</td>
                        <td><input defaultValue={itm.commission}
                          className={'form-control'}
                          type={'number'} id={'suvC'+i}
                        /></td>
                        <td><input defaultValue={itm.discount}
                          className={'form-control'}
                          type={'number'}
                          id={'suvD'+i}
                        /></td>
                      </tr>:
                        false,
                    ),
                  )
                }
              </tbody>
            </table>
            <table style={{borderCollapse: 'separate', borderSpacing: '1em'}}>
              <thead>
                <th style={{width: '32%'}}>Sedan Plan</th>
                <th style={{width: '32%'}}>Commission</th>
                <th style={{width: '32%'}}>Discount</th>
              </thead>
              <tbody>
                {
                  (reqType == false)?plansSedan?.map((itm, i)=>(
                    <tr>
                      <td>{itm.name}</td>
                      <td><input
                        className={'form-control'}
                        type={'number'} id={'sedC'+i}/></td>
                      <td><input
                        className={'form-control'}
                        type={'number'} id={'sedD'+i}/></td>
                    </tr>
                  )):
                  plansSedan?.map((itm1, i)=>
                    plansDescSedan?.map((itm, i)=>
                        (itm1.id==itm.planId)?<tr>
                          <td>{itm1.name}</td>
                          <td><input defaultValue={itm.commission}
                            className={'form-control'}
                            type={'number'} id={'sedC'+i}
                          /></td>
                          <td><input defaultValue={itm.discount}
                            className={'form-control'}
                            type={'number'}
                            id={'sedD'+i}
                          /></td>
                        </tr>:false,
                    ),
                  )

                }
              </tbody>
            </table>
            {/* <label><b>Enter Commission for Affiliate</b></label>*/}
            {/* <InputGroup className="mb-3" onChange={(e)=>setAffDiscount(e.target.value)}>*/}
            {/*    <Form.Control*/}
            {/*        required*/}
            {/*        placeholder="Enter Amount"*/}
            {/*        aria-label="Username"*/}
            {/*        aria-describedby="basic-addon1"*/}
            {/*    />*/}
            {/* </InputGroup>*/}
            {/* <label><b>Enter Discount for User</b></label>*/}
            {/* <InputGroup className="mb-3" onChange={(e)=>setUserDiscount(e.target.value)}>*/}
            {/*    <Form.Control*/}
            {/*        required*/}
            {/*        placeholder="Enter Amount"*/}
            {/*        aria-label="Username"*/}
            {/*        aria-describedby="basic-addon1"*/}
            {/*    />*/}
            {/* </InputGroup>*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                            Close
            </Button>
            <Button type={'submit'} variant="primary">Save</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Links;
