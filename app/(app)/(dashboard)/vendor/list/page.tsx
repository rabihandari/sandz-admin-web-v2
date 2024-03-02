import React from 'react';
import { NextPage } from 'next';
import { Ivendor } from '@/types';
import VendorList from './VendorList';
import { handleCountOrders } from '.';
import { getDocuments } from '@/firebase';
import { USERS_COLLECTION } from '@/constants';

const VendorListPage: NextPage = async () => {
  let data: Ivendor[] = [];

  try {
    const vendors = ((await getDocuments(USERS_COLLECTION, {
      role: 'vendor',
    })) || []) as Ivendor[];

    data = await Promise.all(
      vendors.map(async (vendor) => {
        const totalOrders = await handleCountOrders(vendor.uid);

        return {
          ...vendor,
          totalOrders,
        };
      }),
    );
  } catch (err) {}

  return (
    <div className='p-10'>
      <VendorList areas={data} />
    </div>
  );
};

export default VendorListPage;
