import React from 'react';
import { useAppContext } from '@/context';
import { SESSION_EXPIRED, errorCodes, firebaseErrorMap } from '@/constants';

export const useCatchErrors = () => {
  const { handleLogout } = useAppContext();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const setDefaultError = () => setErrorMessage(firebaseErrorMap.default);

  const handleCatchError = async (error: string) => {
    if (errorCodes[error] === errorCodes[SESSION_EXPIRED]) {
      setErrorMessage(firebaseErrorMap['auth/session-cookie-expired']);
      await handleLogout();
    } else setErrorMessage(firebaseErrorMap[error] || firebaseErrorMap.default);
  };

  return {
    errorMessage,
    setDefaultError,
    setErrorMessage,
    handleCatchError,
  };
};
