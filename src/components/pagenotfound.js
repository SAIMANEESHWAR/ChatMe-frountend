import React from 'react';
import p404 from './photos/p4042.png'
import { useNavigate } from "react-router-dom";


function Pagenotfound() {


const navigate=useNavigate();
function goto(){
    navigate('/');
}


return(<>

<section>
<div className="container  " style={{marginTop : '91px'}}>
    <div className="row p-4 pe-3 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border   shadow-lg  mt-5">
      <div className="col-lg-7 p-3 p-lg-5  pt-lg-3">
        <div className='justify-content-center align-middle'>
        <h1 className="display-4 fw-bold lh-1 mb-3 text-body-emphasis">404 PAGE NOT FOUND</h1>
        <p className="lead mb-3">Page is not found please check login conformation</p>
        </div>
        <div className="d-grid gap-2 mt-5 d-md-flex justify-content-md-center mb-4 mb-lg-3">
          <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold" onClick={goto}>GO TO HOME </button>
          
        </div>
      </div>
      <div className="p-3 col-md-10 mx-auto col-lg-4 p-md-5 border rounded-3 bg-body-tertiary mb-5 me-5  ">
              <div className='offset-lg-1  overflow-hidden shadow-lg mb-3'>
             
                    <img src={p404} class="img-fluid " alt="..."/>
              </div>
                  </div>
      
    </div>
  </div>
</section>

    </>);
}
export default Pagenotfound;