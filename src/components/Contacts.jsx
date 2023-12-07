import React from 'react'
import Navbar from './subcomponents/Navbar'
import Footer from './subcomponents/Footer'
import { Link } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';

function Contacts() {
  const [state, handleSubmit] = useForm("xknarjyv");
  if (state.succeeded) {
    return (
      <div className='p-3 shadow-sm bg-light text-center'>
        <p>Message sent Succesfully!
        </p>
        <Link to="/" className="btn btn-outline-success">Home</Link>
      </div>
    );
  }
  return (

    <div>
      <Navbar />
      <div class="banner">
        <div>
          <h1 className='text-light'>Get in touch</h1>
        </div>
      </div>

      <section class="container py-5">
        <p>Waters midst. Creature man female. Them You’re female there his for first were have whose and blessed darkness his man Darkness had you’re hath fill were. Gathering may living moveth had evening called behold. Blessed darkness subdue he open she’d of void sea one let after light thing have creeping living the brought</p>
        <div class="row">
          <div class="col-lg-6 mt-5">

            <form onSubmit={handleSubmit} method="post">
              <div class="mb-3">
                <input type="text" class="form-control" id="name" name='name' placeholder="Name" required />
              </div>
              <ValidationError
                prefix="name"
                field="name"
                errors={state.errors}
              />
              <div class="mb-3">
                <input type="email" class="form-control" id="email" name='email' placeholder='Email' required />
              </div>
              <div class="mb-3">
                <textarea class="form-control" id="message" rows="5" name="message" required placeholder='Message'></textarea>
              </div>
              <button type="submit" class="btn btn-outline-success">Submit</button>
            </form>
          </div>
          <div class="col-lg-6 mt-5">
            <p>28 Doornkraal, Annadale <br />Polokwane<br /> 0699</p>
            <div class="map">
              <iframe title='map'
                src="https://www.google.com/maps?q=28%20Doornkraal%20Annandale,%20Polokwane&amp;output=embed"
                width="100%" height="300" frameborder="0" style={{ border: "0" }} allowfullscreen="" aria-hidden="false"
                tabindex="0"></iframe>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
export default Contacts
