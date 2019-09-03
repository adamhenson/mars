import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogContent } from '@material/react-dialog';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import '@material/react-dialog/dist/dialog.css';
import '@material/react-button/dist/button.css';

const CALENDAR_HEIGHT = 300;

const DialogDatePicker = ({ fetchPhotosAction, isOpen, toggle }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDialogClose = () => {
    // synchronize state
    if (isOpen) {
      toggle();
    }
  };

  // when the selected date has changed, fetch photos based on the new date.
  useEffect(() => {
    fetchPhotosAction(selectedDate);
  }, [selectedDate]);

  // we use this trick so that `InfiniteCalendar` can calculate where
  // it needs to be. seems like it has a bug that we're addressing here.
  useEffect(() => {
    if (isOpen && !isCalendarVisible) {
      setIsCalendarVisible(true);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onDialogClose}>
      <DialogContent>
        {isCalendarVisible && (
          <InfiniteCalendar
            displayOptions={{
              showTodayHelper: false
            }}
            height={CALENDAR_HEIGHT}
            onSelect={date => {
              if (date !== selectedDate) {
                toggle();
                setSelectedDate(date);
              }
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

DialogDatePicker.propTypes = {
  fetchPhotosAction: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default DialogDatePicker;
