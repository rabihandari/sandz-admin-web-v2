import * as yup from 'yup';
import { IareaForm } from '@/types';

export const areaSchema: yup.ObjectSchema<IareaForm> = yup.object().shape({
  name: yup.string().required('Name is required.'),
  image: yup.mixed().required('Image is required.'),
}) as yup.ObjectSchema<IareaForm>;
