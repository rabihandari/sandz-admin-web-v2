import React from 'react';
import { Iarea } from '@/types';
import { NextPage } from 'next';
import AreaList from './AreaList';
import { getDocuments } from '@/firebase';
import { AREAS_COLLECTION } from '@/constants';

const AreaListPage: NextPage = async () => {
  let data: Iarea[] = [];

  try {
    data = ((await getDocuments(AREAS_COLLECTION)) || []) as Iarea[];
  } catch (err) {}

  return (
    <div className='p-10'>
      <AreaList areas={data} />
    </div>
  );
};

export default AreaListPage;
