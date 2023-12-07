import React from 'react';
import HotelDetails from './subcomponents/HotelDetails';             
import Navbar from './subcomponents/Navbar';
import Footer from './subcomponents/Footer';

function ShowHotel() {
 
  return (
    <div>
      <Navbar/>
      <HotelDetails/>
      <Footer/>          
    </div>
  );
}

export default ShowHotel;