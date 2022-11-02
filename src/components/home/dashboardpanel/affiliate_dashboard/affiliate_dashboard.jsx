import React, {useState, useEffect} from 'react';
import $ from 'jquery';
import Api from '../../../../apis/apis';
const currency = global.config.i18n.currency.AED;


function AffiliateDashboard() {
  const [loginData, setData]=useState(null);
  useEffect(async () => {
    let res3;
    const res3Fun = async () => {
      const id1 = await JSON.parse(sessionStorage.getItem('auth'))?.id;
      res3 = await Api.getAffiliateCommmission(id1);
      if (res3.status == '200') {
        setData(res3.data[0].commission);
      }
    };
    res3Fun();
  }, []);
  return (
    <>
      <div style={{padding: '13px 0'}}></div>
      <div
        style={{marginBottom: '3%'}}
        className="dashboard-table-wrapper_ container p-4"
      >
        <div className={'dashboardDiv row'}>
          <div className={'dashboardDivCounter col-12 col-sm ms-sm-2'}>
            <h4>
              Total{' '}
              <span>
                <span style={{visibility: 'hidden'}}>d</span> {currency}
                {JSON.parse(sessionStorage.getItem('auth'))?.total}
              </span>
            </h4>
          </div>
          <div className={'dashboardDivCounter col-12 col-sm ms-sm-2'}>
            <h4>
              Paid{' '}
              <span>
                <span style={{visibility: 'hidden'}}>d</span> {currency}
                {JSON.parse(sessionStorage.getItem('auth'))?.paid}
              </span>
            </h4>
          </div>
          <div className={'dashboardDivCounter col-12 col-sm ms-sm-2'}>
            <h4>
              Non Paid{' '}
              <span>
                <span style={{visibility: 'hidden'}}>d</span> {currency}
                {JSON.parse(sessionStorage.getItem('auth'))?.nonpaid}
              </span>
            </h4>
          </div>
          {/*<div className={'dashboardDivCounter col-12 col-sm ms-sm-2'}>*/}
          {/*  <h4>*/}
          {/*    Commission{' '}*/}
          {/*    <span>*/}
          {/*      <span style={{visibility: 'hidden'}}>d</span> {currency}*/}
          {/*      {loginData}*/}
          {/*    </span>*/}
          {/*  </h4>*/}
          {/*</div>*/}
        </div>
      </div>
      <div style={{padding: '13px 0'}}></div>
    </>
  );
}

export default AffiliateDashboard;
