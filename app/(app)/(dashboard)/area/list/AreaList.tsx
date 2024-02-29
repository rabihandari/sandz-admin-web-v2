'use client';

import React from 'react';
import Link from 'next/link';
import { Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Iarea, ItableColumn } from '@/types';
import DataTable from '@/components/DataTable';
import { useDataTable } from '@/hooks/useDataTable';
import CustomDrawer from '@/components/CustomDrawer';
import AddAreaForm from '@/components/form/AddAreaForm';
import { useCatchErrors } from '@/hooks/useCatchErrors';
import { deleteDocument, updateDocument } from '@/firebase';
import { AREAS_COLLECTION, AREA_LIST_ROUTE } from '@/constants';

interface Iprops {
  areas: Iarea[];
}

const AreaList: React.FC<Iprops> = ({ areas }) => {
  const router = useRouter();
  const [initialData, setInitialData] = React.useState<Iarea[]>(areas);
  const [areaToUpdate, setAreaToUpdate] = React.useState<Iarea | null>(null);
  const { errorMessage, handleCatchError, setDefaultError, setErrorMessage } =
    useCatchErrors();

  const {
    data,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalCount,
  } = useDataTable<Iarea>(initialData, 'name');

  const handleClose = () => setAreaToUpdate(null);

  const handleButtonClick = () => router.push('/area/add');

  const handleEditClick = (area: Iarea) => setAreaToUpdate(area);

  const handleDelete = async ({ id, imageUrl }: Iarea) => {
    try {
      await deleteDocument(id, AREAS_COLLECTION, imageUrl, 'area/list');
      setInitialData((oldData) => oldData.filter((area) => area.id !== id));
    } catch (err: any) {
      await handleCatchError(err.message);
    }
  };

  const handleSubmit = async (area: Omit<Iarea, 'id'>, id?: string) => {
    setErrorMessage('');

    // this should never be the case, just for type correction
    if (!id) {
      setDefaultError();
      return;
    }

    try {
      const updatedArea = (await updateDocument(
        id,
        AREAS_COLLECTION,
        area,
        AREA_LIST_ROUTE,
      )) as Iarea | undefined;

      if (!updatedArea) {
        setDefaultError();
        return;
      }

      handleClose();

      setInitialData((oldData) =>
        oldData.map((area) => (area.id === id ? updatedArea : area)),
      );
    } catch (err: any) {
      await handleCatchError(err.message);
    }
  };

  const columns: ItableColumn<Iarea>[] = [
    {
      key: 'name',
      label: 'Area',
    },
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'imageUrl',
      label: 'Image',
      component: (area) => {
        return (
          <Link href={area.imageUrl} target='_blank' className='text-green-500'>
            Linked
          </Link>
        );
      },
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      {!!errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      <DataTable
        data={data}
        columns={columns}
        pageSize={pageSize}
        buttonLabel='Add Area'
        searchTerm={searchTerm}
        totalCount={totalCount}
        searchLabel='Search Area'
        currentPage={currentPage}
        noDataText='No Areas Found'
        handleDelete={handleDelete}
        onEditClick={handleEditClick}
        setSearchTerm={setSearchTerm}
        handleChangeSize={setPageSize}
        setCurrentPage={setCurrentPage}
        onButtonClick={handleButtonClick}
      />
      <CustomDrawer
        title='Edit Area'
        open={!!areaToUpdate}
        handleClose={handleClose}
      >
        {!!areaToUpdate && (
          <AddAreaForm
            isInPannel
            onReset={handleClose}
            defaultValues={areaToUpdate}
            handleSubmitForm={handleSubmit}
          />
        )}
      </CustomDrawer>
    </div>
  );
};

export default AreaList;
