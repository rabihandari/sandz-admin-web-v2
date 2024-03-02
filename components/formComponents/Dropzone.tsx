import React from 'react';
import Image from 'next/image';
import { ArrowUpToLine } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button } from '@mui/material';

interface Iprops {
  file: File | string | null;
  setFile: (file: File | null) => void;
}

const DropzoneComponent: React.FC<Iprops> = ({ file, setFile }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0] || null);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragOver: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: false,
    accept: {
      'image/*': [],
    },
  });

  const url = file
    ? typeof file === 'string'
      ? file
      : URL.createObjectURL(file)
    : null;

  const fileName = file && typeof file !== 'string' ? file.name : '';

  return (
    <div
      {...getRootProps()}
      className={`p-10 w-[500px] flex flex-col items-center border-2 border-dashed rounded-lg gap-5 cursor-pointer ${
        isDragging ? 'border-primary' : 'border-light-gray'
      }`}
    >
      <input {...getInputProps()} accept='image/*' />
      {url ? (
        <>
          <Image
            src={url}
            width={300}
            height={300}
            alt={fileName}
            className='rounded-lg'
          />
          <Button
            disableElevation
            color='secondary'
            variant='contained'
            className='bg-secondary text-primary'
          >
            Replace image
          </Button>
        </>
      ) : (
        <>
          <div className='w-[46px] h-[46px] bg-[#F1F1F2] rounded-lg flex items-center justify-center'>
            <ArrowUpToLine color='#5D596C99' />
          </div>
          <Typography
            variant='body2'
            gutterBottom
            className='text-gray text-lg'
          >
            Drag and drop your image here
          </Typography>
          <Typography
            variant='body2'
            gutterBottom
            className='text-gray opacity-60 text-xl'
          >
            Or
          </Typography>
          <Button
            disableElevation
            color='secondary'
            variant='contained'
            className='bg-secondary text-primary'
          >
            Browse image
          </Button>
        </>
      )}
    </div>
  );
};

export default DropzoneComponent;
