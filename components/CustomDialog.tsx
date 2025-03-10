import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

interface Iprops {
  title: string;
  message: string;
  confirmButtonLabel: string;
  handleConfirm: () => Promise<void>;
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onConfirm = async () => {
    setIsLoading(true);
    await handleConfirm();
    handleClose();
    setIsLoading(false);
  };

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
          <LoadingButton
            autoFocus
            color='error'
            variant='outlined'
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmButtonLabel}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
