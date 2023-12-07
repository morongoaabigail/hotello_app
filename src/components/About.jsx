import React from 'react'
import Navbar from './subcomponents/Navbar'
import Footer from './subcomponents/Footer'
import { Home1,Home2, Home3 } from './Imports';


function About() {

  return (
    <div>
      <Navbar />
      <div class="banner mb-5">
        <div>
          <h1 className='text-light'>About</h1>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-4">
            <h3 className='h3' style={{ textAlign: "center" }}>Everything. Right where you need it.</h3>
          </div>
          <div className="col-md-8" style={{ textAlign: "justify" }} >
            <p>Hotello booking has revolutionized the way we plan our trips and secure accommodations. With just a few clicks or taps, travelers can now explore a vast array of options and effortlessly reserve their desired rooms. Gone are the days of tedious phone calls and uncertainty. Online platforms and mobile apps have made the process convenient, allowing travelers to compare prices, read reviews, and select the perfect hotel that suits their preferences and budget. Whether it's a luxurious resort, a cozy boutique hotel, or a budget-friendly accommodation, hotel booking platforms have simplified the entire experience, ensuring a seamless and stress-free journey from start to finish. So, sit back, relax, and let hotel booking take you on a hassle-free journey to your dream destination.</p>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-md-4">
            <div className="image-card">
              <img src={Home1} alt="Image 1" />
              <div className="overlay">
                <div className="overlay-content">
                  <h3 className='text-light'>24H Room Service 1</h3>
                  <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="image-card">
              <img src={Home2} alt="Image 2" />
              <div className="overlay">
                <div className="overlay-content">
                  <h3 className='text-light'>Restaurant And Bars</h3>
                  <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="image-card">
              <img src={Home3} alt="Image 3" />
              <div className="overlay">
                <div className="overlay-content">
                  <h3 className='text-light'>Events And Meetings</h3>
                  <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
export default About
