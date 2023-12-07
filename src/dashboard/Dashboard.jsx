import React, { useEffect, useState } from 'react'
import Header from './views/components/dashboardNav'
import Footer from './views/components/dashboardFooter'
import './dashboard.css';

function Dashboard({hotels}) {


  return (
    <div>
      <Header />
      <main className="container mt-5">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h4 className="h3 mb-0 text-gray-800">Dashboard</h4>
          <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fa fa-download fa-sm text-white-50"></i> Generate Report</a>
        </div>
        <hr />
        <div className='bg-light md-5'>
          <div className="row dashboard">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 ">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Earnings (Monthly)</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">R40,000</div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Earnings (Annual)</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">R215,000</div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-wallet fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                      </div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div className="progress-bar bg-info" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-journal fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Pending Requests</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-comments fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h4 className='mt-5'>Hotels</h4>
        <hr />

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>No. Guest</th>
              <th>No. Children</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{hotel.name}</td>
                <td>{hotel.guest}</td>
                <td>{hotel.children}</td>
                <td>{hotel.price}</td>
                <td>
                  <i class="bi bi-pencil-square"></i>
                  <i class="bi bi-view-list"></i>
                  <i class="bi bi-trash3"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />

    </div>
  )
}

export default Dashboard
