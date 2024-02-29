import React from 'react';
import { X } from 'lucide-react';
import { Drawer } from '@mui/material';

interface Iprops {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const CustomDrawer: React.FC<Iprops> = ({
  open,
  title,
  children,
  handleClose,
}) => {
  return (
    <Drawer anchor={'right'} open={open} onClose={handleClose}>
      <div className='p-5 h-full flex flex-col'>
        <div className='flex justify-between items-center'>
          <h3 className='text-2xl font-medium'>{title}</h3>
          <div className='w-[46px] cursor-pointer h-[46px] bg-[#F1F1F2] rounded-lg flex items-center justify-center'>
            <X onClick={handleClose} color='#5D596C99' />
          </div>
        </div>
        {children}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
