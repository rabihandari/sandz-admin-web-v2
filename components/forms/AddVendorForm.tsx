import React from 'react';
import Wrapper from '../Wrapper';
import { Ivendor, IvendorForm } from '@/types';
import { uploadImage } from '@/firebase/client';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHeader from '../formComponents/FormHeader';
import { vendorSchema } from '@/schemas/vendorSchema';
import { useCatchErrors } from '@/hooks/useCatchErrors';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormItemWrapper from '../formComponents/FormItemWrapper';
import { USERS_COLLECTION, vendorTypeOptions } from '@/constants';
import { Alert, MenuItem, Select, TextField } from '@mui/material';
import UploadImageFormItem from '../formComponents/UploadImageFormItem';

interface Iprops {
  isInPannel?: boolean;
  onReset?: () => void;
  defaultValues?: Ivendor;
  // to support both create and update
  handleSubmitForm: (
    vendor: Omit<Ivendor, 'uid'>,
    uid?: string,
    updatedEmail?: string,
  ) => Promise<void>;
}

const AddVendorForm: React.FC<Iprops> = ({
  onReset,
  defaultValues,
  handleSubmitForm,
  isInPannel = false,
}) => {
  const {
    watch,
    reset,
    setValue,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IvendorForm>({
    resolver: yupResolver(vendorSchema),
    defaultValues: defaultValues
      ? {
          type: defaultValues.type,
          photo: defaultValues.photoUrl,
          displayName: defaultValues.displayName,
          emailAddress: defaultValues.emailAddress,
          mobileNumber: defaultValues.mobileNumber,
        }
      : undefined,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { errorMessage, handleCatchError, setErrorMessage } = useCatchErrors();

  const resetForm = () => {
    onReset?.();
    reset();
  };

  const onSubmit: SubmitHandler<IvendorForm> = async ({
    type,
    photo,
    displayName,
    emailAddress,
    mobileNumber,
  }) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      let photoUrl = '';

      // in case of update if the image is not updated it will be the URL
      if (typeof photo !== 'string') {
        photoUrl = await uploadImage(USERS_COLLECTION, photo);
      } else {
        photoUrl = photo;
      }

      await handleSubmitForm(
        {
          type,
          photoUrl,
          displayName,
          emailAddress,
          mobileNumber,
          role: 'vendor',
        },
        defaultValues?.uid,
        defaultValues?.emailAddress !== emailAddress ? emailAddress : undefined,
      );

      resetForm();
    } catch (err: any) {
      await handleCatchError(err);
    } finally {
      setIsLoading(false);
    }
  };

  watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex-grow'>
      <div
        className={
          isInPannel ? 'flex flex-col justify-between h-full gap-5' : ''
        }
      >
        <div className='flex flex-col gap-5'>
          {!isInPannel && (
            <FormHeader
              reset={resetForm}
              isLoading={isLoading}
              title='Add a new vendor'
              buttonLabel='Add Vendor'
            />
          )}
          {!!errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <Wrapper isInPannel={isInPannel}>
            <h4 className='text-lg font-medium text-gray'>
              Vendor information
            </h4>
            <FormItemWrapper
              label='Name'
              errorMsg={errors.displayName?.message}
            >
              <TextField
                fullWidth
                placeholder='Full name'
                {...register('displayName')}
              />
            </FormItemWrapper>
            <FormItemWrapper
              label='Email'
              errorMsg={errors.emailAddress?.message}
            >
              <TextField
                fullWidth
                placeholder='Email address'
                {...register('emailAddress')}
              />
            </FormItemWrapper>
            <FormItemWrapper
              label='Contact'
              errorMsg={errors.mobileNumber?.message}
            >
              <TextField
                fullWidth
                placeholder='Contact number'
                {...register('mobileNumber')}
              />
            </FormItemWrapper>
            <FormItemWrapper
              label='Vendor type'
              errorMsg={errors.type?.message}
            >
              <Select
                fullWidth
                placeholder='Vendor type'
                defaultValue={getValues('type')}
                {...register('type')}
              >
                {vendorTypeOptions.map((item) => (
                  <MenuItem key={item.key} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormItemWrapper>
          </Wrapper>
          <UploadImageFormItem
            label='Logo'
            isInPannel={isInPannel}
            error={errors.photo?.message}
            getValues={() => getValues('photo')}
            setValue={(file) => setValue('photo', file)}
          />
        </div>
        {isInPannel && (
          <FormHeader
            reset={resetForm}
            isLoading={isLoading}
            buttonLabel='Apply Changes'
          />
        )}
      </div>
    </form>
  );
};

export default AddVendorForm;
