import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Otpverify() {
    const[email,setemail]=useState('');
    const[otp,setotp]=useState('');
    const[verify,setverify]=useState(false);
    const[usersotp,setusersotp]=useState('');
    const[displayotpoption,setdisplayotpoption]=useState(false);

    const sendotp=async(e)=>{
        e.preventDefault();
        setemail(e.target.value);
        setotp('1234');
        try {
            const response = await axios.post('https://chatme-backend-p7le.onrender.com/otpverify', {email:'siddapuramsaimaneeswar@gmail.com',otp:"1234"});
      
            if (response.status === 200) {
                setdisplayotpoption(true);
              console.log('otp send successful');
              console.log(response);  
              
            } else {
              console.error('Login failed');
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
    }

    const verifyotp=async()=>{
        if(otp==usersotp){
            console.log("successfully verified")
        }
        else{
            console.log("in correct otp");
        }
    }

  return (
    <div>
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  {displayotpoption==true?(
      <div>
      <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Otp</label>
      <input  class="form-control" onChange={(e)=>{setusersotp(e.target.value)}} aria-describedby="emailHelp"/>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <button type="submit" onClick={verifyotp} class="btn btn-primary">verify</button>
    </div>
  ):(
    <button type="submit" onClick={sendotp} class="btn btn-primary">send otp</button>
  )}
 
</form>
    </div>
  )
}
