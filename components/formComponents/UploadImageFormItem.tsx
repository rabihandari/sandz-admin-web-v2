import React from 'react';
import Wrapper from '../Wrapper';
import DropzoneComponent from './Dropzone';
import { Alert, Typography } from '@mui/material';

interface Iprops {
  label: string;
  isInPannel?: boolean;
  error: string | undefined;
  setValue: (file: File) => void;
  getValues: () => File | string | null;
}

const UploadImageFormItem: React.FC<Iprops> = ({
  error,
  label,
  setValue,
  getValues,
  isInPannel = false,
}) => {
  return (
    <Wrapper isInPannel={isInPannel}>
      {!isInPannel && <h4 className='text-lg font-medium text-gray'>Media</h4>}
      <Typography className='text-gray'>{label}</Typography>
      <DropzoneComponent
        file={getValues()}
        setFile={(file) => file && setValue(file)}
      />
      {error && (
        <Alert severity='error' className='w-[500px]'>
          {error}
        </Alert>
      )}
    </Wrapper>
  );
};

export default UploadImageFormItem;
