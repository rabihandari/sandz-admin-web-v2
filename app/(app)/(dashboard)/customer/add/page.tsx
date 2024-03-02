'use client';

import React from 'react';
import { NextPage } from 'next';
import { Icustomer } from '@/types';
import { createAccount } from '@/firebase';
import AddCustomerForm from '@/components/forms/AddCustomerForm';
import { USERS_COLLECTION, CUSTOMER_LIST_ROUTE } from '@/constants';

const AddCustomerPage: NextPage = () => {
  const handleSubmit = async (customer: Omit<Icustomer, 'uid'>) => {
    await createAccount(
      USERS_COLLECTION,
      { ...customer, isFirstLogin: true },
      CUSTOMER_LIST_ROUTE,
    );
  };

  return (
    <div className='p-10'>
      <AddCustomerForm handleSubmitForm={handleSubmit} />
    </div>
  );
};

export default AddCustomerPage;
