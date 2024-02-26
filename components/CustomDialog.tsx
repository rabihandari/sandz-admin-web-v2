import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';

interface Iprops {
  title: string;
  message: string;
  handleConfirm: () => void;
  confirmButtonLabel: string;
  children: (handleOpen: () => void) => React.ReactNode;
}

const CustomDialog: React.FC<Iprops> = ({
  title,
  message,
  children,
  handleConfirm,
  confirmButtonLabel,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {children(handleOpen)}
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            autoFocus
            color='error'
            variant='outlined'
            onClick={handleConfirm}
          >
            {confirmButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
