import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='h-screen flex overflow-hidden'>
      <Sidebar />
      <div className='flex-grow w-full h-full'>
        <Navbar />
        <div className='bg-[#F8F7FA] overflow-y-scroll h-[calc(100vh-97px)]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
