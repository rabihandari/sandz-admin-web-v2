'use client';

import React from 'react';
import { Alert } from '@mui/material';
import { format } from 'date-fns/format';
import DataTable from '@/components/DataTable';
import { Iclient, ItableColumn } from '@/types';
import { useDataTable } from '@/hooks/useDataTable';
import { useCatchErrors } from '@/hooks/useCatchErrors';
import { deleteDocument, deleteUserAccount } from '@/firebase';
import { USERS_COLLECTION, CLIENT_LIST_ROUTE } from '@/constants';

interface Iprops {
  clients: Iclient[];
}

const ClientList: React.FC<Iprops> = ({ clients }) => {
  const [initialData, setInitialData] = React.useState<Iclient[]>(clients);
  const { errorMessage, handleCatchError, setErrorMessage } = useCatchErrors();

  const {
    data,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalCount,
  } = useDataTable<Iclient>(initialData, 'displayName');

  const handleDelete = async ({ uid, photoUrl }: Iclient) => {
    setErrorMessage('');

    try {
      await deleteDocument(uid, USERS_COLLECTION, photoUrl, CLIENT_LIST_ROUTE);
      setInitialData((oldData) =>
        oldData.filter((client) => client.uid !== uid),
      );
      await deleteUserAccount(uid);
    } catch (err: any) {
      await handleCatchError(err);
    }
  };

  const columns: ItableColumn<Iclient>[] = [
    {
      key: 'displayName',
      label: 'Client',
      component: ({ photoUrl, displayName, emailAddress }) => (
        <div className='flex items-center gap-4'>
          <img
            width={50}
            height={50}
            src={photoUrl}
            alt={displayName}
            className='rounded-full bg-black min-w-[50px] min-h-[50px]'
          />
          <div className='text-gray'>
            <p>{displayName}</p>
            <p className='opacity-60 text-sm'>{emailAddress}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'uid',
      label: 'Client ID',
    },
    {
      key: 'mobileNumber',
      label: 'Phone Number',
    },
    {
      key: 'createdAt',
      label: 'Subcription Date',
      component: (item) =>
        item.createdAt && format(item.createdAt, 'dd/MM/yyyy'),
    },
    {
      key: 'totalReservations',
      label: 'Total Reservations',
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      component: (client) => `${client.totalSpent || 0} KWD`,
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      {!!errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      <DataTable
        data={data}
        columns={columns}
        pageSize={pageSize}
        searchTerm={searchTerm}
        totalCount={totalCount}
        currentPage={currentPage}
        searchLabel='Search Client'
        handleDelete={handleDelete}
        noDataText='No Clients Found'
        setSearchTerm={setSearchTerm}
        handleChangeSize={setPageSize}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ClientList;
