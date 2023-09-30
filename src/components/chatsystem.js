import React from 'react'
import { Offcanvas } from 'react-bootstrap';
import Sideoffcanvas from './offcanvas';
import Navbar from './navbar';
import profile from './photos/profile1.png';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../parentofparent';
import io from "socket.io-client";
import axios from 'axios';
import girlwaitingimg from './photos/Girlwaiting2.png';
import { useNavigate } from "react-router-dom";

const socket = io.connect("https://chatme-backend-p7le.onrender.com");


export default function Chatsystem() {
  const { chatwithid, chatwithroomid, chatwithimg } = useContext(
    AppContext
  );
  const navigate = useNavigate();
  let incrementVariable = 0;
  const [file, setFile] = useState(null);
  const [mychat, setmychat] = useState('');
  const todayschat = {};
  //all first chat importing from data base
  const [chat, setchat] = useState([]);
  const [chatid, setchatid] = useState([]);
  const [chattime, setchattime] = useState([])
  const [chatimg, setchatimg] = useState([])
  const [rendernumber, setrendernumber] = useState(0);
  const [imgrendernumber, setimgrendernumber] = useState(0);
  const [message, setmessage] = useState("");
  const [imageselectedhover,setimageselectedhover]=useState('');
  const [idselectedhover,setidselectedhover]=useState('');
  const [scrollnum,setscrollnum]=useState(0);
  const [incrementimgvar,setincrementimgvar]=useState(0);


  const [sessionverifieduserid, setsessionverifieduserid] = useState(sessionStorage.getItem('verifieduseridsession'));
  const [sessionverifiedusername, setsessionverifiedusername] = useState(sessionStorage.getItem('verifiedusernamesession'));
  const [sessionverifieduserimg, setsessionverifieduserimg] = useState(sessionStorage.getItem('verifieduserimgsession'));

    useEffect(()=>{
      if(sessionStorage.getItem('verifieduseridsession')==null ||sessionStorage.getItem('verifieduseridsession')==undefined){
        navigate("/")
      }
    },[])
    const joinroom = async () => {
      if (chatwithroomid !== "" && chatwithroomid != null) {
        socket.emit("join_room", chatwithroomid);

        try {
          const response = await axios.post('https://chatme-backend-p7le.onrender.com/checkroomid', { id: chatwithroomid });

          if (response.status === 200) {
            // setchat(response.data.data)
            console.log(response.data.data);
            setchat(response.data.data.chat);
            setchatid(response.data.data.chatpersonid);
            setchattime(response.data.data.time);
            setchatimg(response.data.data.base64Stringimage);
            
          } else {
            console.log('no chats');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    }

  useEffect(() => {
    //join room
    console.log(chatwithid);
 
    joinroom();
  }, [chatwithroomid, chatwithid, rendernumber])

useEffect(()=>{
  const section = document.getElementById('scrollToSection');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
},[imgrendernumber,scrollnum])

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      // alert(data.message);
      console.log(data);
      var input2 = data.input;
      if (input2 != "thisisimagesuperkey@@123") {
        setchat((prevValues) => [...prevValues, input2]);
        setchatid((prevValues) => [...prevValues, chatwithid]);
        const section = document.getElementById('scrollToSection');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
      else {
        setrendernumber((prev) => prev + 1);
      }


    })
   
  }, [socket])


  const itsmymsg_submit = async (e) => {
    e.preventDefault();
    var input = document.getElementById('itsmymsg').value;
  if(input.length!=0){
    setchat((prevValues) => [...prevValues, input]);
    setchatid((prevValues) => [...prevValues, sessionverifieduserid]);
    const section = document.getElementById('scrollToSection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    socket.emit("send_msg", { input, room: chatwithroomid });
    document.getElementById('itsmymsg').value = '';
    try {
      const date = new Date().toLocaleString();
      console.log("Current Date and Time:", date);
      const response = await axios.post('https://chatme-backend-p7le.onrender.com/sendchats', { roomid: chatwithroomid, chat: input, chatpersonid: sessionverifieduserid, time: date });

      if (response.status === 200) {
        // setchat(response.data.data)
        console.log(response.data);
      } else {
        console.log('no chats');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

  }else{
    console.log("enter text")
  }

  }



  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      console.error("No file selected.");
    }

  };
  const selectedimgtobase = async (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    //for again rendering the use effect we incresing the number
    

    try {

      reader.onload = async () => {
        const base64Stringimage = reader.result.split(',')[1];
        console.log(base64Stringimage);
        const date = new Date().toLocaleString();
        //  var input = document.getElementById('itsmymsg').value;
        //   setchat((prevValues) => [...prevValues, input]);
        //   setchatid((prevValues) => [...prevValues, 'myidbro']);
        socket.emit("send_msg", { input: "thisisimagesuperkey@@123", room: chatwithroomid });
        //   document.getElementById('itsmymsg').value = '';
        document.getElementById('btnclose').click();
        // Get the base64 string part
        // Send the base64 string to the server to be stored in the database

        const res = await axios.post("https://chatme-backend-p7le.onrender.com/sendimages", { roomid: chatwithroomid, chat: "thisisimagesuperkey@@123", base64Stringimage, chatpersonid: sessionverifieduserid, time: date });
        if (res.status === 200) {
          console.log(' registered successfully');
          setrendernumber((prev) => prev + 1);
          setimgrendernumber((prev) => prev + 1);

        }
        else if (res.status === 400) {
          console.log("error");
        }
        else {
          console.log("Internal Server Error");
        }
      };
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }
const scroll=()=>{
  const section = document.getElementById('scrollToSection');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}


const setimg=(index)=>{
 
  setidselectedhover('');
  setimageselectedhover( `data:image/png;base64,${chatimg[index.s]}`);
}


  return (
    <div>
             {/* <!-- Modal  selected image hover--> */}
             <div class="modal fade" id="selectedimghover" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
     
      <div class="p-2 me-4 d-flex">
                      <div class="d-flex"> <div className=''><h1 class="modal-title  fs-5" id="staticBackdropLabel">{idselectedhover}</h1></div>
                        <div className='justify-content-end ms-3'><button class="btn me-auto " type="button" ></button></div>
                    </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src={imageselectedhover} class="img-fluid" alt="..."/>
      </div>
    </div>
  </div>
</div>
      {/* <Navbar/> */}
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-3 border-end">
            {/* Include Sidebar component */}

            <div className="d-none d-lg-block">
              {/* Fixed Sidebar for Large Screens */}

              <Sideoffcanvas  setImageselectedhover={setimageselectedhover} setidselectedhover={setidselectedhover}/>

            </div>

            <div className="d-lg-none" >
              <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <Sideoffcanvas setImageselectedhover={setimageselectedhover}  setidselectedhover={setidselectedhover}/>
              </div>

            </div>
          </div>
          {/* //page start */}
          <div className="col-lg-9 p-0 bg-body-tertiary" style={{height:"100%"}}>
            <div className="  p-0">
              <div className="bg-secondary-subtle border rounded-3 mt-0 " style={{ height: "93vh", width: "100%" }}>
                {/* // */}
                {chatwithid!=null?(
                  <div className='p-2 border'>
                  <div class="hstack ">
                    <div className='d-lg-none'>
                      <button class="btn  " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><div className='h3'><i class="fa-solid  fa-bars "></i></div></button>
                    </div>
                    <div class="p-1">
                      <div className="profile-23">
                        <a><img src={chatwithimg} alt="" /></a>
                      </div>
                    </div>
                    <div class="text-truncate overflow-auto"><h3>{chatwithid}</h3></div>
                    <div class="ms-auto "></div>
                    <div class="p-2 me-2 d-flex">
                      <button className='btn me-2' data-bs-toggle="modal" data-bs-target="#imagechat"><i class="fa-solid fa-image fa-bounce"></i></button>
                      <button class="btn " type="button" ><i class="fa-solid fa-phone fa-shake"></i></button>
                    </div>
                  </div>
                </div>
                ):(
                  <div className='bg-white' style={{ height: "8vh", width: "100%" }} > 
                       <div className=' p-2 d-lg-none'>
                      <button class="btn border  " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i class="fa-solid fa-bars"></i></button>
                    </div>
                  </div>
                )}
                {/* // */}
                <div class="p-2  bg-white " style={{ height: "92%" }}>
                  <div class=" " style={{ minHeight: "90%", maxHeight: "81%", overflowY: "auto" }}>
                    <div>
                      {/* /* */}
                      <div className="d-flex flex-column flex-grow-1 " >
                        <div className="flex-grow-1 overflow-auto" >
                          <div className='h-100 d-flex flex-column align-items-start justify-content-end px-3 '>

                            {
                            chat.length > 0 ? (
                              chat.map((thechat, index) => {
                                const s=incrementVariable;
                                return(
                                chatid[index] === sessionverifieduserid ? (
                                  <div key={index} className='my-1 d-flex flex-column align-self-end'>

                                    {
                                    thechat === 'thisisimagesuperkey@@123' ? (
                                      <div className='text-white align-self-end border me-3 rounded py-1 px-2 ded' style={{ width: "45%", height: "45%" }}>
                                        
                                        <button class="btn m-0 p-0" onClick={()=>setimg({s})} data-bs-toggle="modal" data-bs-target="#selectedimghover">
                                        <img className='img-fluid' src={`data:image/png;base64,${chatimg[incrementVariable++]}`}></img>
                                        
                                        </button>
                                      </div>
                                    ) : (
                                      <div className='bg-secondary align-self-end  text-white  me-3 innerboxchat p-2 ded'style={{maxWidth:"70%"}}>
                                        <div className=''>{thechat}</div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div key={index} className='my-1 d-flex flex-column '>
                                    <div>
                                    <div className="profilechat">
                                            <img src={chatwithimg} alt="" />
                                        </div> 
                                      </div>
                                    {thechat === 'thisisimagesuperkey@@123' ? (
                                      <div className='text-white border me-3 rounded py-1 px-2 ded' style={{ maxWidth: "45%", maxHeight: "45%" }}>
                                        <button class="btn m-0 p-0" onClick={()=>setimg({s})} data-bs-toggle="modal" data-bs-target="#selectedimghover">
                                        <img className='img-fluid' src={`data:image/png;base64,${chatimg[incrementVariable++]}`}></img>
                                        
                                        </button>
                                      </div>
                                    ) : (
                                      <div className='bg-secondary ms-3 text-white innerboxchatleft p-2  ded'style={{maxWidth:"70%"}}>
                                       <div className=''>{thechat}</div>
                                      </div>
                                    )}
                                  </div>
                                )
                              );})
                            ) : (
                              <div>
                                <div class="row p-4 pe-3 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3    mt-3  py-5">
                                  <div class="col-lg-6 text-center text-lg-center mt-4  mb-3">
                                    <div class="text-lg-start ms-5">
                                      <h1 class="display-5 fw-bold lh-1 text-body-emphasis mb-3">NO CHAT FOUND</h1>
                                      <p class="col-lg-10 fs-5">built your friend ship by communicating </p>
                                    </div>
                                  </div>
                                  <div class="col-lg-4 mx-auto    mt-3 col-lg-5">
                                    <div class=" rounded-3 mb-5 me-4  bg-white">
                                      <img src={girlwaitingimg} class="img-fluid w-100 " alt="..." />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                      
                          </div>
                        </div>
                      </div>
                      
                      {/* /* */}
                      
                    </div>
                    <div className='' id="scrollToSection">
                        {/* Section content */}
                      </div>
                  </div>
                 

                  <div >
                 {chatwithid!=null?(
                     <div className='p-2 mt-1' >
                         <div class="button-container">
                              <button class="fixed-button" onClick={scroll}><i class="fa-solid fa-circle-down"></i></button>
                          </div>
                     <form role="search" class=" d-flex">

                       <input className="form-control me-2" type="search" placeholder="Search" id="itsmymsg"  aria-label="Search" />
                       <button className="btn btn-outline-success" id='button1' type="submit" onClick={itsmymsg_submit} ><i class="fa-solid fa-paper-plane"></i></button>
                     </form>
                   </div>
                 ):(
                  <div></div>
                 )}
                  </div>

                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div class="modal fade" id="imagechat" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="sendimglabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="sendimglabel">Select Image</h1>
              <button type="button" id="btnclose" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div>
                <label for="formFileLg" class="form-label"></label>
                <input class="form-control form-control-lg" id="imginput" accept="image/*" onChange={handleFileChange} type="file" />
              </div>
            </div>
            <div class="modal-footer">

              <button type="button" onClick={selectedimgtobase} class="btn btn-secondary">Send<i class="fa-sharp fa-solid fa-paper-plane-top fa-fade"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
