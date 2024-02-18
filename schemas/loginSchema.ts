import * as yup from 'yup';
import { IloginForm } from '@/types';

export const loginSchema: yup.ObjectSchema<IloginForm> = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is required.'),
  password: yup.string().required('Password is required.'),
});
