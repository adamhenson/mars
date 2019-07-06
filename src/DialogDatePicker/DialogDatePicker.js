import React, { useEffect, useState } from 'react';
import Dialog, { DialogContent } from '@material/react-dialog';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import '@material/react-dialog/dist/dialog.css';
import '@material/react-button/dist/button.css';
import './DialogDatePicker.css';

const CALENDAR_HEIGHT = 300;

export default ({ isOpen, toggle }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onDialogClose = () => {
    // synchronize state
    if (isOpen) {
      toggle();
    }
  }

  // we use this trick so that `InfiniteCalendar` can calculate where
  // it needs to be. seems like it has a bug that we're addressing here.
  useEffect(() => {
    if (isOpen && !isCalendarVisible) {
      setIsCalendarVisible(true);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={onDialogClose}
    >
      <DialogContent>
        {isCalendarVisible &&
          <InfiniteCalendar
            displayOptions={{
              showTodayHelper: false,
            }}
            height={CALENDAR_HEIGHT}
          />
        }
      </DialogContent>
    </Dialog>
  );
};
