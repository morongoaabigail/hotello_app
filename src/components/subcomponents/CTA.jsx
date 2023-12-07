import React from 'react'
import { Link } from 'react-router-dom'

function CTA() {
  return (
    <div>
      <div class="overlay">
        <div class="overlay-content">
            <h1>Plan Your Next Getaway</h1>
            <p className='mb-5'>Book your perfect stay at our luxurious hotel now!.</p>
            <Link className=" custom-btn-home "  to="/rooms">Book Now</Link>
        </div>
    </div>
    </div>
  )
}
export default CTA
