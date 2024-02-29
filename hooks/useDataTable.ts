import React from 'react';

const initialPage = 1;
const initialPageSize = 10;

export const useDataTable = <T>(allData: T[], searchBy: keyof T) => {
  const sliceArray = (array: T[], page: number, size: number) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;

    return array.slice(startIndex, endIndex);
  };

  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [pageSize, setPageSize] = React.useState<number>(initialPageSize);
  const [currentPage, setCurrentPage] = React.useState<number>(initialPage);
  const [totalCount, setTotalCount] = React.useState<number>(allData.length);
  const [data, setData] = React.useState<T[]>(
    sliceArray(allData, initialPage, initialPageSize),
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [pageSize, searchTerm]);

  React.useEffect(() => {
    if (!searchTerm) {
      setTotalCount(allData.length);
      setData(sliceArray(allData, currentPage, pageSize));
    } else {
      const filteredData = allData.filter((item) =>
        (item[searchBy] as string)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
      setTotalCount(filteredData.length);
      setData(sliceArray(filteredData, currentPage, pageSize));
    }
  }, [pageSize, currentPage, searchTerm, allData]);

  return {
    data,
    setData,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalCount,
    setTotalCount,
  };
};
