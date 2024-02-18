'use client';

import React from 'react';
import { Icontext, ImenuItem } from '@/types';
import { useUserSession } from '@/hooks/useUserSession';
import {
  Gauge,
  AreaChart,
  UserRound,
  UsersRound,
  UserRoundCog,
} from 'lucide-react';

const Context = React.createContext<Icontext>({
  user: null,
  menuItems: [],
  userProfile: null,
});

interface Iprops {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Iprops> = ({ children }) => {
  const { user, userProfile } = useUserSession();

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
    <Context.Provider value={{ user, userProfile, menuItems }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => React.useContext(Context);
