import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/dropdown'



export default function Dashboard() {
  return (
    <div className='container-fluid'>
        <div className='row'>
        <div className='col-auto-col-sm-2 bg-green-500 d-flex flex-column justify-content-between min-vh-100'>
            <div>
                <div className='text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline'>
                    <span className='fs-4'>Dashboard</span>
                    <hr className='text-white d-none d-sm-block'></hr>
                    <ul class="nav-pills flex-column">
  <li class="nav-item text-white m-1">
    <a class="nav-link active" aria-current="page" href="#">
    <i className='bi bi-speedometer2'></i>
    <span className='ms-2'>Home</span></a>
  </li>
  <li class="nav-item text-white m-1">
    <a class="nav-link " aria-current="page" data-bs-toggle='collapse' href="#submenu">
    <i className='bi bi-grid'></i>
    <span className='ms-2'>Invoice</span>
    <i className='bi bi-arrow-down-short'></i></a>
  </li>
  <ul class="nav-collapse ms-1 ">
  <li class="nav-item text-white m-1">
    <a class="nav-link " aria-current="page" href="#">
    <i className='bi bi-speedometer2'></i>
    <span className='ms-2'>CreateInvoice</span></a>
  </li>
  </ul>
 
</ul>
                </div>

            </div>
            </div></div></div>
  )
}
