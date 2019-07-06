import React from 'react';
import Button from '@material/react-button';
import Dialog, {
  DialogTitle,
  DialogContent,
} from '@material/react-dialog';
import '@material/react-dialog/dist/dialog.css';
import '@material/react-button/dist/button.css';
import './DialogDatePicker.css';

export default ({ isOpen, toggle }) => {
  const onDialogClose = () => {
    // synchronize state
    if (isOpen) {
      toggle();
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onDialogClose}
    >
      <DialogTitle>Filter by Date</DialogTitle>
      <DialogContent>
        Ipsum lorem
      </DialogContent>
    </Dialog>
  );
};
