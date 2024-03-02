import * as yup from 'yup';
import { IcustomerForm } from '@/types';

export const customerSchema: yup.ObjectSchema<IcustomerForm> = yup
  .object()
  .shape({
    displayName: yup
      .string()
      .max(255, 'Name should not be more than 255 characters.')
      .required('Name is required.'),
    emailAddress: yup
      .string()
      .max(255, 'Email should not be more than 255 characters.')
      .email('Invalid email.')
      .required('Email is required.'),
    mobileNumber: yup
      .string()
      .max(255, 'Contact should not be more than 255 characters.')
      .required('Contact is required.'),
    plan: yup.string().required('Please select a plan.'),
  });
