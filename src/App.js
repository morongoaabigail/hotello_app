import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { collection, getDocs, query, limit,deleteDoc,doc } from "firebase/firestore";
import { db } from "./config/firebase";
import Home from "./components/Home";
import Rooms from "./components/Rooms";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contacts from "./components/Contacts";
import DashBoard from "./dashboard/Dashboard";
import PageError from "./components/PageError";
import LoginForm from "./components/Login";
import SignUp from "./components/SignUp";
import AddHotel from "./dashboard/views/hotels/AddNew";
import ShowHotel from "./dashboard/views/hotels/ShowHotel";
import ListHotels from "./dashboard/views/hotels/IndexHotels";
import AddGalleriImages from "./dashboard/views/gallery/AddNew";
import ShowHotelDetails from "./components/ShowHotel";
import Reservation from "./components/Reservation";
import CustomAlert from "./components/subcomponents/CustomAlert";
import EditHotel from "./dashboard/views/hotels/EditHotel";
import ManageReservation from "./dashboard/views/reservations/ManageReservation";



import "./App.css";
function App() {
  const [hotels, setHotels] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Retrieve the collection "hotels" from Firestore with a limit of 4 documents for home page
        const q = query(collection(db, "hotels"), limit(4));
        const querySnapshot = await getDocs(q);

        // Retrieve the collection "gallery" from Firestore with a limit of 10 documents // I will pigination 
        const qGallery = query(collection(db, "gallery"), limit(10));
        const querySnapshot_gallery = await getDocs(qGallery);

        // Map the query snapshot to an array of hotel data objects with document ID included
        const hotelsData = querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data(),
        }));
        const galleryData = querySnapshot_gallery.docs.map((doc) => doc.data());

        // Set the hotels state with the retrieved data
        // Set the gallery state with the retrieved data
        setHotels(hotelsData);
        setGallery(galleryData);
      } catch (error) {
        console.error("Error fetching hotels: ", error);
      }
    };

    fetchHotels();
  }, []);

  //Update function
  const handleEditHotel = (hotelId, updatedHotelData) => {
    // Find the hotel in the list and update its data
    const updatedHotels = hotels.map((hotel) =>
      hotel.id === hotelId ? { ...hotel, ...updatedHotelData } : hotel
    );
    setHotels(updatedHotels);
    setAlertMessage('Room successfully updated');
    setAlertType('Success');
    setShowAlert(true);
  };


  //Delete function
  const handleDeleteHotel = async (hotelId) => {
    try {
      // Delete the hotel from Firestore using the hotelId
      await deleteDoc(doc(db, "hotels", hotelId));

      // Update the hotels state by filtering out the deleted hotel
      const updatedHotels = hotels.filter((hotel) => hotel.id !== hotelId);
      setHotels(updatedHotels);
      setAlertMessage('Room successfully Deleted');
      setAlertType('Success');
      setShowAlert(true);


    } catch (error) {
      console.error("Error deleting hotel: ", error);
    }
  };

  return (
    <div>
        {showAlert && (<CustomAlert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} /> )}
      <Routes>
        <Route path="/" element={<Home  hotels={hotels}/>} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/gallery" element={<Gallery gallery={gallery} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/dashboard" element={<DashBoard hotels={hotels} />} />
        <Route path="*" element={<PageError />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/add_room" element={<AddHotel />} />
        <Route path="/show_hotel" element={<ShowHotel />} />
        <Route path="/add_gallery" element={<AddGalleriImages />} />
      
        <Route path="/list_hotels" element={<ListHotels hotels={hotels} onEditHotel={handleEditHotel} onDeleteHotel={handleDeleteHotel} />} />
        <Route
          path="/show_hotel_details/:id"
          element={<ShowHotelDetails hotels={hotels} />}
        />

      <Route
            path="/edit_room/:id"
            element={<EditHotel hotels={hotels} />}
          />
       
        <Route path="/reservation" element={<Reservation />} /></Routes>
        <Route path="/manage_reservation"  element={<ManageReservation />}/>
    </div>
  );
}

export default App;
