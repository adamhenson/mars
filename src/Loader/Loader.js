import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Loader.css';

const Loader = ({ isActive }) => (
  <div
    className={classnames('loader', {
      'loader--active': isActive
    })}
  >
    <div className="loader__inner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

Loader.propTypes = {
  isActive: PropTypes.bool.isRequired
};

export default Loader;
