import { AREAS_COLLECTION } from '@/constants';
import { getDocuments } from '@/firebase';
import { Iarea } from '@/types';
import { NextPage } from 'next';
import React from 'react';

const AreaList: NextPage = async () => {
  let data: Iarea[] = [];

  try {
    data = ((await getDocuments(AREAS_COLLECTION)) || []) as Iarea[];
  } catch (err) {}

  return (
    <div className='p-10'>
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default AreaList;
