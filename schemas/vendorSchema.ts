import * as yup from 'yup';
import { IvendorForm } from '@/types';

export const vendorSchema: yup.ObjectSchema<IvendorForm> = yup.object().shape({
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
  type: yup.string().required('Please select a plan.'),
  photo: yup.mixed().required('Logo is required.'),
}) as yup.ObjectSchema<IvendorForm>;
