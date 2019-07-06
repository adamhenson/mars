import React from 'react';
import PropTypes from 'prop-types';
import { ScrollProvider } from '@foo-software/react-scroll-context';
import Grid from '../Grid';
import Header from '../Header';
import Loader from '../Loader';
import ScrollContext from '../ScrollContext';
import './App.css';

const App = ({ isLoading }) => (
  <ScrollProvider
    Context={ScrollContext}
  >
    <div className="app">
      <Header />
      <Grid />
      <Loader
        isActive={isLoading}
      />
    </div>
  </ScrollProvider>
);

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default App;

