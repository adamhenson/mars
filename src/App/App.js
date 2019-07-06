import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollProvider } from '@foo-software/react-scroll-context';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-button/dist/button.css';
import '@material/react-material-icon/dist/material-icon.css';
import AccentBlock from '../AccentBlock';
import DialogDatePicker from '../DialogDatePicker';
import Grid from '../Grid';
import Header from '../Header';
import Loader from '../Loader';
import ScrollContext from '../ScrollContext';
import './App.css';

const App = ({ isLoading }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <ScrollProvider
      Context={ScrollContext}
    >
      <div className="app">
        <Header />
        <AccentBlock>
          A Mars rover is a motor vehicle that travels across the surface of the planet Mars upon arrival. Rovers have several advantages over stationary landers: they examine more territory, they can be directed to interesting features, they can place themselves in sunny positions to weather winter months, and they can advance the knowledge of how to perform very remote robotic vehicle control.
        </AccentBlock>
        <Button
          className="app__buttonFilter"
          onClick={toggleDialog}
          icon={(
            <MaterialIcon icon="date_range" />
          )}
          unelevated
        >
          Filter
        </Button>
        <Grid />
        <DialogDatePicker
          isOpen={isDialogOpen}
          toggle={toggleDialog}
        />
        <Loader
          isActive={isLoading}
        />
      </div>
    </ScrollProvider>
  );
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default App;

