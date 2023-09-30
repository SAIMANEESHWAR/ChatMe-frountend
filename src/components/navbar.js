import React, { useEffect } from 'react'
import profile from './photos/profile1.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const [sessionverifieduserid,setsessionverifieduserid]=useState(null);
    const [sessionverifiedusername,setsessionverifiedusername]=useState(null);
    const [sessionverifieduserimg,setsessionverifieduserimg]=useState(null);
    const navigate = useNavigate();
   useEffect(()=>{
    setsessionverifieduserid(sessionStorage.getItem('verifieduseridsession'));
    setsessionverifiedusername(sessionStorage.getItem('verifiedusernamesession'));
    setsessionverifieduserimg(sessionStorage.getItem('verifieduserimgsession'));


    console.log(sessionverifieduserid,sessionverifiedusername,sessionverifieduserimg);
   },[])
   const sendtopage=()=>{
    console.log(sessionStorage.getItem('verifieduseridsession'))
    if(sessionStorage.getItem('verifieduseridsession')==null || sessionStorage.getItem('verifieduseridsession')==undefined ||sessionStorage.getItem('verifieduseridsession')==''){
        navigate('/login2')
    }
    else{
        navigate('/chatsystem');
    }
    
   }

  
  return (
    <div>
         <section className="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
                <div className="container-fluid" style={{ width: "100%" }}>

                <div className='d-flex flex-row mb-1'>
                        <h2 className="mt-3" >ChatMe 2.0</h2>
                    </div>
                    
                    <div className='d-flex flex-row justify-content-end'>
                   
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                       <i class="fa-solid  fa-bars "></i>
                    </button>
                    </div>

   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-1 mb-lg-0 navfont">

                            <li className="nav-item">
                                <form className="d-flex" role="search">
                                    <h2 className='mt-2 me-3'><i class="fa-solid fa-bell fa-shake"></i></h2>
                                   
                                        <button onClick={sendtopage} className="nav-link active" aria-current="page">
                                        <div className="profilenavbar">
                                            <img src={profile} alt="" />
                                        </div>
                                        </button>
                                 
                                  
                                </form>
                            </li>
                           


                            <li className="nav-item">
                            

                                
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
    </div>
  )
}
