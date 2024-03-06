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
        sx={{
          margin: 0,
          gap: '0.5rem',
          width: '500px',
          color: '#5D596C',
          alignItems: 'start',
        }}
      />
      {errorMsg && (
        <Alert severity='error' sx={{ width: '500px' }}>
          {errorMsg}
        </Alert>
      )}
    </div>
  );
};

export default FormItemWrapper;
