'use client';

import React from 'react';
import { ItableColumn } from '@/types';
import CustomDialog from './CustomDialog';
import { pageSizeOptions } from '@/constants';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import {
  Table,
  Button,
  Select,
  Divider,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Pagination,
  TableContainer,
} from '@mui/material';

interface Iprops {
  data: any[];
  pageSize: number;
  totalCount: number;
  noDataText: string;
  searchLabel: string;
  currentPage: number;
  searchTerm?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  columns: ItableColumn<any>[];
  handleChangeSize: (size: number) => void;
  onEditClick?: (item: any) => Promise<void>;
  handleDelete: (item: any) => Promise<void>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const DataTable: React.FC<Iprops> = ({
  data,
  columns,
  pageSize,
  searchTerm,
  totalCount,
  noDataText,
  searchLabel,
  buttonLabel,
  currentPage,
  onEditClick,
  setSearchTerm,
  handleDelete,
  onButtonClick,
  setCurrentPage,
  handleChangeSize,
}) => {
  return (
    <div className='bg-white shadow-lg p-5 rounded-md flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-5'>
        <TextField
          type='text'
          variant='outlined'
          value={searchTerm}
          label={searchLabel}
          sx={{ backgroundColor: '#fff' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className='flex items-center gap-2'>
          <Select
            label=''
            value={pageSize}
            onChange={(e) => handleChangeSize(e.target.value as number)}
          >
            {pageSizeOptions.map((item) => (
              <MenuItem key={item.key} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {buttonLabel && (
            <Button
              variant='contained'
              onClick={onButtonClick}
              className='bg-[#3F6BFC] flex items-center gap-2 h-[56px]'
            >
              <Plus size={20} />
              {buttonLabel}
            </Button>
          )}
        </div>
      </div>
      <Divider orientation='horizontal' sx={{ backgroundolor: '#D0D1D3' }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ label }, index) => (
                <TableCell key={index} align='left' sx={{ fontWeight: 'bold' }}>
                  {label}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map(({ key, component }, index) => (
                  <TableCell key={index} align='left'>
                    {component?.(row) || row[key]}
                  </TableCell>
                ))}
                <TableCell align='right'>
                  {onEditClick && (
                    <Button onClick={() => onEditClick(row)}>
                      <Pencil size={22} color='green' />
                    </Button>
                  )}
                  <CustomDialog
                    title='Delete item!'
                    confirmButtonLabel='Confirm'
                    handleConfirm={() => handleDelete(row)}
                    message='Are you sure you want to delete this item?'
                  >
                    {(handleOpen) => (
                      <Button onClick={handleOpen}>
                        <Trash2 size={22} color='red' />
                      </Button>
                    )}
                  </CustomDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!data.length && (
          <p className='text-center w-full p-10'>{noDataText}</p>
        )}
      </TableContainer>
      <Divider orientation='horizontal' sx={{ backgroundolor: '#D0D1D3' }} />
      <div className='flex items-center justify-between gap-10'>
        <p>
          Displaying {totalCount ? (currentPage - 1) * pageSize + 1 : 0} of{' '}
          {Math.min(currentPage * pageSize, totalCount)} of {totalCount} entries
        </p>
        <Pagination
          variant='text'
          color='primary'
          shape='rounded'
          page={currentPage}
          count={Math.ceil(totalCount / pageSize)}
          onChange={(_e, page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default DataTable;
