import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ListImages({ gallery }) {

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            // Generate a unique filename for the image
            const imageName = Date.now() + "_" + image.name;
            // Upload the image file to Firebase Storage
            const imageRef = ref(storage, `images/${imageName}`); // Add a forward slash before "images"
            await uploadBytes(imageRef, image);
            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(imageRef);

            const galleryData = {

                imageUrl: downloadURL, // Add the image URL to the hotel data
            };

            // Save the hotel data to Firestore
            const docRef = await addDoc(collection(db, "gallery"), galleryData);
            console.log("Document written with ID: ", docRef.id);
            // Clear form fields
            setImage(null);
            alert("Image saved  successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("An error occurred while saving hotel details. Please try again later.");
        }
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 p-3 bg-dark text-light shadow-sm"> 
                    <h4>Upload Image</h4>
                    <hr />
                    <div className="mb-3">
                        <input type="file" className="form-control" id="fileInput" onChange={handleImageChange} />
                    </div>
                    <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
                </div>
                <div className="col-md-8 ">
                    <div className="row p-3 bg-light  shadow-sm">
                    {gallery.map((gal) => (
                         <div className="col-md-2 mt-3">
                        <div key={gal.id}>
                                <img src={gal.imageUrl} className="img-fluid" style={{ width: "350px", height: "100px" }} alt=" Image" />
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    )
}
export default ListImages
