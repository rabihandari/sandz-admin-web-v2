'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/serverActions';
import { appAuth } from '@/lib/firebase-config';
import { Icontext, ImenuItem, Iuser } from '@/types';
import {
  Gauge,
  AreaChart,
  UserRound,
  UsersRound,
  UserRoundCog,
} from 'lucide-react';

const Context = React.createContext<Icontext>({
  menuItems: [],
  userProfile: null,
  setUserProfile: () => {},
  handleLogout: async () => {},
});

interface Iprops {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Iprops> = ({ children }) => {
  const router = useRouter();
  const [userProfile, setUserProfile] = React.useState<Iuser | null>(null);

  const handleLogout = async () => {
    await logoutUser();
    await appAuth.signOut();
    router.push('/login');
  };

  const menuItems: ImenuItem[] = [
    {
      basePath: '/',
      title: 'Dashboard',
      icon: <Gauge color='white' />,
      subTitle: 'View your admin dashboard',
    },
    {
      title: 'Areas',
      basePath: '/area',
      icon: <AreaChart color='white' />,
      subTitle: 'Administer, add, and modify designated areas',
      children: [
        {
          title: 'Area list',
          path: '/list',
        },
        {
          title: 'Add area',
          path: '/add',
        },
      ],
    },
    {
      title: 'Customers',
      basePath: '/customer',
      icon: <UserRound color='white' />,
      subTitle: 'Administer, add, and modify designated customers',
      children: [
        {
          title: 'Customers list',
          path: '/list',
        },
        {
          title: 'Add Customer',
          path: '/add',
        },
      ],
    },
    {
      title: 'Vendors',
      basePath: '/vendor',
      icon: <UserRoundCog color='white' />,
      subTitle: 'Administer, add, and modify designated Vendors',
      children: [
        {
          title: 'Vendors list',
          path: '/list',
        },
        {
          title: 'Add Vendor',
          path: '/add',
        },
      ],
    },
    {
      title: 'Clients',
      basePath: '/client',
      icon: <UsersRound color='white' />,
      subTitle: 'Administer designated clients',
      children: [
        {
          title: 'Clients list',
          path: '/list',
        },
      ],
    },
  ];

  return (
    <Context.Provider
      value={{ userProfile, setUserProfile, menuItems, handleLogout }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => React.useContext(Context);
