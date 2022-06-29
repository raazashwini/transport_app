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
    'email':'',
    'password':'',
    'username':''
  });
  console.log(userData)
  const [loginData,setLoginData] =useState({
    'email':'',
    'password':''
  });
  const [dataNew,setDataNew] = useState('')

  const validateEmail = (email) => {
    if (email===''){
      setEmailError('')
    }
    else if (validator.isEmail(email)) {
      setEmailError('Valid Email')
    } else {
      setEmailError('Enter valid Email!')
    }
  }
  const getDevices = (e) => {
    e.preventDefault();
    apiService({ url: UserListing, method: "post", data: userData }).then(
      (result) => {
        alert('Sign up successfully');
        setUserData({ 'email':'',
        'password':'',
        'username':''})
        setEmailError('')
      
      }
    )
    .catch((error) => alert(error) )
  };
  const getLogin = (e) => {
    e.preventDefault();
    apiService({ url: Login, method: "post", data: loginData }).then(
      (result) => {
        console.log(result)
        setDataNew('login Successful') 
        alert('you are logged successfully');

        navigate('/account',{state:result})
      }
    )
    .catch((error) => alert('login fails: user does not exist') )
  };
  const handleDataValues = (e) =>{
    const nam = e.target.name;
    const val = e.target.value;
    setUserData({...userData,[nam]:val});
  };
  const handleLoginValues = (e) =>{
    const nam = e.target.name;
    const val = e.target.value;
    setLoginData({...loginData,[nam]:val});
  };
// useEffect (() =>{
//   validateEmail()
// },[emailError])

  return (
   
         <React.Fragment>
      <Box className="bg-continer">
        {/* <Nav /> */}
        <div id="form">
          <div className="container">
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-md-8 col-md-offset-2">
              <div id="userform">
                <ul className="nav nav-tabs nav-justified" role="tablist">
                  <li className="active"><a href="#signup" role="tab" data-toggle="tab">Sign up</a></li>
                  <li><a href="#login" role="tab" data-toggle="tab">Log in</a></li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade active in" id="signup">
                    <h2 className="text-uppercase text-center"> Sign Up for Free</h2>
                    <form id="signup" onSubmit={(e)=>getDevices(e)}>
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="form-group">
                            {/* <label>User Name<span className="req">*</span> </label> */}
                            <input type="text" className="form-control" name='username' id="username" required data-validation-required-message="Please enter your name." autoComplete="off" 
                            onChange={ (event) => handleDataValues(event) } placeholder="User Name" value={userData.username} />
                            <p className="help-block text-danger" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        {/* <label> Your Email<span className="req">*</span> </label> */}
                        <input type="email" className="form-control" name='email' id="email" required data-validation-required-message="Please enter your email address." autoComplete="off"  onChange={ (event) => {handleDataValues(event);
                        validateEmail(userData.email)} } placeholder="Email" value={userData.email}/>
                        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
                        <p className="help-block text-danger" />
                      </div>
                      <div className="form-group">
                        {/* <label> Password<span className="req">*</span> </label> */}
                        <input type="password" className="form-control" name='password' id="password" value={userData.password} required data-validation-required-message="Please enter your password" autoComplete="off"  onChange={ (event) => handleDataValues(event) } placeholder="password"/>
                        <p className="help-block text-danger"  />
                      </div>
                      <div className="mrgn-30-top">
                        <button type="submit" className="btn btn-larger btn-block">
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="tab-pane fade in" id="login">
                    <h2 className="text-uppercase text-center"> Log in</h2>
                    <form id="login" onSubmit={(e)=>getLogin(e)}>
                      <div className="form-group">
                        {/* <label> Your Email<span className="req">*</span> </label> */}
                        <input type="email" className="form-control" name='email' id="email" required data-validation-required-message="Please enter your email address." autoComplete="off" onChange={ (event) => {handleLoginValues(event);
                        validateEmail(loginData.email)} } placeholder="Email"/>
                         <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
                        <p className="help-block text-danger" />
                      </div>
                      <div className="form-group">
                        {/* <label> Password<span className="req">*</span> </label> */}
                        <input type="password" className="form-control" name='password'  placeholder="password" id="password" required data-validation-required-message="Please enter your password" autoComplete="off" onChange={ (event) => handleLoginValues(event) }/>
                        <p className="help-block text-danger" />
                      </div>
                      <div className="mrgn-30-top">
                        <button type="submit" className="btn btn-larger btn-block">
                          Log in
                        </button>
                      </div>
                    </form>
                    {dataNew}
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
