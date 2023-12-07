import React,{useState} from 'react'
import Navbar from './subcomponents/Navbar'
import Footer from './subcomponents/Footer'
import HotelListing from './subcomponents/HotelListing'
import Extras from './subcomponents/Extras'


function Rooms() {
  const [selectedRoomType, setSelectedRoomType] = useState('');
  return (
    <div>
      <Navbar />
      <div class="banner"> 
        <div>
          <h1 className='text-light'>Rooms & suits</h1>
        </div>
      </div>
      <Extras/>
      {/* Filter by room type */}
      <div className="container mt-3 mb-3 ">
        <div className="row justify-content-end">
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
            >
              <option value="">All Room Types</option>
              <option value="Studio">Studio</option>
              <option value="Standart">Standart</option>
              <option value="Delux">Delux</option>
              {/* Add more room types as needed */}
            </select>
          </div>
        </div>
      </div>
      <HotelListing selectedRoomType={selectedRoomType} />
      <Footer />
    </div>
  )
}

export default Rooms
