import React from 'react';
import Wrapper from '@/components/Wrapper';
import {
  Divider,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface Iprops {
  length: number;
}

const LoadingComponent: React.FC<Iprops> = ({ length }) => {
  const columns = Array.from({ length }, (_, i) => i + 1);

  return (
    <div className='p-10'>
      <Wrapper>
        <div className='flex items-center justify-between gap-5'>
          <Skeleton width={223} height={86} />
          <div className='flex items-center gap-2'>
            <Skeleton width={64} height={86} />
            <Skeleton width={137} height={86} />
          </div>
        </div>
        <Divider orientation='horizontal' sx={{ backgroundolor: '#D0D1D3' }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((index) => (
                  <TableCell
                    key={index}
                    align='left'
                    sx={{ fontWeight: 'bold' }}
                  >
                    <Skeleton width={120} height={40} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columns.map((index) => (
                    <TableCell key={index} align='left'>
                      <Skeleton width={120} height={40} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider orientation='horizontal' sx={{ backgroundolor: '#D0D1D3' }} />

        <div className='flex items-center justify-between gap-10'>
          <Skeleton width={150} />
          <Skeleton width={200} height={40} />
        </div>
      </Wrapper>
    </div>
  );
};

export default LoadingComponent;
