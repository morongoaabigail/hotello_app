import React from "react";
import Header from "../components/dashboardNav";
import Footer from "../components/dashboardFooter";
import { Link } from "react-router-dom";


function ListHotels({ hotels, onEditHotel, onDeleteHotel }) {
  const handleDeleteHotel = async (hotelId) => {
    // Call the onDeleteHotel function from props to delete the hotel
    await onDeleteHotel(hotelId);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <div className="header-title p-3 bg-dark text-light shadow-sm">
          <h4 className="text-light"> Rooms</h4>
          <Link className="btn btn-outline-success me-2 " to="/add_room"> <i class="bi bi-plus-circle"></i> ADD ROOM</Link>
        </div>
        {hotels.length === 0 ? (
          <div className="p-3 bg-light text-center text-muted mb-3 "> 
          <h4 className="text-center ">No Rooms yet!.</h4>
           <h4> <Link to="/add_room"><i class="bi bi-plus-circle-dotted"></i></Link> </h4>
          </div>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.id} className="card mb-3">
            
            <div className="row g-0">
              <div className="col-md-4">
                <img src={hotel.imageUrl} alt="Hotel" className="img-fluid" style={{ width: "100%" }} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h4 className="card-title">{hotel.name}</h4>
                  <small className="card-text">{hotel.description}/</small>
                  <div className="card-footer ">
                    <div className="flex-d mt-3 ">
                      <p className="card-text  me-3"> <b>Guests:</b>  {hotel.guest}</p>
                      <p className="card-text me-3"><b>Children:</b> {hotel.children}</p>
                      <p className="card-text me-3 "><b>Price:</b> R{hotel.price}</p>
                    </div>
                    <div className="flex-d-buttons">
                      <Link to={`/edit_room/${hotel.id}`}>Edit</Link> |{" "}
                      <Link
                        to=""
                        className="text-danger"
                        onClick={() => handleDeleteHotel(hotel.id)}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))
        )}
      </div>
    
      <Footer />
    </div>
  );
}

export default ListHotels;