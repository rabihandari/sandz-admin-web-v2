import React from 'react';
import { Alert, FormControlLabel } from '@mui/material';

interface Iprops {
  label: string;
  errorMsg: string | undefined;
  children: React.ReactElement<any, any>;
}

const FormItemWrapper: React.FC<Iprops> = ({ children, errorMsg, label }) => {
  return (
    <div className='flex flex-col gap-2'>
      <FormControlLabel
        label={label}
        control={children}
        labelPlacement='top'
        className='items-start m-0 gap-2 text-gray w-[500px]'
      />
      {errorMsg && (
        <Alert severity='error' className='w-[500px]'>
          {errorMsg}
        </Alert>
      )}
    </div>
  );
};

export default FormItemWrapper;
