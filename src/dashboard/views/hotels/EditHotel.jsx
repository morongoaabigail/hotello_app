import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../config/firebase';
import Header from '../components/dashboardNav';
import Footer from '../components/dashboardFooter';
import { Room1 } from '../../../components/Imports';
import CustomAlert from '../../../components/subcomponents/CustomAlert';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function EditHotel() {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        guest: '',
        children: '',
        price: '',
        roomType: '',
        roomSize: '',
        imageUrl: '',
        imageFile: null,
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const hotelDocRef = doc(db, 'hotels', id);
                const hotelSnapshot = await getDoc(hotelDocRef);

                if (hotelSnapshot.exists()) {
                    setHotel(hotelSnapshot.data());
                    // Initialize the form data with the current hotel data
                    setFormData({
                        name: hotelSnapshot.data().name,
                        description: hotelSnapshot.data().description,
                        guest: hotelSnapshot.data().guest,
                        children: hotelSnapshot.data().children,
                        price: hotelSnapshot.data().price,
                        roomType: hotelSnapshot.data().roomType,
                        roomSize: hotelSnapshot.data().roomSize,
                        imageUrl: hotelSnapshot.data().imageUrl,
                    });
                } else {
                    console.log('Hotel not found');
                }
            } catch (error) {
                console.error('Error fetching hotel details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [id]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        // Check if the event is triggered by the file input
        if (name === 'image' && files && files.length) {
            // Read the selected file and store it in the state
            const selectedImage = files[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                imageFile: selectedImage,
                // Preview the selected image
                imageUrl: URL.createObjectURL(selectedImage),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { imageFile, ...dataWithoutImage } = formData;

            // Generate a unique filename for the image
            const imageName = Date.now() + '_' + imageFile.name;

            // Upload the image file to Firebase Storage
            const imageRef = ref(storage, `images/${imageName}`); // Add a forward slash before "images"
            await uploadBytes(imageRef, imageFile);

            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(imageRef);

            // Update the hotel data with the new image URL
            dataWithoutImage.imageUrl = downloadURL;

            // Update the hotel document with the new data (excluding the image)
            const hotelDocRef = doc(db, 'hotels', id);
            await updateDoc(hotelDocRef, dataWithoutImage);
       
            setAlertType('success');
            setAlertMessage('Room data updated successfully!');
            setShowAlert(true);
            setTimeout(()=>setShowAlert(false), 10000);

        } catch (error) {
            console.error('Error updating hotel data:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!hotel) {
        return <div>Hotel not found.</div>;
    }
    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 p-3 bg-light shadow-sm mb-5 ">
                        <div>
                            <h4>
                                <i className="bi bi-building-add"></i> EDIT ROOM{' '}
                            </h4>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Size"
                                        name="roomSize"
                                        value={formData.roomSize}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        placeholder="Description"
                                        className="form-control"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <select
                                        aria-label="room type"
                                        className="form-select"
                                        name="roomType"
                                        value={formData.roomType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option disabled selected>
                                            Room Type
                                        </option>
                                        <option value="Studio">Studio</option>
                                        <option value="Standart">Standart</option>
                                        <option value="Delux">Delux</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select
                                        aria-label="Guests"
                                        className="form-select"
                                        name="guest"
                                        value={formData.guest}
                                        onChange={handleChange}
                                    >
                                        <option disabled selected>
                                            Guests
                                        </option>
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
                                        name="children"
                                        value={formData.children}
                                        onChange={handleChange}
                                    >
                                        <option disabled selected>
                                            Children
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        style={{ width: '100px' }}
                                    />
                                </div>
                                <img
                                    src={formData.imageUrl}
                                    className="img-fluid mb-3"
                                    alt=""
                                    style={{ width: '200px' }}
                                />
                                <input
                                    className="form-control"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleChange}
                                />
                                <br />
                                {showAlert && (
                                    <CustomAlert
                                        type={alertType}
                                        message={alertMessage}
                                        onClose={() => setShowAlert(false)}
                                    />
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-outline-success mt-3"
                                    style={{ width: '100%' }}
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="p-3 bg-dark">
                            <img
                                src={Room1}
                                alt=""
                                className="img-fluid"
                                style={{ width: '100%' }}
                            />
                            <Link
                                to="/list_hotels"
                                className="btn btn-danger mt-3"
                                style={{ width: '100%' }}
                            >
                                <i className="bi bi-view-stacked"></i> View All{' '}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default EditHotel;