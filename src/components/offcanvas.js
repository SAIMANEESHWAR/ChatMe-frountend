import React from 'react'
import profile from './photos/profile1.png';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../parentofparent';


export default function Sideoffcanvas(props) {
  const { setchatwithid, setchatwithroomid, setchatwithimg } = useContext(
    AppContext
  );
  const { setImageselectedhover, setidselectedhover } = props;
  const navigate = useNavigate();
  const [privateorpublic, setprivateorpublic] = useState(0);
  const [privatefriend, setprivatefriend] = useState([]);
  const [privatefriendroomid, setprivatefriendroomid] = useState([]);
  const [groupfriends, setgroupfriends] = useState([]);
  const [groupfriendsroomid, setgroupfriendsroomid] = useState([]);
  const [myfriends, setmyfriends] = useState([]);
  const [myfriendsroomid, setmyfriendsroomid] = useState([]);
  const [privatefriendsimg, setprivatefriendsimg] = useState([]);
  const [privatefriendsnames, setprivatefriendsnames] = useState([]);
  const [searchbar, setsearchbar] = useState(null);
  const [filterarrbar, setfilterarrbar] = useState([]);
  const [filterfrndsnames, setfilterfrndsnames] = useState([]);
  const [filterfrndsimgs, setfilterfrndsimgs] = useState([]);
  const [filterfrndsroomids, setfilterfrndsroomids] = useState([]);
  const [firstrender,setfirstrender]=useState(0);
  const [firstrender2,setfirstrender2]=useState(false);
  const[spinner,setspinner]=useState(false);
  
  useEffect(() => {
    const sessionid = sessionStorage.getItem('verifieduseridsession');
    console.log(sessionid);
    if (sessionid == null || sessionid == undefined) {
      navigate("/")
    }
  }, [])
  useEffect(() => {
    //filtering according to search bar
    if (myfriends.length != 0 && searchbar != null && searchbar != "") {
      var filtermyfriends = [];
      var filtermyfriendsnames = [];
      var filtermyfriendsimg = [];
      var filtermyfriendsroomids=[];

      for (var i = 0; i < myfriends.length; i++) {
        if (myfriends[i].toLowerCase().includes(searchbar.toLowerCase())) {
          filtermyfriends.push(myfriends[i]);
          filtermyfriendsnames.push(privatefriendsnames[i]);
          filtermyfriendsimg.push(privatefriendsimg[i]);
          filtermyfriendsroomids.push(myfriendsroomid[i]);
        }
      }
      setfilterfrndsimgs(filtermyfriendsimg);
      setfilterfrndsnames(filtermyfriendsnames);
      setfilterarrbar(filtermyfriends);
      setfilterfrndsroomids(filtermyfriendsroomids);
    }
    else {
      setfilterarrbar(myfriends);
      setfilterfrndsimgs(privatefriendsimg);
      setfilterfrndsnames(privatefriendsnames);
      setfilterfrndsroomids(myfriendsroomid);
    }
    setfirstrender2(true);

  }, [searchbar, myfriends,privatefriendsimg,])

  const [sessionverifieduserid, setsessionverifieduserid] = useState(sessionStorage.getItem('verifieduseridsession'));
  const [sessionverifiedusername, setsessionverifiedusername] = useState(sessionStorage.getItem('verifiedusernamesession'));
  const [sessionverifieduserimg, setsessionverifieduserimg] = useState(sessionStorage.getItem('verifieduserimgsession'));

  const privatechat = () => {
    setprivateorpublic(0);
  }
  const addprivatechat = async () => {
    var id = document.getElementById('privatefriendid').value;
    if(id!=null && id!='' && id!=undefined){
      setspinner(true);
      const newRoomId = uuidv4();

      try {
        var check = await axios.post('https://chatme-backend-p7le.onrender.com/checkid', { id });
      }
      catch (e) {
      }
      try {
        if (check.status === 200) {
          console.log(myfriends);
  
          if (!myfriends.includes(id)) {
            const response = await axios.post('https://chatme-backend-p7le.onrender.com/addroomids', { id, userid: sessionverifieduserid, roomid: newRoomId });
            if (response.status === 200) {
              console.log(' added succesfully');
              setprivatefriend((prevValues) => [...prevValues, id]);
              setprivatefriendroomid((prevValues) => [...prevValues, newRoomId]);
          
             var btnn= document.getElementById("modaladdfrndbtn");
                btnn.click();
                setspinner(false);
  
            } else {
              console.log(' not added');
              document.getElementById("msgatmodal").innerHTML="Errror in Adding friend";
              setspinner(false);

              
            }
          }
          else {
            console.log("user name already exist")
            document.getElementById("msgatmodal").innerHTML="You are already friends";
            setspinner(false);
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
  
      setspinner(false);
    }
    else{
      console.log();
      document.getElementById("msgatmodal").innerHTML="Enter correct Id";
    }

  }
  const groupchat = () => {
    setprivateorpublic(1);
  }

  const addgroupchat = () => {
    var input = document.getElementById('privatefriendid').value;
    setgroupfriends((prevValues) => [...prevValues, input]);
    setgroupfriendsroomid((prevValues) => [...prevValues, 'someuniquegroupid']);
  }
  const chatofchat = (index) => {
    setchatwithid(filterarrbar[index]);
    setchatwithroomid(filterfrndsroomids[index]);
    setchatwithimg(filterfrndsimgs[index]);
   
  }
  //for only small screns
  const chatofchat2 = (index) => {
    setchatwithid(filterarrbar[index]);
    setchatwithroomid(filterfrndsroomids[index]);
    setchatwithimg(filterfrndsimgs[index]);
    closeoffcanvas();
   
  }
  const closeoffcanvas=()=>{
    window.addEventListener('DOMContentLoaded', (event) => {
      const button = document.getElementById('offcanvasbtn');
      button.click();
  });
  }


  useEffect(() => {
    const call = async () => {
      var myfriendimages = [];
      var myfriendnames = [];
      var myfriendids = [];
      try {
        const response = await axios.post('https://chatme-backend-p7le.onrender.com/userdetails', { id: sessionverifieduserid });

        if (response.status === 200) {
          setsessionverifiedusername(response.data.data.username);
          sessionStorage.setItem('verifiedusernamesession', response.data.data.username);
          console.log(response.data.data);

          if (response.data.data.allroomids) {
            setmyfriendsroomid(response.data.data.allroomids);
            setmyfriends(response.data.data.privatefriendname);
            myfriendids = response.data.data.privatefriendname;
          }

        } else {
          console.error('Login failed');
        }
        for (var i = 0; i < myfriendids.length; i++) {
          try {
            const response = await axios.post('https://chatme-backend-p7le.onrender.com/userdetails', { id: myfriendids[i] });
  
            if (response.status === 200) {
              myfriendnames.push(response.data.data.username);
              myfriendimages.push(`data:image/png;base64,${response.data.data.base64Stringimage}`);
            }
  
          } catch (error) {
            console.error('An error occurred:', error);
          }
        }
        setprivatefriendsimg(myfriendimages);
        setprivatefriendsnames(myfriendnames);
      } catch (error) {
        console.error('An error occurred:', error);
      }

     
    }
    call();
  }, [privatefriend]);
 
  const selectedimg=(index)=>{
    if(index=="myimg"){
      console.log('my')
      setidselectedhover(`${sessionverifiedusername}(you)`);
      setImageselectedhover(sessionverifieduserimg);
    }
    else{
      setImageselectedhover(filterfrndsimgs[index]);
      setidselectedhover(filterarrbar[index]);
    }
   
  }

  const logout = () => {

    sessionStorage.setItem('verifieduseridsession', '');
    sessionStorage.setItem('verifiedusernamesession', '');
    sessionStorage.setItem('verifieduserimgsession', '');
    navigate("/");
  }


  useEffect(()=>{
    if(filterarrbar.length>0 &&filterfrndsroomids.length>0 &&filterfrndsimgs.length>0 &&firstrender==0 ){
      setchatwithid(filterarrbar[0]);
    setchatwithroomid(filterfrndsroomids[0]);
    setchatwithimg(filterfrndsimgs[0]);
    setfirstrender(prev=>prev+1)
    console.log('yes');
    }
    console.log('yes');
    
  })

  return (

    <div >
      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">Enter your friend id
              <div className="d-flex" role="search">
                {/* <button className="btn btn-outline-success me-3"  >Private chat</button> */}
                {/* <button className="btn btn-outline-success me-3" onClick={groupchat} >Group chat</button> */}
              </div>
              <button type="button" id="modaladdfrndbtn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
              {/* private */}

              <div class="">
                <p id="msgatmodal"></p>
                <label for="exampleInputEmail1" class="form-label">Id :</label>
                <input type="text" class="form-control" id="privatefriendid" aria-describedby="emailHelp" required />

                <div id="emailHelp" class="form-text">We'll never provide you any ids for security reasons</div>

              </div>


            </div>
            <div class="modal-footer">
            {spinner==true?(
                            <button type="button"  class="shadow btn btn-primary">

                        <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      </button>
                      ):(
                        <button type="button" onClick={addprivatechat} class="shadow btn btn-primary">Add Friend</button>

                      )}
            </div>
          </div>
        </div>
      </div>


      {/* njn */}
      <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "100%", height: "100vh" }}>
        <div class="hstack gap-1">
          <div class="p-2">

            <div className="profile-23">
              <button  class="d-lg-none btn-close me-2 mt-2 border p-2" id="offcanvasbtn" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              <button className='border-0 bg-body-tertiary' onClick={()=>selectedimg("myimg")}  data-bs-toggle="modal" data-bs-target="#selectedimghover"><img src={sessionverifieduserimg} alt="" /></button>
            </div>
          </div>
          <div class="d-flex "><div><div className='fw-medium h2'>{sessionverifiedusername}</div></div><div className='mt-3'><div className='fst-italic'>(you)</div></div></div>
          <div class="ms-auto"></div>
          <div class="p-2">
            <button class="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-user-plus"></i></button>
          </div>
        </div>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setsearchbar(e.target.value)} />
        </form>
        <hr />
        <div className="d-flex flex-column flex-grow-1 ">
          <div className="flex-grow-1 overflow-auto" >
            <ul class="nav nav-pills flex-column mb-auto ">
              {
                filterarrbar.length !== 0 ? (
                  <div className="d-flex flex-column flex-grow-1 " >
                    {filterarrbar.map((thechat, index) => (
                      <li class="nav-item ">
                        <div className="nav-link border-bottom" aria-current="page">
                          <div className="profile-23 d-flex">
                            <div><button onClick={()=>selectedimg(index)} className='border btn border-0 bg-body-tertiary' data-bs-toggle="modal" data-bs-target="#selectedimghover"><img src={filterfrndsimgs[index]} alt="" /></button></div>
                            {/* className="d-none d-lg-block"   only for large screens */}
                            <div className=' mt-2 d-none d-lg-block'><button onClick={() => chatofchat(index)} className='border border-0 bg-body-tertiary'> <blockquote class="blockquote">
                              <p>{thechat}</p>
                            </blockquote></button></div>
                            {/* className="d-lg-none"only  for small screens */}
                            <div className=' mt-2 d-lg-none'><button  onClick={() => chatofchat2(index)} className='border border-0 bg-body-tertiary'> <blockquote class="blockquote">
                              <p>{thechat}</p>
                            </blockquote></button></div>
                            
                          </div>

                        </div>
                      </li>
                    ))}
                  </div>
                ) : (
                  <div className="text-center align-middle top-50  " >
                    <div>
                      <h1>Add Friends</h1>
                    </div>
                  </div>
                )
              }

            </ul>
          </div>
        </div>
        <hr />
        <button onClick={logout} className='border-0 bg-body-tertiary'>
          <div className="fs-3 text-info-emphasis">
            <div className='fw-semibold mb-3'> <i class="fa-solid fa-right-from-bracket"></i> Log Out</div>
            
          </div>
        </button>
      </div>
    </div>


  )
}
