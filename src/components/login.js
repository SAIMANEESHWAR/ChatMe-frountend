import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../parentofparent';

export default function Login() {

    const {   setchatwithid, setchatwithroomid,setchatwithimg} = useContext(
      AppContext
    );
    useEffect(()=>{
      setchatwithid(null);
       setchatwithroomid(null);
       setchatwithimg(null);
    },[]);
    const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const[id,setid]=useState('');
  const[username,setusername]=useState('');
  const[password,setpassword]=useState('');
  const[spinner,setspinner]=useState(false);
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      console.log("No file selected.");
    }
    
  };
  
  const handleSubmit  =  async(e)=>{
    e.preventDefault();
    setspinner(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    try {

      reader.onload = async () => {
       const base64Stringimage = reader.result.split(',')[1];
       console.log(base64Stringimage);
       // Get the base64 string part
       // Send the base64 string to the server to be stored in the database
      const res=await axios.post("https://chatme-backend-p7le.onrender.com/Register", {id,username,password,base64Stringimage});
      if (res.status === 201) {
        console.log('User registered successfully');
                 
        sessionStorage.setItem('verifieduseridsession', id);
        
        sessionStorage.setItem('verifiedusernamesession', username);
       
        sessionStorage.setItem('verifieduserimgsession', `data:image/png;base64,${base64Stringimage}`);
      navigate("/chatsystem");

      }
      else if (res.status == 202) {
        console.log("User already exist");
        setspinner(false);
        document.getElementById("statementafterclick").innerHTML=`<p className="text-danger">User ID Already Exist </p>`;
     }
     else{
      setspinner(false);
       console.log("Internal Server Error");
       document.getElementById("statementafterclick").innerHTML=`<p className="text-danger">Internal Server Error </p>`;

     }
   
    };
    } catch (error) {
      setspinner(false);
      console.log('An error occurred:', error);
      document.getElementById("statementafterclick").innerHTML=`<p className="text-danger">Internal Server Error </p>`;

    }
  }
  return (
    <section className='mt-5' >
    <form onSubmit={handleSubmit} >
          <div className="row d-flex justify-content-center p-5"> 
          
                 <div className="p-4 col col-lg-5 mt-1 p-md-5 border rounded-3 bg-body-tertiary text-truncate">
               <h1>  Registration</h1>
                      <div className="form-floating mb-3 mt-5 text-truncate">
                          <input  className="form-control"  placeholder=" ID" onChange={(e) => setid(e.target.value)} required  />
                          <label for="floatingInput"> ID</label>
                      </div>
                      <div className="form-floating mb-3 text-truncate">
                          <input  className="form-control"  placeholder="Username" onChange={(e) => setusername(e.target.value)} required  />
                          <label for="floatingInput">Username</label>
                      </div>
                      <div className="form-floating mb-3 text-truncate">
                          <input type='password'  className="form-control"  placeholder="Password" onChange={(e) => setpassword(e.target.value)} required  />
                          <label for="floatingInput">Password</label>
                      </div>
                      <div className="form-floating mb-3 text-truncate">
                      <input type="file" placeholder="image" className="form-control" accept="image/*" onChange={handleFileChange} required />
                      
                      </div>
                      <div id="statementafterclick" className='text-warning'></div>
                   
                      <button className="w-100 btn btn-lg btn-primary" type="submit"   >{spinner==true?(
                        <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      ):(
                        <p>Register</p>
                      )}</button>
                      <hr className="my-4"/>

                      <div className='d-flex'>
                        <div><small className="text-body-secondary">If you already have an account  </small></div>
                        <div className='ms-1'>
                        <Link to={`/login2`} className="nav-link text-primary " aria-current="page">
                                    Login
                      </Link>
                        </div>
                      </div>
                     
                  </div>
                  </div>
  </form>
          </section>
  )
}
