'use client';

import React from 'react';
import { Alert } from '@mui/material';
import { format } from 'date-fns/format';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/DataTable';
import { Icustomer, ItableColumn } from '@/types';
import { useDataTable } from '@/hooks/useDataTable';
import CustomDrawer from '@/components/CustomDrawer';
import { useCatchErrors } from '@/hooks/useCatchErrors';
import AddCustomerForm from '@/components/forms/AddCustomerForm';
import { CUSTOMER_LIST_ROUTE, USERS_COLLECTION } from '@/constants';
import { deleteDocument, deleteUserAccount, updateDocument } from '@/firebase';

interface Iprops {
  customers: Icustomer[];
}

const CustomerList: React.FC<Iprops> = ({ customers }) => {
  const router = useRouter();
  const [initialData, setInitialData] = React.useState<Icustomer[]>(customers);
  const { errorMessage, handleCatchError, setDefaultError, setErrorMessage } =
    useCatchErrors();
  const [customerToUpdate, setCustomerToUpdate] =
    React.useState<Icustomer | null>(null);

  const {
    data,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalCount,
  } = useDataTable<Icustomer>(initialData, 'displayName');

  React.useEffect(() => console.log({ customerToUpdate }), [customerToUpdate]);

  const handleClose = () => setCustomerToUpdate(null);

  const handleButtonClick = () => router.push('/customer/add');

  const handleEditClick = (customer: Icustomer) =>
    setCustomerToUpdate(customer);

  const handleDelete = async ({ uid }: Icustomer) => {
    setErrorMessage('');

    try {
      await deleteDocument(
        uid,
        USERS_COLLECTION,
        undefined,
        CUSTOMER_LIST_ROUTE,
      );
      setInitialData((oldData) =>
        oldData.filter((customer) => customer.uid !== uid),
      );
      await deleteUserAccount(uid);
    } catch (err: any) {
      await handleCatchError(err);
    }
  };

  const handleSubmit = async (
    customer: Omit<Icustomer, 'uid'>,
    uid?: string,
    updatedEmail?: string,
  ) => {
    // this should never be the case, just for type correction
    if (!uid) {
      setDefaultError();
      return;
    }

    const updatedCustomer = (await updateDocument(
      uid,
      USERS_COLLECTION,
      customer,
      CUSTOMER_LIST_ROUTE,
      updatedEmail,
    )) as Icustomer | undefined;

    handleClose();

    if (!updatedCustomer) {
      setDefaultError();
      return;
    }

    setInitialData((oldData) =>
      oldData.map((customer) =>
        customer.uid === uid ? { ...customer, ...updatedCustomer } : customer,
      ),
    );
  };

  const columns: ItableColumn<Icustomer>[] = [
    {
      key: 'displayName',
      label: 'Customer',
      component: ({ displayName, emailAddress }) => (
        <div className='text-gray'>
          <p>{displayName}</p>
          <p className='opacity-60 text-sm'>{emailAddress}</p>
        </div>
      ),
    },
    {
      key: 'uid',
      label: 'Customer ID',
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
        buttonLabel='Add Customer'
        currentPage={currentPage}
        searchLabel='Search Customer'
        handleDelete={handleDelete}
        noDataText='No Vendors Found'
        onEditClick={handleEditClick}
        setSearchTerm={setSearchTerm}
        handleChangeSize={setPageSize}
        setCurrentPage={setCurrentPage}
        onButtonClick={handleButtonClick}
      />
      <CustomDrawer
        title='Edit Customer'
        open={!!customerToUpdate}
        handleClose={handleClose}
      >
        {!!customerToUpdate && (
          <AddCustomerForm
            isInPannel
            onReset={handleClose}
            defaultValues={customerToUpdate}
            handleSubmitForm={handleSubmit}
          />
        )}
      </CustomDrawer>
    </div>
  );
};

export default CustomerList;
