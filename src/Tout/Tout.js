import React from 'react';
import PropTypes from 'prop-types';
import './Tout.css';

const Tout = ({
  altText,
  children,
  imageUrl,
}) => (
  <div className="tout">
    <div className="tout__image-container">
      <img
        alt={altText}
        src={imageUrl}
      />
    </div>
    <div className="tout__text">
      {children}
    </div>
  </div>
);

Tout.propTypes = {
  altText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Tout;
