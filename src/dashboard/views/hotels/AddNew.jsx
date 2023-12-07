import React, { useState } from "react";
import { collection, addDoc } from "../../../config/firebase";
import { db, storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from '../components/dashboardNav'
import Footer from '../components/dashboardFooter'
import { Room1 } from "../../../components/Imports";
import CustomAlert from "../../../components/subcomponents/CustomAlert";
import { Link } from "react-router-dom";

function AddHotelForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [guest, setGuest] = useState("");
  const [children, setChildren] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomSize,  setRoomSize] = useState("")
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Generate a unique filename for the image
      const imageName = Date.now() + "_" + image.name;

      // Upload the image file to Firebase Storage
      const imageRef = ref(storage, `images/${imageName}`); // Add a forward slash before "images"
      await uploadBytes(imageRef, image);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(imageRef);

      const hotelData = {
        name,
        description,
        guest,
        children,
        price: parseFloat(price),
        roomType,
        roomSize,
        imageUrl: downloadURL, // Add the image URL to the hotel data
      };

      // Save the hotel data to Firestore
      const hotelsCollectionRef = collection(db, "hotels"); // Create a reference to "hotels" collection
      await addDoc(hotelsCollectionRef, hotelData); // Use 'addDoc' with the collection reference
      // Clear form fields
      setName("");
      setDescription("");
      setGuest("");
      setChildren("");
      setPrice("");
      setRoomSize("");
      setRoomType("");
      setImage(null);
      
      setAlertType('success');
      setAlertMessage('Details Successfully Saved!');
      setShowAlert(true);
      setTimeout(()=>setShowAlert(false), 10000);

    } catch (error) {
      console.error("Error adding document: ", error);
      setAlertType('danger');
      setAlertMessage('An error occurred while saving hotel details. Please try again later');
      setShowAlert(true);
      setTimeout(()=>setShowAlert(false), 10000);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
      <div className="row">
          <div className="col-md-8 p-3 bg-light shadow-sm mb-5 ">
            <div>
              <h4><i class="bi bi-building-add"></i> ADD ROOM </h4>
                <hr />
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control" placeholder="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control" placeholder="Size"
                    id="size"
                    value={roomSize}
                    onChange={(e) => setRoomSize(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                  placeholder="Description"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <select
                    aria-label="room type"
                    className="form-select"
                    id="room-type"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    required
                  >
                    <option disabled selected>Room Type</option>
                    <option value="Studio">Studio</option>
                    <option value="Standart">Standart</option>
                    <option value="Delux">Delux</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    aria-label="Guests"
                    className="form-select"
                    id="guest"
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                    required
                  >
                    <option disabled selected>Guests</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    aria-label="Children"
                    className="form-select"
                    id="children"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    required
                  >
                    <option disabled selected>Children</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="mb-3">
                  
                  <input
                  placeholder="Price"
                    type="text"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{width:"100px"}}
                  />
                </div>
                <input className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                <br />
                {showAlert && (
              <CustomAlert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
               )}
                <button type="submit" className="btn btn-outline-success mt-3" onClick={handleSubmit} style={{width:"100%"}}>
                  Save
                </button>
              </form>
            </div>


          </div>
          <div className="col-md-4 ">
           <div className="p-3 bg-dark">
          <img src={Room1} alt="" className="img-fluid"  style={{width:"100%"}}/>
          <Link to="/list_hotels" className="btn btn-danger mt-3" style={{width:"100%"}}><i class="bi bi-view-stacked"></i> View All </Link>
          </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddHotelForm;
