'use client';

import React from 'react';
import Image from 'next/image';
import { Alert } from '@mui/material';
import { format } from 'date-fns/format';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/DataTable';
import { Ivendor, ItableColumn } from '@/types';
import { useDataTable } from '@/hooks/useDataTable';
import CustomDrawer from '@/components/CustomDrawer';
import { useCatchErrors } from '@/hooks/useCatchErrors';
import AddVendorForm from '@/components/forms/AddVendorForm';
import { USERS_COLLECTION, VENDOR_LIST_ROUTE } from '@/constants';
import { deleteDocument, deleteUserAccount, updateDocument } from '@/firebase';

interface Iprops {
  vendors: Ivendor[];
}

const VendorList: React.FC<Iprops> = ({ vendors }) => {
  const router = useRouter();
  const [initialData, setInitialData] = React.useState<Ivendor[]>(vendors);
  const { errorMessage, handleCatchError, setDefaultError, setErrorMessage } =
    useCatchErrors();
  const [vendorToUpdate, setVendorToUpdate] = React.useState<Ivendor | null>(
    null,
  );

  const {
    data,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalCount,
  } = useDataTable<Ivendor>(initialData, 'displayName');

  const handleClose = () => setVendorToUpdate(null);

  const handleButtonClick = () => router.push('/vendor/add');

  const handleEditClick = (vendor: Ivendor) => setVendorToUpdate(vendor);

  const handleDelete = async ({ uid, photoUrl }: Ivendor) => {
    setErrorMessage('');

    try {
      await deleteDocument(uid, USERS_COLLECTION, photoUrl, VENDOR_LIST_ROUTE);
      setInitialData((oldData) =>
        oldData.filter((vendor) => vendor.uid !== uid),
      );
      await deleteUserAccount(uid);
    } catch (err: any) {
      await handleCatchError(err);
    }
  };

  const handleSubmit = async (
    vendor: Omit<Ivendor, 'uid'>,
    uid?: string,
    updatedEmail?: string,
  ) => {
    // this should never be the case, just for type correction
    if (!uid) {
      setDefaultError();
      return;
    }

    const updatedArea = (await updateDocument(
      uid,
      USERS_COLLECTION,
      vendor,
      VENDOR_LIST_ROUTE,
      updatedEmail,
    )) as Ivendor | undefined;

    handleClose();

    if (!updatedArea) {
      setDefaultError();
      return;
    }

    setInitialData((oldData) =>
      oldData.map((vendor) =>
        vendor.uid === uid ? { ...vendor, ...updatedArea } : vendor,
      ),
    );
  };

  const columns: ItableColumn<Ivendor>[] = [
    {
      key: 'displayName',
      label: 'Vendor',
      component: ({ photoUrl, displayName, emailAddress }) => (
        <div className='flex items-center gap-4'>
          <Image
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
      label: 'Vendor ID',
    },
    {
      key: 'type',
      label: 'Type',
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
      key: 'totalOrders',
      label: 'Total Orders',
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
        buttonLabel='Add Vendor'
        currentPage={currentPage}
        searchLabel='Search Vendor'
        handleDelete={handleDelete}
        noDataText='No Vendors Found'
        onEditClick={handleEditClick}
        setSearchTerm={setSearchTerm}
        handleChangeSize={setPageSize}
        setCurrentPage={setCurrentPage}
        onButtonClick={handleButtonClick}
      />
      <CustomDrawer
        title='Edit Vendor'
        open={!!vendorToUpdate}
        handleClose={handleClose}
      >
        {!!vendorToUpdate && (
          <AddVendorForm
            isInPannel
            onReset={handleClose}
            defaultValues={vendorToUpdate}
            handleSubmitForm={handleSubmit}
          />
        )}
      </CustomDrawer>
    </div>
  );
};

export default VendorList;
