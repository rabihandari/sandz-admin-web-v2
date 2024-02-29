'use client';

import React from 'react';
import { NextPage } from 'next';
import { Iarea } from '@/types';
import { createDocument } from '@/firebase';
import AddAreaForm from '@/components/form/AddAreaForm';
import { AREAS_COLLECTION, AREA_LIST_ROUTE } from '@/constants';

const AreaListPage: NextPage = () => {
  const handleSubmit = async (area: Omit<Iarea, 'id'>) => {
    await createDocument(AREAS_COLLECTION, area, AREA_LIST_ROUTE);
  };

  return (
    <div className='p-10'>
      <AddAreaForm handleSubmitForm={handleSubmit} />
    </div>
  );
};

export default AreaListPage;
