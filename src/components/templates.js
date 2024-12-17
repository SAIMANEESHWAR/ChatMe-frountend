import React from 'react'
import { Link } from 'react-router-dom';
import img from './photos/image_3.jpg'
import mem1 from './photos/mem-1.jpg';
import mem2 from './photos/mem-2.jpg';
import mem4 from './photos/shashank.jpg';
import mem6 from './photos/saiakshay.jpg';
import me from './photos/myprofilepic.jpg';
import Rahul from './photos/Rahul.jpg';

export default function templates() {
    const imgSources = [me, Rahul];
    const namesources=["Sai Maneeshwar","Rahul"]
    return (
        <div>        
            <div class="container mt-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <h1 class="text-body-emphasis">PROJECT-MEMBERS</h1>
                
            </div>
            <div class="row d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {imgSources.map((images123, index) => (
                    <div class="col">
                        <div class="card shadow-sm">
                            <img src={images123} className=" card-img-top" width="100%" height="290"></img>
                            <div class="card-body">
                                <h3>{namesources[index]}</h3>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tellus eget justo facilisis, quis vestibulum urna rhoncus. Fusce sit amet venenatis tortor. Nullam auctor libero vitae lectus bibendum, ut tempus odio faucibus.
</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    {/* <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div> */}
                                    <small class="text-body-secondary"><i class="fa-solid fa-star fa-beat"></i><i class="fa-solid fa-star fa-beat"></i><i class="fa-solid fa-star fa-beat"></i><i class="fa-solid fa-star fa-beat"></i><i class="fa-solid fa-star-half-stroke fa-beat"></i></small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                

            </div>
        </div>


<div className='container mt-5'>
            <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="h-100 p-5 text-bg-dark rounded-3">
          <h2>About The Project</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tellus eget justo facilisis, quis vestibulum urna rhoncus. Fusce sit amet venenatis tortor. Nullam auctor libero vitae lectus bibendum, ut tempus odio faucibus.</p>
          <button class="btn btn-outline-light" disabled type="button">Sources</button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 bg-body-tertiary border rounded-3">
          <h2>Git Hub</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tellus eget justo facilisis, quis vestibulum urna rhoncus. Fusce sit amet venenatis tortor. Nullam auctor libero vitae lectus bibendum, ut tempus odio faucibus.</p>
          <button class="btn btn-outline-secondary "disabled type="button">Git Link</button>
        </div>
      </div>
    </div>
</div>
    <div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
      <i class="fa-solid fa-s fa-bounce h2 me-1"></i><i class="fa-solid fa-a fa-bounce h2 me-1"></i><i class="fa-solid fa-i fa-bounce h2 me-1"></i>
      </a>
      <span class="mb-2 mb-md-0 text-body-secondary"> Copyright © 2023 All rights reserved</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"><Link class="text-body-secondary" to="https://www.linkedin.com/in/saimaneeshwar-siddapuram/"><i class="fa-brands fa-linkedin h2"></i></Link></li>
      <li class="ms-3"><Link class="text-body-secondary" to="https://www.instagram.com/"><i class="fa-brands fa-instagram h2"></i></Link></li>
      <li class="ms-3"><Link class="text-body-secondary" to="https://github.com/SAIMANEESHWAR?tab=repositories"><i class="fa-brands fa-github h2"></i></Link></li>
    </ul>
  </footer>
</div>


        </div>

    )
}
