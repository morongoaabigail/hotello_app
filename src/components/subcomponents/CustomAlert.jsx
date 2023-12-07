import React from 'react';

const CustomAlert = ({ type, message, onClose }) => {
  return (
    <div className={`custom-alert alert alert-${type} mt-3`} role="alert">
      <button type="button" className="btn-close" onClick={onClose}></button>
      {message}
    </div>
  );
};

export default CustomAlert;