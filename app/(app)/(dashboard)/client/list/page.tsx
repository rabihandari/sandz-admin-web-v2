import React from 'react';
import { NextPage } from 'next';
import { Iclient } from '@/types';
import ClientList from './ClientList';
import { getDocuments } from '@/firebase';
import { RESERVATIONS_COLLECTION, USERS_COLLECTION } from '@/constants';

const ClientListPage: NextPage = async () => {
  let data: Iclient[] = [];

  try {
    const clients = ((await getDocuments(USERS_COLLECTION, {
      role: 'client',
    })) || []) as Iclient[];

    data = await Promise.all(
      clients.map(async (client) => {
        const reservations = await getDocuments(RESERVATIONS_COLLECTION, {
          userId: client.uid,
        });

        let totalSpent: number = 0;

        reservations?.forEach(
          (item) => (totalSpent += parseInt(item?.payment?.amountPaid || 0)),
        );

        return {
          ...client,
          totalSpent,
          totalReservations: reservations?.length || 0,
        };
      }),
    );
  } catch (err) {}

  return (
    <div className='p-10'>
      <ClientList clients={data} />
    </div>
  );
};

export default ClientListPage;
