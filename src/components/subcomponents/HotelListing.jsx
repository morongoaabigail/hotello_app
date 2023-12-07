import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase"

function HotelListing({selectedRoomType }) {
  const [hotels, setHotels] = useState([]);
 
  //Select RoomType 
  const filteredHotels = selectedRoomType
  ? hotels.filter((hotel) => hotel.roomType === selectedRoomType)
  : hotels;

  //trancate function
  function truncateText(text, maxLength) {
    if (!text || typeof text !== 'string') {
      return '';
    }

    if (text.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + '...';
  }
  //Get data from fire store
  useEffect(() => {

    const fetchHotels = async () => {
      try {
        // Retrieve the collection "hotels" from Firestore
        const querySnapshot = await getDocs(collection(db, "hotels"));
        // Map the query snapshot to an array of hotel data objects with document ID included
        const hotelsData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));

        console.log(hotelsData)
        // Set the hotels state with the retrieved data
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels: ", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div>
      <div className="container mt-6" style={{ marginBottom: "200px" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="col">
              <div className="card" style={{ height: "450px" }}>
                <img src={hotel.imageUrl} className="card-img-top" alt="Hotel Image" />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <small className='text-dark'> <i className="bi bi-people"></i> {hotel.guest} adult(s) and {hotel.children} child(ren)</small>
                  <p className="card-text mt-3">{truncateText(hotel.description, 60)}</p><br />
                  <Link to={`/show_hotel_details/${hotel.id}`} className="btn btn-outline-success btn-lg" href="#">Book now from R{hotel.price}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default HotelListing;

