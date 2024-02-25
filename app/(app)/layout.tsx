'use client';

import React from 'react';
import { ContextProvider } from '@/context';
import { ThemeProvider, createTheme } from '@mui/material';

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#6B8EF2',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>{children}</ContextProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
