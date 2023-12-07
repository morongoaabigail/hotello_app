import React  from "react";
import { Link } from "react-router-dom";
import Navbar from "./subcomponents/Navbar";
import Footer from "./subcomponents/Footer";
import Banner from "./subcomponents/Banner";
import AboutSection from "./subcomponents/AboutSection";
import CTA from "./subcomponents/CTA";

function Home({hotels}) {
 
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
  
  return (
    <div>
      <Navbar />
      <Banner />
      <AboutSection />
     {/*room will  render with limit of 4*/}
     <div className="container mt-6" style={{ marginBottom: "200px" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="col">
              <div className="card" style={{ height: "450px",  position: "relative" }}>
                <img src={hotel.imageUrl} className="card-img-top" alt="Hotel Image" />
                <div className="price-overlay">R{hotel.price} / Night</div>
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <small className='text-dark'> <i className="bi bi-people"></i> {hotel.guest} adult(s) and {hotel.children} child(ren)</small>
                  <p className="card-text mt-3">{truncateText(hotel.description, 60)}</p><br />
                  <Link to={`/show_hotel_details/${hotel.id}`} className="btn btn-outline-success btn-lg">Book now from R{hotel.price}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CTA />
      <Footer />
    </div>
  )
}
export default Home;


