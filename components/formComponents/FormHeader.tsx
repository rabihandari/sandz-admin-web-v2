import React from 'react';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

interface Iprops {
  title?: string;
  reset: () => void;
  isLoading: boolean;
  buttonLabel: string;
}

const FormHeader: React.FC<Iprops> = ({
  reset,
  title,
  isLoading,
  buttonLabel,
}) => {
  return (
    <div className='flex items-center justify-between pb-5'>
      {title ? <h3 className='text-2xl font-medium'>{title}</h3> : <div />}
      <div className='flex items-center gap-2'>
        <Button
          color='error'
          onClick={reset}
          variant='outlined'
          className='bg-red-100 hover:bg-red-200'
        >
          Discard
        </Button>
        <LoadingButton
          type='submit'
          variant='contained'
          loading={isLoading}
          className='bg-primary'
        >
          {buttonLabel}
        </LoadingButton>
      </div>
    </div>
  );
};

export default FormHeader;
