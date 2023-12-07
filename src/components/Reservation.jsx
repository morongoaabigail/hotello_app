import React, { useEffect, useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../config/firebase";
import { useLocation } from 'react-router-dom';
import Navbar from './subcomponents/Navbar';
import Footer from './subcomponents/Footer';
import CustomAlert from './subcomponents/CustomAlert';


function Reservation() {
  // Get the query parameter value from the location object
  const location = useLocation();
  const checkInDate = new URLSearchParams(location.search).get('checkindate');
  const checkOutDate = new URLSearchParams(location.search).get('checkoutdate');
  const nrDays = new URLSearchParams(location.search).get('nrDays');
  const totalPrice = new URLSearchParams(location.search).get('totalprice');
  const hoteName = new URLSearchParams(location.search).get('hotelname')
  const [Vat, setVat] = useState(0)
  const [GrandTotal, setGrandTotal] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [specailRequest, setSpecailRequest] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  //format date 

  var updateCheckIn = checkInDate; 
  var updateCheckOut = checkOutDate;

  // Convert the string to a Date object
  var dateNewCheckIn = new Date(updateCheckIn);
  var dateNewCheckOut = new Date(updateCheckOut);

  updateCheckIn = dateNewCheckIn.toISOString().split("T")[0];
  updateCheckOut = dateNewCheckOut.toISOString().split("T")[0];



  useEffect(() => {
    setVat(parseFloat(totalPrice) * parseFloat(0.15, 10))
    setGrandTotal(parseInt(totalPrice) + parseInt(Vat))

  })

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    try {

      const ReservationData = {
        name,
        surname,
        email,
        phone,
        arrivalTime,
        specailRequest,
        GrandTotal: parseFloat(GrandTotal),
        nrDays,
        hoteName,
        updateCheckIn,
        updateCheckOut,
      }

      // Save the reservation  data to Firestore
      const ReservationCollectionRef = collection(db, "reservation"); // Create a reference to "hotels" collection
      await addDoc(ReservationCollectionRef, ReservationData); // Use 'addDoc' with the collection reference


      // Clear form fields
      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
      setArrivalTime("");
      setSpecailRequest("");

      //Custom Alerts(note I must note forget to add other componets)
      setAlertType('success');
      setAlertMessage('Thank you. Your reservation has been received! Please, check your email for the reservation information');
      setShowAlert(true);
      setTimeout(() => {setShowAlert(false)},2000);
      
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("An error occurred while saving hotel details. Please try again later.");

    }
  };

  return (
    <div>
      <Navbar />
      <div class="banner">
        <div>
          <h1 className="text-light">Booking</h1>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row mt-5 reservation">
          <h6>YOUR RESERVATION</h6>
          <div className="col-md-4">
            <div className="p-3 bg-dark text-light">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="">check-In</label>
                  <input
                    type="text"
                    value={updateCheckIn}
                    className="form-control mb-3 mt-1"
                    required
                    name="check-in-date"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Check-Out</label>
                  <input
                    type="text"
                    value={updateCheckOut}
                    className="form-control mb-3 mt-1"
                    required
                    name="check-out-date"
                  />
                </div>
              </div>
              <h4 className="mt-3">{hoteName}</h4>
              <input type="text" value={hoteName} hidden="true" required name="hotel-name" />
              <table width="100%" className="table">
                <tbody>
                  <tr>
                    <td className="reservation-td-r text-mute">Night(2):</td>
                    <td className="reservation-td-l text-light">
                      <label htmlFor="">
                        <strong>{nrDays}</strong>
                      </label>
                      <input type="text" value={nrDays} hidden required name="number-of-days" />
                    </td>
                  </tr>
                  <tr>
                    <td className="reservation-td-r text-mute">Price:</td>
                    <td className="reservation-td-l text-light">
                      <label htmlFor="">
                        <strong>R {totalPrice}</strong>
                      </label>
                      <input type="text" value={totalPrice} hidden name="total-price" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <a class="btn btn-outline-success btn-lg" href="/rooms">
                Modify
              </a>
            </div>
          </div>
         
          <div className="col-8">
            <div className='p-3 bg-light shadow-sm'>
            <form onSubmit={handleOnSubmit} className='needs-validation' novalidate>
              <div class="row personal-details g-3 mb-3">
                <div class="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="FIRST NAME"
                    aria-label="FIRST NAME"
                    required
                    id="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div class="invalid-feedback">Please enter your first name.</div>
                </div>
                <div class="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="LAST NAME"
                    aria-label="LAST NAME"
                    required
                    name="surname"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <div class="invalid-feedback">Please enter your last name.</div>
                </div>
              </div>

              <div class="row personal-details g-3 ">
                <div class="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="EMAIL ADDRESS"
                    aria-label="EMAIL ADDRESS"
                    required
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div class="invalid-feedback">Please enter a valid email address.</div>
                </div>
                <div class="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="TELEPHONE"
                    aria-label="TELEPHONE"
                    pattern="[0-9]{10}"
                    required
                    name='phone'
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div class="invalid-feedback">Please enter a valid telephone number.</div>
              </div>

              <select style={{ height: "50px" }}
                aria-label="time arrival"
                className="form-select mb-3 mt-3"
                id="time-arrival"
                required
                name="arrival-time"
                onChange={(e) => setArrivalTime(e.target.value)}
              >
                <option disabled selected>TIME OF ARRIVAL</option>
                <option value="I don't know">I don't know</option>
                <option value="00:00 - 01:00">00:00 - 01:00</option>
                <option value="01:00 - 02:00">01:00 - 02:00</option>
                <option value="02:00 - 03:00">02:00 - 03:00</option>
                <option value="03:00 - 04:00">03:00 - 04:00</option>
                <option value="04:00 - 05:00w">04:00 - 05:00</option>
                <option value="05:00 - 06:00">05:00 - 06:00</option>
                <option value="06:00 - 07:00">06:00 - 07:00</option>
                <option value="07:00 - 08:00">07:00 - 08:00</option>
                <option value="08:00 - 09:00">08:00 - 09:00</option>
                <option value="09:00 - 10:00">09:00 - 10:00</option>
                <option value="10:00 - 11:00">10:00 - 11:00</option>
                <option value="1:00 - 12:00">11:00 - 12:00</option>
                <option value="12:00 - 13:00">12:00 - 13:00</option>
                <option value="13:00 - 14:00">13:00 - 14:00</option>
                <option value="14:00 - 15:00">14:00 - 15:00</option>
                <option value="15:00 - 16:00">15:00 - 16:00</option>
                <option value="16:00 - 17:00">16:00 - 17:00</option>
                <option value="17:00 - 18:00">17:00 - 18:00</option>
                <option value="18:00 - 19:00">18:00 - 19:00</option>
                <option value="19:00 - 20:00">19:00 - 20:00</option>
                <option value="20:00 - 21:00">20:00 - 21:00</option>
                <option value="21:00 - 22:00">21:00 - 22:00</option>
                <option value="22:00 - 23:00">22:00 - 23:00</option>
                <option value="23:00 - 00:00">23:00 - 00:00</option>
              </select>

              <textarea rows="4" cols="5" className='form-control mt-1' placeholder='SPECIAL REQUESTS' onChange={(e) => setSpecailRequest(e.target.value)}></textarea>
              <span className='text-muted' style={{ fontStyle: "italic" }}>Special requests cannot be guaranteed but we will do our best to meet your needs.</span>

              <table class="table mt-5">
                <h6>BOOKING DETAILS</h6>
                <tbody>
                  <tr>
                    <td class="text-start">Check-In:</td>
                    <td class="text-end"><strong>{updateCheckIn}</strong></td>
                  </tr>

                  <tr>
                    <td class="text-start">Check-Out:</td>
                    <td class="text-end"><strong>{updateCheckOut}</strong></td>
                  </tr>
                  <tr>
                    <td class="text-start">Pets:</td>
                    <td class="text-end text-danger"><b>Pets are not allowed.</b></td>
                  </tr>
                </tbody>
              </table>

              <h6 className='mt-5'>YOUR RESERVATION</h6>
              <table class="table">
                <thead className='bg-dark'>
                  <tr>
                    <th>Room</th>
                    <th>Qty</th>
                    <th className='text-end'>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-start'><b>{hoteName}</b>-<small className='text-danger'>Non-refundable</small></td>
                    <td><b>1</b></td>
                    <td className='text-end'><b>R {totalPrice}</b></td>
                  </tr>
                  <tr>
                    <td><small><b>subtotal:</b></small></td>
                    <td></td>
                    <td className='text-end'><b>R {totalPrice}</b></td>
                  </tr>
                  <tr>
                    <td><b>Tax total:</b></td>
                    <td></td> 
                    <td className='text-end'> <b>R {Vat}</b></td>
                  </tr>
                  <tr>
                    <td><b>Total:</b></td>
                    <td></td>
                    <td className='text-end'><b>R {GrandTotal}</b></td>
                  </tr>
                </tbody>
              </table>
              <div className='alert alert-warning'> <small>Non-cancellable, non-refundable room reservation; cancellation charges total price. Enjoy your stay, thank you</small></div>
             
              <div className="form-check mt-5">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheckbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="termsCheckbox">
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>.
                </label>
              </div>
              <button
                type="submit" style={{width:"100%"}}
                className="btn btn-outline-success btn-lg mt-3"
                disabled={!isChecked}
              >
                Submit
              </button>
            </form>
            {showAlert && (
              <CustomAlert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
            )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Reservation;