import React from 'react';
import Navbar from './subcomponents/Navbar';
import Footer from './subcomponents/Footer';
import '@fancyapps/fancybox/dist/jquery.fancybox.css';
import '@fancyapps/fancybox';

function Gallery({ gallery }) {
  return (
    <div>
      <Navbar />
      <div className="banner">
        <div>
          <h1 className="text-light">Gallery</h1>
        </div>
        
      </div>
      <div className='p-3 bg-light shadow-sm mb-3'><h4 className='text-center mt-3 ' style={{fontStyle:"italic" }}>"Discover the Captivating World of Hotel Images"</h4></div>
      
      <div className="container">
        {gallery && gallery.length > 0 ? (
          <div className="row">
            {gallery.map((galleryItem) => (
              <div key={galleryItem.id} className="col-md-4 p-3">
                <a href={galleryItem.imageUrl} className="fancybox" data-fancybox="gallery" data-caption={galleryItem.caption}>
                  <img src={galleryItem.imageUrl} className="card-img-top" alt="gallery" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <h4 className='text-center p-3 text-muted'>No items found in the gallery.</h4>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Gallery;