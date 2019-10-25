import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {  LocaleProvider } from 'antd';
// import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import product from './product/product';
import journal from './journal/journal';
import lifecycle from './lifecycle/lifecycle';
import connector from './connector/connector';
import basic from './basic/basic';
import status from './status/status';
import waterman from './waterman/waterman';
import account from './account/account';
import history from './history/history';
import newaccount from './newaccount/newaccount';
import login from './login/login';
import homepage from './homepage/homepage';
import instorage from './instorage/instorage';
import sendout from './sendout/sendout';
import confirm from './confirm/confirm';
import maintenance from './maintenance/maintenance';
import datalogs from './datalogs/datalogs';
import userlogs from './userlogs/userlogs';
import otherlogs from './otherlogs/otherlogs';
import operation from './operation/operation';
import role from './role/role';
import roleassignment from './roleassignment/roleassignment';
import power from './power/power';
import powerassignment from './powerassignment/powerassignment';
import newadd from './newadd/newadd';
import parameter from './parameter/parameter';
import addwaterman from './addwaterman/addwaterman';
import addchargeman from './addchargeman/addchargeman';
import lookchargeman from './lookchargeman/lookchargeman';
import collectorstest from './collectorstest/collectorstest';
import wirelesstest from './wirelesstest/wirelesstest';
import looklist from './looklist/looklist';
import NoaMatch from './NoaMatch/NoaMatch';
import testhistory from './testhistory/testhistory';
import workorder from './workorder/workorder';
import orderdetails from './orderdetails/orderdetails';
import testdetails from './testdetails/testdetails';
import upgrade from './upgrade/upgrade';
import upgradehistory from './upgradehistory/upgradehistory';
import hourreading from './hourreading/hourreading';
import tenement from './tenement/tenement';
import community from './community/community';
import addtenement from './addtenement/addtenement';
import waterheader from './waterheader/waterheader';
import filemanager from './filemanager/filemanager';

import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
  <Router >
    <Switch>
      <Route path="/" exact render={() => (
        <Redirect to={'/login'} />
      )} />

      <Route path='/homepage' component={homepage} />
      <Route path="/login" component={login} />
      {/* <Route path="/information"> */}
      <Route path='/product' component={product} />
      <Route path='/newadd' component={newadd} />
      <Route path='/journal' component={journal} />
      <Route path='/datalogs' component={datalogs} />
      <Route path='/userlogs' component={userlogs} />
      <Route path='/otherlogs' component={otherlogs} />
      <Route path='/lifecycle' component={lifecycle} />
      <Route path='/connector' component={connector} />
      {/* </Route> */}
      {/* <Route path="/equipment"> */}
      <Route path='/basic' component={basic} />
      <Route path='/status' component={status} />
      <Route path='/parameter' component={parameter} />
      {/* </Route> */}
      {/* <Route path="/user"> */}
      <Route path='/waterman' component={waterman} />
      <Route path='/account' component={account} />
      <Route path='/newaccount' component={newaccount} />
      <Route path='/role' component={role} />
      <Route path='/roleassignment' component={roleassignment} />
      <Route path='/addchargeman' component={addchargeman} />
      <Route path='/addwaterman' component={addwaterman} />
      <Route path='/power' component={power} />
      <Route path='/powerassignment' component={powerassignment} />
      <Route path='/lookchargeman' component={lookchargeman} />
      {/* </Route>
      <Route path="/ota"> */}
      <Route path='/history' component={history} />
      <Route path='/operation' component={operation} />
      {/* </Route> */}
      <Route path='/instorage' component={instorage} />
      <Route path='/sendout' component={sendout} />
      <Route path='/confirm' component={confirm} />
      <Route path='/maintenance' component={maintenance} />
      <Route path='/collectorstest' component={collectorstest} />
      <Route path='/wirelesstest' component={wirelesstest} />
      <Route path='/looklist' component={looklist} />
      <Route path='/testhistory' component={testhistory} />
      <Route path='/workorder' component={workorder} />
      <Route path='/orderdetails' component={orderdetails} />
      <Route path='/testdetails' component={testdetails} />
      <Route path='/upgrade' component={upgrade} />
      <Route path='/upgradehistory' component={upgradehistory} />
      <Route path='/hourreading' component={hourreading} />
      <Route path='/tenement' component={tenement} />
      <Route path='/community' component={community} />
      <Route path='/addtenement' component={addtenement} />
      <Route path='/waterheader' component={waterheader} />
      <Route path='/filemanager' component={filemanager} />
      <Route component={NoaMatch}/>
    </Switch>
  </Router>
  </LocaleProvider>,
  document.getElementById('root'));
registerServiceWorker();
