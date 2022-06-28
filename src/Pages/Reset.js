import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ApiService from '../services/ApiService';
import {UserListing,Login} from '../services/ApiEndpoints'
import { Box } from '@mui/material';
import validator from 'validator'
import Nav from '../component/nav'

export default function Home() {
  const { apiService } = ApiService();
  const navigate = useNavigate();
  const [userListin, setUserListing] =useState();
  const [emailError, setEmailError] = useState('')
  const [userData,setUserData] =useState({
    'current-password':'',
    'new-password':'',
    'confirm-password':''
  });
  const [loginData,setLoginData] =useState({
    'email':'',
    'password':''
  });
  console.log(loginData)
  const [dataNew,setDataNew] = useState('')

 
  const getDevices = (e) => {
    e.preventDefault();
    apiService({ url: UserListing, method: "post", data: userData }).then(
      (result) => {
        alert('Change Password successfully');
        setUserData({ 'current-password':'',
        'new-password':'',
        'confirm-password':''})
        setEmailError('')
      
      }
    )
    .catch((error) => alert(error) )
  };
  const handleDataValues = (e) =>{
    const nam = e.target.name;
    const val = e.target.value;
    setUserData({...userData,[nam]:val});
  };
// useEffect (() =>{
//   validateEmail()
// },[emailError])

  return (
   
         <React.Fragment>
      <Box className="bg-continer">
        <Nav />
        <div id="form">
          <div className="container">
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-md-8 col-md-offset-2">
              <div id="userform">
                
                <div className="tab-content">
                  <div className="tab-pane fade active in" id="signup">
                    <h2 className="text-uppercase text-center"> Reset Password</h2>
                    <form id="signup" onSubmit={(e)=>getDevices(e)}>
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="form-group">
                            {/* <label>User Name<span className="req">*</span> </label> */}
                            <input type="text" className="form-control" name='current-password' id="username" required data-validation-required-message="Please enter your name." autoComplete="off" 
                            onChange={ (event) => handleDataValues(event) } placeholder="Current Password" value={userData.username} />
                            <p className="help-block text-danger" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        {/* <label> Your Email<span className="req">*</span> </label> */}
                        <input type="email" className="form-control" name='new-password' id="email" required data-validation-required-message="Please enter your email address." autoComplete="off"  onChange={ (event) => handleDataValues(event) } placeholder="New Password" value={userData.email}/>
                        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
                        <p className="help-block text-danger" />
                      </div>
                      <div className="form-group">
                        {/* <label> Password<span className="req">*</span> </label> */}
                        <input type="password" className="form-control" name='confirm-password' id="password" value={userData.password} required data-validation-required-message="Please enter your password" autoComplete="off"  onChange={ (event) => handleDataValues(event) } placeholder="Confirm Password"/>
                        <p className="help-block text-danger"  />
                      </div>
                      <div className="mrgn-30-top">
                        <button type="submit" className="btn btn-larger btn-block">
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.container */} 
        </div>
      </Box>
         </React.Fragment>
  )
}
