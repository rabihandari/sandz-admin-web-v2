'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Iarea, ItableColumn } from '@/types';
import DataTable from '@/components/DataTable';
import { useDataTable } from '@/hooks/useDataTable';

interface Iprops {
  areas: Iarea[];
}

const AreaList: React.FC<Iprops> = ({ areas }) => {
  const {
    data,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalCount,
  } = useDataTable<Iarea>(areas, 'name');
  const router = useRouter();

  const handleButtonClick = () => router.push('/area/add');

  const handleEditClick = async (item: Iarea) => {};

  const handleDelete = async (item: Iarea) => {};

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
  );
};

export default AreaList;
