'use client';

import React from 'react';
import { NextPage } from 'next';
import { createVendor } from '.';
import { Ivendor } from '@/types';
import AddVendorForm from '@/components/forms/AddVendorForm';

const AddCustomerPage: NextPage = () => {
  const handleSubmit = async (vendor: Omit<Ivendor, 'uid'>) => {
    await createVendor(vendor);
  };

  return (
    <div className='p-10'>
      <AddVendorForm handleSubmitForm={handleSubmit} />
    </div>
  );
};

export default AddCustomerPage;
