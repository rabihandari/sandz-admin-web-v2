'use client';

import React from 'react';
import { NextPage } from 'next';
import { Ivendor } from '@/types';
import { createAccount } from '@/firebase';
import AddVendorForm from '@/components/forms/AddVendorForm';
import { USERS_COLLECTION, VENDOR_LIST_ROUTE } from '@/constants';

const AddCustomerPage: NextPage = () => {
  const handleSubmit = async (vendor: Omit<Ivendor, 'uid'>) => {
    await createAccount(
      USERS_COLLECTION,
      { ...vendor, isFirstLogin: true },
      VENDOR_LIST_ROUTE,
    );
  };

  return (
    <div className='p-10'>
      <AddVendorForm handleSubmitForm={handleSubmit} />
    </div>
  );
};

export default AddCustomerPage;
