import React from 'react'
import { Link } from 'react-router-dom'

function PageError() {
  return (
    <div>
       <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mt-5">
            <h1 className="display-4">404</h1>
            <p className="lead">Page not found</p>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-outline-success">Home</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PageError
