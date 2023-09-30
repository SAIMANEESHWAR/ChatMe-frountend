import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../parentofparent';

export default function Login2() {
    const { setchatwithid, setchatwithroomid,setchatwithimg} = useContext(
        AppContext
    );
    useEffect(()=>{
      setchatwithid(null);
       setchatwithroomid(null);
       setchatwithimg(null);
    },[])

    const navigate = useNavigate();
    const[id,setid]=useState('');
    const[username,setusername]=useState('');
    const[password,setpassword]=useState('');
    const[spinner,setspinner]=useState(false);


    const handleSubmit=async(e)=>{
      e.preventDefault();
      setspinner(true);

      try {
        const response = await axios.post('https://chatme-backend-p7le.onrender.com/Login', {id,password});
  
        if (response.status === 200) {
          console.log('Login successful');
          console.log(response.data.base64Stringimage);
          //sending details to parent of parent page through use context 
         
          sessionStorage.setItem('verifieduseridsession', id);
        
          sessionStorage.setItem('verifiedusernamesession', username);
         
          sessionStorage.setItem('verifieduserimgsession', `data:image/png;base64,${response.data.base64Stringimage}`);
        navigate("/chatsystem");
         
          
        } else if(response.status===202){
          console.error('Login failed'); 
          setspinner(false);
           document.getElementById("statementafterclick").innerHTML=`<p className="text-danger">Invalid User Id or Password</p>`;


        }
      } catch (error) {
        console.error('An error occurred:', error);
        setspinner(false);
        document.getElementById("statementafterclick").innerHTML=`<p className="text-danger">Internal Server Error</p>`;

      }
    }
  return (
    <section className='mt-5' >
    <form onSubmit={handleSubmit} >
          <div className="row  p-5 d-flex justify-content-center"> 
          
                 <div className="p-4 col col-lg-5 p-md-5 border rounded-3 bg-body-tertiary text-truncate">
               <h1>  Login</h1>
                      <div className="form-floating mb-3 mt-5 text-truncate">
                          <input  className="form-control" id="f1" placeholder=" ID" onChange={(e) => setid(e.target.value)} required  />
                          <label for="floatingInput"> ID</label>
                      </div>
                     
                      <div className="form-floating mb-3 text-truncate">
                          <input type='password'  className="form-control" id="f3" placeholder="Password" onChange={(e) => setpassword(e.target.value)} required  />
                          <label for="floatingInput">Password</label>
                      </div>
                      <div id="statementafterclick" className='text-warning'></div>
                      <button className="w-100 btn btn-lg btn-primary" type="submit"   >{spinner==true?(
                        <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      ):(
                        <p>Login</p>
                      )}</button>                     
                       <hr className="my-4"/>
                      <div className='d-flex'>
                        <div><small className="text-body-secondary">If you does not have an account  </small></div>
                        <div className='ms-1'>
                        <Link to={`/Login`} className="nav-link text-primary " aria-current="page">
                                    Register
                      </Link>
                        </div>
                      </div>
                     
                     
                  </div>
                  </div>
                 
  </form>
          </section>
  )
}
