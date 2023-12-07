import React from 'react'

function Extras() {
  return (
    <div>
       <div className='featured mb-5'>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <div>
                  <h4>Enjoy free Wi-Fi</h4>
                  <p>We believe that when a hotel advertises free WiFi, they should provide travelers with a fast and reliable connection. </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <div>
                  <h4>Concierge service</h4>
                  <p>Top-tier hotels have a lot to recommend them: luxurious spas, twice-daily room service, and superb on-site restaurants.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <div>
                  <h4>Pool access</h4>
                  <p>Hotels with pool rooms, especially those based in big cities, might require keycard access to get into the pool, spa, and other amenities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className='text-center mb-5'>Best Rooms</h2>
    </div>
  )
}

export default Extras
