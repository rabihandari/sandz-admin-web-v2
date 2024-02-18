'use client';

import React from 'react';
import { ContextProvider } from '@/context';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase-config';
import { ThemeProvider, createTheme } from '@mui/material';
import { checkUserToken, logoutUser } from '@/serverActions';

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const res = await checkUserToken();
      if (!res) {
        await logoutUser();
        await auth.signOut();
        router.push('/login');
      }
    })();
  }, []);

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
