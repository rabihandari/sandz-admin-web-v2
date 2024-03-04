import Image from 'next/image';
import React from 'react';

const DashboardPage = () => {
  return (
    <div className='h-[calc(100vh-97px)] flex items-center justify-center flex-col gap-6'>
      <Image
        src='/underConstructionLogo.svg'
        alt='Under Construction Logo'
        width={400}
        height={80}
        priority
      />
      <h4 className='text-xl'>Page is under construction</h4>
    </div>
  );
};

export default DashboardPage;
