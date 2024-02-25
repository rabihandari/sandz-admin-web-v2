'use client';

import React from 'react';
import { Bell, Mail } from 'lucide-react';
import { useAppContext } from '@/context';
import { usePathname } from 'next/navigation';
import { Avatar, Divider } from '@mui/material';
import { checkUserToken } from '@/serverActions';

const Navbar = () => {
  const pathname = usePathname();
  const { userProfile, menuItems } = useAppContext();

  const currentMenuItem = menuItems.find((item) =>
    pathname.includes(item.basePath),
  );

  const { setUserProfile, handleLogout } = useAppContext();

  React.useEffect(() => {
    (async () => {
      const res = await checkUserToken();
      if (!res) {
        await handleLogout();
      } else {
        setUserProfile(res);
      }
    })();
  }, []);

  return (
    <div className='bg-white h-[97px] flex items-center justify-between px-10'>
      <div className='flex flex-col'>
        <h2 className='font-bold text-[23px]'>{currentMenuItem?.title}</h2>
        <h3 className='text-[#7B7B7B] text-sm'>{currentMenuItem?.subTitle}</h3>
      </div>
      <div className='flex gap-5 items-center'>
        <Bell color='#D0D1D3' />
        <Mail color='#D0D1D3' />
        <Divider
          flexItem
          orientation='vertical'
          sx={{ backgroundolor: '#D0D1D3' }}
        />
        <p className='text-[#646464]'>{userProfile?.displayName}</p>
        <Avatar src={userProfile?.photoUrl} />
      </div>
    </div>
  );
};

export default Navbar;
