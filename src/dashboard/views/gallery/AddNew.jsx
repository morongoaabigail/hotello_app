import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Header from '../components/dashboardNav'
import Footer from '../components/dashboardFooter'
import ListImages from '../gallery/ListImages'

function AddGalleriImages() {

    const [gallery, setGallery] = useState([]);
    useEffect(() => {
      const fetchHotels = async () => {
        try {
          // Retrieve the collection "hotels" from Firestore
          const querySnapshot = await getDocs(collection(db, "gallery"));
  
          // Map the query snapshot to an array of hotel data objects
          const galleryData = querySnapshot.docs.map((doc) => doc.data());
          console.log(galleryData)
  
          // Set the hotels state with the retrieved data
          setGallery(galleryData);
        } catch (error) {
          console.error("Error fetching data..: ", error);
        }
      };
  
      fetchHotels();
    }, []);

    return (
        <div>
            <Header />
             <ListImages gallery={gallery}/>
            <Footer />
        </div>
    )
}

export default AddGalleriImages
