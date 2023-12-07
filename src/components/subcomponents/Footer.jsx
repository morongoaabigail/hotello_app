import React from 'react'
import { Logo } from '../Imports'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
       <footer className="footer bg-dark text-light">
        <div className="container">
            <div className="row">
                <div className="col-md-4 mr-3">
                    <img src={Logo} alt="Hotel Logo" className="footer-logo"/>
                    <div className="footer-info">
                        <p>Hotello booking has revolutionized the way we plan our trips and secure accommodations. With just a few clicks or taps, travelers can now explore a vast array of options and effortlessly reserve their desired rooms.</p>
                       
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="footer-contacts">
                        <h5>Contact Us</h5>
                        <p>Phone: (123) 456-7890</p>
                        <p>Email: info@hotello.co.za</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="footer-newsletter">
                        <h5>Subscribe to Our Newsletter</h5>
                        <input type="email" placeholder="Enter your email" className='mb-1'/>
                         <Link  to="#">Subscribe</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <hr/>
                    <p className="text-center">
                        &copy; 2023 Hotello All rights reserved.  Made with <i className="bi bi-heart-fill text-danger"></i> by Tlangelani in <a
                        href="https://github.com/felender7">South Africa</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
