import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Logo.css';

const Logo = ({ className }) => (
  <div className={classnames('logo', className)}>
  </div>
);

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
