'use client';

import React from 'react';
import { IloginForm } from '@/types';
import { useAppContext } from '@/context';
import { loginUser } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { appAuth } from '@/lib/firebase-config';
import { loginSchema } from '@/schemas/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LOCAL_STORAGE_EMAIL_KEY, firebaseErrorMap } from '@/constants';
import {
  Card,
  Alert,
  Button,
  Checkbox,
  TextField,
  CardHeader,
  CardActions,
  CardContent,
  FormControlLabel,
} from '@mui/material';
import {
  saveItemInLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from '@/helpers';

const LoginPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IloginForm>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
  const { setUserProfile } = useAppContext();
  const [errMessage, setErrMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isRememberMe, setIsRememberMe] = React.useState<boolean>(false);

  React.useEffect(() => {
    const savedEmail = getItemFromLocalStorage(LOCAL_STORAGE_EMAIL_KEY);

    if (!!savedEmail) {
      setValue('email', savedEmail);
      setIsRememberMe(true);
    }
  }, []);

  const onSubmit: SubmitHandler<IloginForm> = async ({ email, password }) => {
    setErrMessage('');

    if (isRememberMe) {
      saveItemInLocalStorage(LOCAL_STORAGE_EMAIL_KEY, email);
    } else {
      removeItemFromLocalStorage(LOCAL_STORAGE_EMAIL_KEY);
    }

    try {
      setIsLoading(true);
      const userCred = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const token = await userCred.user.getIdToken();
      const user = await loginUser(token);

      if (user) {
        setUserProfile(user);
        router.push('/');
      } else {
        await appAuth.signOut();
      }
    } catch (err: any) {
      setErrMessage(firebaseErrorMap[err.code] || firebaseErrorMap.default);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='w-[400px]'>
          <CardHeader title='Login' />
          <CardContent className='flex flex-col gap-5'>
            {errMessage && <Alert severity='error'>{errMessage}</Alert>}
            <div className='flex flex-col gap-2'>
              <TextField
                fullWidth
                type='email'
                label='Email'
                variant='outlined'
                {...register('email')}
              />
              {errors.email?.message && (
                <Alert severity='error'>{errors.email?.message}</Alert>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <TextField
                fullWidth
                type='password'
                label='Password'
                variant='outlined'
                {...register('password')}
              />
              {errors.password?.message && (
                <Alert severity='error'>{errors.password?.message}</Alert>
              )}
            </div>
            <FormControlLabel
              label='Remember me'
              control={
                <Checkbox
                  checked={isRememberMe}
                  onChange={(e) => setIsRememberMe(e.target.checked)}
                />
              }
            />
          </CardContent>
          <CardActions className='m-2'>
            <Button
              fullWidth
              type='submit'
              disableElevation
              variant='contained'
              disabled={isLoading}
              className='bg-primary'
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default LoginPage;
