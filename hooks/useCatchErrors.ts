import React from 'react';
import { useAppContext } from '@/context';
import { SESSION_EXPIRED, errorCodes, firebaseErrorMap } from '@/constants';

export const useCatchErrors = () => {
  const { handleLogout } = useAppContext();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const setDefaultError = () => setErrorMessage(firebaseErrorMap.default);

  const handleCatchError = async (error: any) => {
    const errorMsg = error.code || error.message;

    if (errorCodes[errorMsg] === errorCodes[SESSION_EXPIRED]) {
      setErrorMessage(firebaseErrorMap['auth/session-cookie-expired']);
      await handleLogout();
    } else
      setErrorMessage(firebaseErrorMap[errorMsg] || firebaseErrorMap.default);
  };

  return {
    errorMessage,
    setDefaultError,
    setErrorMessage,
    handleCatchError,
  };
};
