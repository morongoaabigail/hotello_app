import React from "react";
import { Slider1,Slider2, Slider3 } from "../Imports";
import { Link} from "react-router-dom";
import "./carousel.css";


function Banner({hotels}) {

  return (
      <div>
        <div
          id="myCarousel"
          className="carousel slide mb-6"
          data-bs-ride="carousel"
          data-bs-theme="light"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner ">
            <div className="carousel-item active mb-3">
              <img src={Slider1} alt="slider_1" className="img-fluid"/>
              <div className="container"> 
                <div className="carousel-caption text-center">
                  <h1>Effortless Hotel Booking Made Easy</h1>
                  <p className="opacity-75">Discover a Seamless Experience for Your Perfect Stayr</p>
                  <p>
                    <Link className="btn btn-outline-success btn-lg" to="/about">
                      Learn more 
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item mb-3">
            <img src={Slider2} alt="slider_2" className="img-fluid"/>
              <div className="container">
                <div className="carousel-caption">
                  <h1>Simplify Your Travel Plans</h1>
                  <p>Effortless Hotel Booking Made Easy</p>
                  <p>
                  <Link className="btn btn-outline-success btn-lg" to="/about">
                      Learn more 
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item mb-3">
            <img src={Slider3} alt="slider_3" className="img-fluid"/>
              <div className="container">
                <div className="carousel-caption text-center">
                  <h1>Effortless Hotel Booking:</h1>
                  <p>Your Gateway to Memorable Stays</p>
                  <p>
                    <Link className="btn btn-outline-success btn-lg" to="/gallery">
                      Browse gallery
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <br />
        <div className="search-rates mt-6 text-dark">
           <input type="text" name="pick date" id="pickDate"   className="datepicker" placeholder="Pick Date" style={{borderRadius:"0px"}} />
          <select aria-label="Default select example" >
            <option selected>Guests</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="2">4</option>
            <option value="3">5</option>
          </select>

          <select aria-label="Default select example" >
            <option selected>Children</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="2">4</option>
            <option value="3">5</option>
          </select>

          <a className="btn-rates" >
                      CHECK RATES
                    </a>

        </div>
      </div>
   
  );
}

export default Banner;
