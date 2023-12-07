import React, { useEffect, useState   } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HotelListing from './HotelListing';
import CustomAlert from './CustomAlert';
import { AirConditioner, Concierge, Shower, Smoking, Minibar, Television, Slippers, Wifi, WeightLifting, Mop } from '../Imports';

function HotelDetails() {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIndDate, setCheckInDate] = useState(null);
    const [checkOutdDate, setCheckOutDate] = useState(null);
    const [nrDays, setNrDays] = useState('');
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
  

    console.log(checkIndDate)
    console.log(checkOutdDate)
    //Passing data to reservation component
    const handleNrDaysChnge = (event) => {
        const days = event.target.value;
        setNrDays(days);
        // Calculate the total price
        const total = parseFloat(hotel.price) * parseInt(days, 10);
        setTotalPrice(total);
       
        console.log(total)
    };

    // Handle date selection
    const handleDateChangeCheckIn = (date) => {
        setCheckInDate(date);
    };

    const handleDateChangeCheckOut = (date) => {
        setCheckOutDate(date);
        
    };
   
    // Function to handle button click and redirect to the next component
    const handleButtonClick = () => {

   
   //Validate the forms
   const errors = {};

  if (nrDays.trim() === "" ){
    errors.nrNights = ""
    setAlertMessage('Number of nights required');
    setAlertType('danger');
    setShowAlert(true);
  }

  setErrors(errors);

  if (Object.keys(errors).length === 0) {
    // Redirect to the "/next" route and pass the textBoxValue as a query parameter
    navigate(
        `/reservation?checkindate=${encodeURIComponent(
            checkIndDate
        )}&checkoutdate=${encodeURIComponent(
            checkOutdDate
        )}&&nrDays=${encodeURIComponent(
            nrDays
        )}&&totalprice=${encodeURIComponent(totalPrice)}&&hotelname=${(encodeURIComponent(hotel.name))} `
    );
  }

}
    useEffect(() => {
        // Fetch data
        const fetchHotelDetails = async () => {
            try {
                // Retrieve the specific hotel document from Firestore based on the id
                const hotelDocRef = doc(db, 'hotels', id);
                const hotelSnapshot = await getDoc(hotelDocRef);

                if (hotelSnapshot.exists()) {
                    // Set the hotel state with the retrieved data
                    setHotel(hotelSnapshot.data());
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

    if (loading) {
        return <div className='text-center p-3 bg-light shadow-sm'>Loading...</div>;
    }

    if (!hotel) {
        return (
            <div>
                <div className="banner">
                    <div>
                        <h1 className='text-light'>Hotels</h1>
                    </div>
                </div>

                <div className='text-center text-muted p-3'>

                    <h4>Sorry! Hotel not found.</h4>
                    <Link to="/">Home</Link>

                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="banner mb-5">
                <div>
                    <h1 className='text-light'>{hotel.name}</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <img src={hotel.imageUrl} alt={hotel.name} style={{ width: "853px" }} className='img-fluid mb-5' />
                        <br />
                        <div className="container">
                            <div className="row p-3 mb-5 hotel-extras" style={{ backgroundColor: "#e4e4e4" }}>
                                <div className="col-md-2 p-3 mr-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={AirConditioner} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Air Conditioner</small>
                                </div>

                                <div className="col-md-2 p-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={Concierge} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Concierge</small>
                                </div>

                                <div className="col-md-2 p-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={Television} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Cable TV</small>
                                </div>

                                <div className="col-md-2 p-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={Slippers} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Free Slippers</small>
                                </div>

                                <div className="col-md-2 p-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={Wifi} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Free Wifi</small>
                                </div>
                                {/*New row*/}
                                <div className="col-md-2 p-3 mr-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={WeightLifting} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Gym Access</small>
                                </div>

                                <div className="col-md-2 p-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={Mop} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Cleaning</small>
                                </div>

                                <div className="col-md-2 p-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={Shower} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Shower</small>
                                </div>

                                <div className="col-md-2 p-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={Smoking} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Smoking</small>
                                </div>

                                <div className="col-md-2 p-3 bg-light  text-center" style={{ backgroundColor: "whitesmoke", margin: "3px" }}>
                                    <img src={Minibar} alt="" className='img-fluid ' style={{ width: "50px" }} /> <br />
                                    <small>Minibar</small>
                                </div>

                            </div>
                        </div>
                        <p style={{ textAlign: "justify" }} className='mb-5'>{hotel.description}</p>

                        <h4 className='mb-3'>ROOM DETAILS</h4>

                        <table width="100%" className='table'>
                            <tbody colspan="2">
                                <tr >
                                    <td>Guests:</td>
                                    <td><strong>{hotel.guest}</strong></td>
                                </tr>
                                <tr>
                                    <td>Children:</td>
                                    <td><strong>{hotel.children}</strong></td>
                                </tr>
                                <tr>
                                    <td>Room Size:</td>
                                    <td><strong>{hotel.roomSize} m²</strong></td>
                                </tr>
                                <tr >
                                    <td>RoomType:</td>
                                    <td><strong>{hotel.roomType}</strong></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <div className='p-5 bg-dark shadow-sm text-light'>
                            <div className="row mb-3 needs-validation" novalidate >
                                <div className='col-md-6 '>
                                    <label htmlFor="check-in" className='mb-3'> <i class="bi bi-calendar-check"></i> CHECK-IN</label>
                                    <DatePicker
                                        selected={checkIndDate}
                                        dateFormat="dd/MM/yyyy"
                                        showTimeSelect={false}
                                        showTimeSelectOnly={false}
                                        showTimeInput={false}
                                        onChange={handleDateChangeCheckIn}
                                        className="form-control"
                                        placeholderText="Check In" name="check-in"
                                        style={{ borderRadius: "0px", with: "100%" }}
                                        value={checkIndDate && checkIndDate}
                                        required
                                      
                                    />
                                     
                                    </div>
                                <div className='col-md-6'>
                                    <label htmlFor="check-out" className='mb-3'> <i class="bi bi-calendar-x"></i> CHECK-OUT</label>
                                    <DatePicker
                                        selected={checkOutdDate}
                                        onChange={handleDateChangeCheckOut}
                                        className="form-control"
                                        placeholderText="Check out" name="check-out"
                                        style={{ borderRadius: "0px", with: "100%" }}
                                        value={checkOutdDate && checkOutdDate}
                                        required
                                        dateFormat="dd/MM/yyyy"
                                        showTimeSelect={false}
                                        showTimeSelectOnly={false}
                                        showTimeInput={false}
                                    />
                                </div>
                            </div>

                            <input type="number" name="Days" value={nrDays} className="form-control mb-3" placeholder="Day(s)" style={{ borderRadius: "0px" }} onChange={handleNrDaysChnge} required />
                           
                            <div className='price-pernight mt-3 p-3 md-3'>
                                <h5>R{parseFloat(hotel.price).toFixed(2)} / PER NIGHT</h5>
                            </div>
                            <br />
                            <button className="btn btn-outline-success" style={{ width: "100%" }} disabled>
                                CHECK AVAILABILITY
                            </button> <hr />
                            <button className="btn btn-outline-success" style={{ width: "100%" }} onClick={handleButtonClick}>
                                BOOK
                            </button>

                            {showAlert && (
                                <CustomAlert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-5 bg-light mt-5 text-center'>
                <h3>Related rooms</h3>
                <HotelListing />
            </div>

        </div>
    )
}

export default HotelDetails;