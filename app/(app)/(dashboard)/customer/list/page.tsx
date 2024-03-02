import React from 'react';
import { NextPage } from 'next';
import { Icustomer } from '@/types';
import { getDocuments } from '@/firebase';
import CustomerList from './CustomerList';
import { handleCountReservations } from '.';
import { USERS_COLLECTION } from '@/constants';

const CustomerListPage: NextPage = async () => {
  let data: Icustomer[] = [];

  try {
    const customers = ((await getDocuments(USERS_COLLECTION, {
      role: 'customer',
    })) || []) as Icustomer[];

    data = await Promise.all(
      customers.map(async (customer) => {
        const totalReservations = await handleCountReservations(customer.uid);

        return {
          ...customer,
          totalReservations,
        };
      }),
    );
  } catch (err) {}

  return (
    <div className='p-10'>
      <CustomerList customers={data} />
    </div>
  );
};

export default CustomerListPage;
